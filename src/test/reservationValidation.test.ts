import { parseReservationContext } from "@/features/reservation/context/reservationContext";
import {
  buildReservationRequest,
  validateReservationFormValues,
} from "@/features/reservation/validation/reservationValidation";

describe("reservation validation", () => {
  it("requires email only when the preferred channel is email", () => {
    const context = parseReservationContext(
      new URLSearchParams("context=home-hero"),
    );
    const startedAtMs = Date.now() - 5000;

    const withoutEmail = validateReservationFormValues({
      context,
      startedAtMs,
      values: {
        name: "Ada Lovelace",
        phone: "+34 600 000 000",
        email: "",
        date: "2026-07-21",
        time: "20:00",
        guests: "2",
        message: "",
        preferredChannel: "email",
        privacyAccepted: true,
        website: "",
      },
    });

    expect(withoutEmail.errors.some((error) => error.field === "email")).toBe(
      true,
    );
  });

  it("builds a typed payload with preserved context", () => {
    const context = parseReservationContext(
      new URLSearchParams("dish=pizza-margarita&context=home-hero"),
    );

    const request = buildReservationRequest({
      context,
      startedAtMs: Date.now() - 5000,
      sessionId: "session",
      attempt: 1,
      values: {
        name: "Ada Lovelace",
        phone: "+34 600 000 000",
        email: "ada@example.com",
        date: "2026-07-22",
        time: "20:30",
        guests: "4",
        message: "Mesa tranquila, por favor",
        preferredChannel: "whatsapp",
        privacyAccepted: true,
        website: "",
      },
    });

    expect(request.context.dish?.slug).toBe("pizza-margarita");
    expect(request.context.context?.slug).toBe("home-hero");
    expect(request.preferences.guests).toBe(4);
  });
});
