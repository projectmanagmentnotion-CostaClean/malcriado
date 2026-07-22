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
  dateTime: { date: "2099-08-01", time: "20:30", timezone: "Europe/Madrid" },
  preferences: {
    guests: 2,
    zone: "terraza",
    occasion: "",
    allergies: "Frutos secos",
    message: "",
  },
  consent: {
    privacyAccepted: true,
    includeAllergiesInMessage: false,
  },
  context: parseReservationContext(new URLSearchParams()),
  metadata: {
    requestId: "28fb86a1-4d6d-4f70-8dd5-e66fc9120522",
    startedAt: "2026-07-22T10:00:00.000Z",
    submittedAt: "2026-07-22T10:00:05.000Z",
    honeypot: "",
    fingerprint: "fingerprint-abc123",
    idempotencyKey: "reservation-session-fingerprint-abc123",
    sessionId: "session-1",
    attempt: 1,
  },
};

describe("production contact reservation provider", () => {
  it("prepares explicit contact actions without fetch or persistence", async () => {
    const fetchSpy = vi.spyOn(globalThis, "fetch");
    const result = await new ReservationProvider("contact").submit(
      request,
      request.context,
    );

    expect(result.status).toBe("prepared_for_contact");
    expect(result.code).toBe("prepared_for_contact");
    expect(decodeURIComponent(result.actions?.whatsappHref ?? "")).toContain(
      "Referencia: 28FB86A1",
    );
    expect(decodeURIComponent(result.actions?.whatsappHref ?? "")).toContain(
      "Nombre: Ada",
    );
    expect(result.actions?.whatsappHref).not.toContain("Frutos%20secos");
    expect(result.actions?.emailHref).not.toContain("%2B34600000000");
    expect(result.actions?.emailHref).not.toContain("ada%40");
    expect(fetchSpy).not.toHaveBeenCalled();
    fetchSpy.mockRestore();
  });

  it("includes allergy information only after explicit consent", async () => {
    const consentedRequest = {
      ...request,
      consent: { ...request.consent, includeAllergiesInMessage: true },
    };
    const result = await new ReservationProvider("contact").submit(
      consentedRequest,
      consentedRequest.context,
    );

    expect(decodeURIComponent(result.actions?.whatsappHref ?? "")).toContain(
      "Alergias o intolerancias: Frutos secos",
    );
  });
});
