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
  metadata: {
    requestId: "28fb86a1-4d6d-4f70-8dd5-e66fc9120522",
    submittedAt: "2026-07-22T10:00:05.000Z",
    honeypot: "",
    idempotencyKey: "reservation-session-abc123",
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
});
