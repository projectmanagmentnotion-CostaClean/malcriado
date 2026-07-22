import { parseReservationContext } from "@/features/reservation/context/reservationContext";
import type { ReservationRequest } from "@/features/reservation/domain/reservationTypes";
import { ReservationProvider } from "@/services/reservations/reservationProvider";

const request: ReservationRequest = {
  contact: {
    name: "Ada",
    phone: "+34600000000",
    email: "",
    preferredChannel: "whatsapp",
  },
  dateTime: { date: "2026-08-01", time: "20:30", timezone: "Europe/Madrid" },
  preferences: {
    guests: 2,
    zone: "terraza",
    occasion: "",
    allergies: "Frutos secos",
    message: "",
  },
  consent: { privacyAccepted: true },
  context: parseReservationContext(new URLSearchParams()),
  metadata: {
    requestId: "28fb86a1-4d6d-4f70-8dd5-e66fc9120522",
    startedAt: "2026-07-22T10:00:00.000Z",
    submittedAt: "2026-07-22T10:00:05.000Z",
    honeypot: "",
    fingerprint: "abc123",
    idempotencyKey: "reservation-session-abc123",
    sessionId: "session",
    attempt: 1,
  },
};

describe("production reservation fallback", () => {
  it("requires an explicit channel action and does not simulate persistence", async () => {
    const result = await new ReservationProvider().submit(request);

    expect(result.status).toBe("action_required");
    expect(result.code).toBe("channel_required");
    expect(result.actions?.whatsappHref).toContain("28fb86a1");
    expect(result.actions?.whatsappHref).toContain("Frutos%20secos");
  });
});
