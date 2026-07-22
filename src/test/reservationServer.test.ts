import { createReservationApiHandler } from "@/services/reservations/reservationApiHandler";
import { LocalDevelopmentReservationRepository } from "@/services/reservations/reservationRepository";
import { reservationRequestSchema } from "@/services/reservations/reservationSchema";

const validPayload = {
  contact: {
    name: "Ada",
    phone: "+34600000000",
    email: "",
    preferredChannel: "phone",
  },
  dateTime: { date: "2026-07-28", time: "20:30", timezone: "Europe/Madrid" },
  preferences: {
    guests: 2,
    zone: "sin-preferencia",
    occasion: "",
    allergies: "",
    message: "",
  },
  consent: { privacyAccepted: true },
  context: {
    dish: null,
    category: null,
    offer: null,
    context: null,
    source: null,
    summaryTitle: null,
    summaryBody: null,
    tags: [],
    ignoredParams: [],
    hasContext: false,
  },
  metadata: {
    requestId: "28fb86a1-4d6d-4f70-8dd5-e66fc9120522",
    startedAt: "2026-07-22T10:00:00.000Z",
    submittedAt: "2026-07-22T10:00:05.000Z",
    honeypot: "",
    fingerprint: "reservation-fingerprint-abc123",
    idempotencyKey: "reservation-session-abc123",
    sessionId: "session-abc123",
    attempt: 1,
  },
};

describe("reservation server contract", () => {
  it("rejects a request outside configured opening hours", () => {
    const result = reservationRequestSchema.safeParse({
      ...validPayload,
      dateTime: { ...validPayload.dateTime, date: "2026-07-27" },
    });
    expect(result.success).toBe(false);
  });

  it("rejects a filled honeypot before persistence", () => {
    const result = reservationRequestSchema.safeParse({
      ...validPayload,
      metadata: { ...validPayload.metadata, honeypot: "spam.example" },
    });
    expect(result.success).toBe(false);
  });

  it("validates and stores a received request without exposing the payload", async () => {
    const notifyRestaurant = vi.fn(() => Promise.resolve());
    const handler = createReservationApiHandler({
      repository: new LocalDevelopmentReservationRepository(),
      allowedOrigin: "https://staging.malcriadobcn.com",
      notifyRestaurant,
    });
    const response = await handler(
      new Request("https://staging.malcriadobcn.com/api/reservations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Idempotency-Key": validPayload.metadata.idempotencyKey,
          Origin: "https://staging.malcriadobcn.com",
        },
        body: JSON.stringify(validPayload),
      }),
    );

    expect(response.status).toBe(202);
    expect(await response.json()).toEqual({
      requestId: validPayload.metadata.requestId,
      status: "received",
    });
    expect(notifyRestaurant).toHaveBeenCalledWith(
      validPayload.metadata.requestId,
    );
  });

  it("does not notify the restaurant twice for an idempotent retry", async () => {
    const notifyRestaurant = vi.fn(() => Promise.resolve());
    const handler = createReservationApiHandler({
      repository: new LocalDevelopmentReservationRepository(),
      allowedOrigin: "https://staging.malcriadobcn.com",
      notifyRestaurant,
    });
    const makeRequest = () =>
      new Request("https://staging.malcriadobcn.com/api/reservations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Idempotency-Key": validPayload.metadata.idempotencyKey,
          Origin: "https://staging.malcriadobcn.com",
        },
        body: JSON.stringify(validPayload),
      });

    expect((await handler(makeRequest())).status).toBe(202);
    expect((await handler(makeRequest())).status).toBe(202);
    expect(notifyRestaurant).toHaveBeenCalledTimes(1);
  });

  it("rejects a mismatched idempotency header", async () => {
    const notifyRestaurant = vi.fn(() => Promise.resolve());
    const handler = createReservationApiHandler({
      repository: new LocalDevelopmentReservationRepository(),
      allowedOrigin: "https://staging.malcriadobcn.com",
      notifyRestaurant,
    });
    const response = await handler(
      new Request("https://staging.malcriadobcn.com/api/reservations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Idempotency-Key": "reservation-session-other",
          Origin: "https://staging.malcriadobcn.com",
        },
        body: JSON.stringify(validPayload),
      }),
    );

    expect(response.status).toBe(422);
    expect(await response.json()).toEqual({ error: "invalid_idempotency_key" });
    expect(notifyRestaurant).not.toHaveBeenCalled();
  });

  it("rate limits the sixth request from the same forwarded client", async () => {
    const handler = createReservationApiHandler({
      repository: new LocalDevelopmentReservationRepository(),
      allowedOrigin: "https://staging.malcriadobcn.com",
      notifyRestaurant: () => Promise.resolve(),
      now: () => 1_000,
    });
    const makeRequest = () =>
      new Request("https://staging.malcriadobcn.com/api/reservations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Idempotency-Key": validPayload.metadata.idempotencyKey,
          Origin: "https://staging.malcriadobcn.com",
          "X-Forwarded-For": "203.0.113.8, 10.0.0.1",
        },
        body: JSON.stringify(validPayload),
      });

    for (let attempt = 0; attempt < 5; attempt += 1) {
      expect((await handler(makeRequest())).status).toBe(202);
    }
    expect((await handler(makeRequest())).status).toBe(429);
  });
});
