import { buildReservationAnalyticsPayload } from "@/features/reservation/analytics/reservationAnalytics";
import { parseReservationContext } from "@/features/reservation/context/reservationContext";
import type { ReservationRequest } from "@/features/reservation/domain/reservationTypes";

describe("reservation analytics payload", () => {
  it("does not expose PII or free text", () => {
    const request: ReservationRequest = {
      contact: {
        name: "Ada Lovelace",
        phone: "+34 600 000 000",
        email: "ada@example.com",
        preferredChannel: "email",
      },
      dateTime: {
        date: "2026-07-22",
        time: "20:30",
        timezone: "Europe/Madrid",
      },
      preferences: {
        guests: 4,
        message: "Mesa tranquila y acceso con carrito",
      },
      consent: {
        privacyAccepted: true,
      },
      context: parseReservationContext(
        new URLSearchParams("dish=pizza-margarita&context=home-hero"),
      ),
      metadata: {
        startedAt: "2026-07-21T17:00:00.000Z",
        submittedAt: "2026-07-21T17:00:05.000Z",
        honeypot: "",
        fingerprint: "fingerprint-1",
        idempotencyKey: "reservation-session-fingerprint-1",
        sessionId: "session",
        attempt: 1,
      },
    };

    const payload = buildReservationAnalyticsPayload(request);

    expect(payload).toEqual({
      preferredChannel: "email",
      guests: 4,
      hasMessage: true,
      contextTags: [
        "dish:pizza-margarita",
        "category:pizzas",
        "context:home-hero",
      ],
    });
    expect(JSON.stringify(payload)).not.toMatch(/Ada|600|example|carrito/i);
  });
});
