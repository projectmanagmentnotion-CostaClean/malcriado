import { parseReservationContext } from "@/features/reservation/context/reservationContext";
import { getCurrentMadridDateIso } from "@/features/reservation/config/reservationConfig";
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
        zone: "sin-preferencia",
        occasion: "",
        allergies: "",
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
        zone: "interior",
        occasion: "Cena",
        allergies: "Ninguna",
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

  it("ignores invalid context params without blocking a valid submission", () => {
    const context = parseReservationContext(
      new URLSearchParams("dish=<script>&source=unknown"),
    );

    const validation = validateReservationFormValues({
      context,
      startedAtMs: Date.now() - 5000,
      values: {
        name: "Ada Lovelace",
        phone: "+34 600 000 000",
        email: "",
        date: getCurrentMadridDateIso(),
        time: "20:00",
        guests: "2",
        zone: "sin-preferencia",
        occasion: "",
        allergies: "",
        message: "",
        preferredChannel: "phone",
        privacyAccepted: true,
        website: "",
      },
    });

    expect(context.ignoredParams).toEqual(["dish:<script>", "source:unknown"]);
    expect(
      validation.errors.some((error) => error.code === "invalid_context_param"),
    ).toBe(false);
  });

  it("computes the minimum date in Europe/Madrid timezone", () => {
    const isoDate = getCurrentMadridDateIso(
      new Date("2026-07-21T23:30:00.000Z"),
    );

    expect(isoDate).toBe("2026-07-22");
  });
});
