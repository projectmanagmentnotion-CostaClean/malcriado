import { reservationAdapter } from "@/features/reservation/adapters/MockReservationAdapter";
import { parseReservationContext } from "@/features/reservation/context/reservationContext";

describe("booking provider", () => {
  it("returns a pending confirmation message", async () => {
    const result = await reservationAdapter.submit({
      contact: {
        name: "Ada",
        phone: "+34 600 000 000",
        email: "ada@example.com",
        preferredChannel: "email",
      },
      dateTime: {
        date: "2026-07-21",
        time: "20:00",
        timezone: "Europe/Madrid",
      },
      preferences: {
        guests: 2,
        zone: "sin-preferencia",
        occasion: "",
        allergies: "",
        message: "",
      },
      consent: {
        privacyAccepted: true,
      },
      context: parseReservationContext(
        new URLSearchParams("context=home-hero"),
      ),
      metadata: {
        requestId: "28fb86a1-4d6d-4f70-8dd5-e66fc9120522",
        startedAt: new Date("2026-07-21T18:00:00.000Z").toISOString(),
        submittedAt: new Date("2026-07-21T18:00:05.000Z").toISOString(),
        honeypot: "",
        fingerprint: "fingerprint-ada",
        idempotencyKey: "reservation-session-fingerprint-ada",
        sessionId: "session",
        attempt: 1,
      },
    });

    expect(result.status).toBe("success");
    expect(result.code).toBe("pending_confirmation");
    expect(result.message).toMatch(/no queda confirmada/i);
  });
});
