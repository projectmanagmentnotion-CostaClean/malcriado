import { z } from "zod";
import { reservationConfig } from "@/features/reservation/config/reservationConfig";
import type {
  ReservationContext,
  ReservationError,
  ReservationFormValues,
  ReservationPreferredChannel,
  ReservationRequest,
} from "@/features/reservation/domain/reservationTypes";

const emailSchema = z.email("Introduce un correo electronico valido.");

function normalizeSpace(value: string) {
  return value.replace(/\s+/g, " ").trim();
}

function hasLetters(value: string) {
  return /\p{L}/u.test(value);
}

function countPhoneDigits(value: string) {
  return (value.match(/\d/g) ?? []).length;
}

function hashString(value: string) {
  let hash = 2166136261;

  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }

  return Math.abs(hash >>> 0).toString(36);
}

export function sanitizeReservationFormValues(
  values: ReservationFormValues,
): ReservationFormValues {
  return {
    ...values,
    name: normalizeSpace(values.name),
    phone: normalizeSpace(values.phone),
    email: normalizeSpace(values.email).toLowerCase(),
    date: values.date.trim(),
    time: values.time.trim(),
    guests: values.guests.trim(),
    message: normalizeSpace(values.message),
    website: values.website.trim(),
  };
}

export function validateReservationFormValues(input: {
  readonly values: ReservationFormValues;
  readonly context: ReservationContext;
  readonly startedAtMs: number;
}): {
  readonly values: ReservationFormValues;
  readonly errors: readonly ReservationError[];
} {
  const values = sanitizeReservationFormValues(input.values);
  const errors: ReservationError[] = [];

  if (values.website.length > 0) {
    errors.push({
      field: "honeypot",
      code: "honeypot_filled",
      message: "No se ha podido validar el envio. Vuelve a intentarlo.",
    });
  }

  if (
    Date.now() - input.startedAtMs <
    reservationConfig.minimumSubmissionSeconds * 1000
  ) {
    errors.push({
      field: "form",
      code: "submitted_too_fast",
      message:
        "Espera unos segundos antes de enviar para validar que la solicitud la realiza una persona.",
    });
  }

  if (values.name.length < 2 || !hasLetters(values.name)) {
    errors.push({
      field: "name",
      code: "invalid_name",
      message: "Introduce un nombre real para identificar la solicitud.",
    });
  }

  if (values.name.length > 80) {
    errors.push({
      field: "name",
      code: "name_too_long",
      message: "El nombre no puede superar los 80 caracteres.",
    });
  }

  const phoneDigits = countPhoneDigits(values.phone);
  if (phoneDigits < 7 || phoneDigits > 15) {
    errors.push({
      field: "phone",
      code: "invalid_phone",
      message:
        "Introduce un telefono valido con prefijo internacional si procede.",
    });
  }

  if (values.phone.length > 32) {
    errors.push({
      field: "phone",
      code: "phone_too_long",
      message: "El telefono no puede superar los 32 caracteres.",
    });
  }

  if (values.preferredChannel === "email") {
    const email = emailSchema.safeParse(values.email);
    if (!email.success) {
      errors.push({
        field: "email",
        code: "email_required",
        message:
          "Si prefieres respuesta por correo, introduce un email valido.",
      });
    }
  } else if (values.email.length > 0) {
    const email = emailSchema.safeParse(values.email);
    if (!email.success) {
      errors.push({
        field: "email",
        code: "invalid_email",
        message: "Revisa el formato del email o dejalo vacio.",
      });
    }
  }

  if (!values.date) {
    errors.push({
      field: "date",
      code: "missing_date",
      message: "Selecciona una fecha deseada para la visita.",
    });
  } else if (values.date < reservationConfig.minDateIso) {
    errors.push({
      field: "date",
      code: "past_date",
      message: "La fecha debe ser hoy o posterior.",
    });
  }

  if (!values.time) {
    errors.push({
      field: "time",
      code: "missing_time",
      message: "Indica una hora orientativa para la solicitud.",
    });
  }

  const guests = Number(values.guests);
  if (!Number.isInteger(guests) || guests < reservationConfig.guestLimits.min) {
    errors.push({
      field: "guests",
      code: "invalid_guests",
      message: "Indica al menos una persona.",
    });
  }

  if (
    reservationConfig.guestLimits.max !== null &&
    guests > reservationConfig.guestLimits.max
  ) {
    errors.push({
      field: "guests",
      code: "guests_above_max",
      message: "El numero de personas supera el limite configurado.",
    });
  }

  if (values.message.length > 500) {
    errors.push({
      field: "message",
      code: "message_too_long",
      message: "El mensaje no puede superar los 500 caracteres.",
    });
  }

  if (!values.privacyAccepted) {
    errors.push({
      field: "privacyAccepted",
      code: "privacy_required",
      message: "Debes aceptar la informacion de privacidad antes de enviar.",
    });
  }

  return { values, errors };
}

export function buildReservationFingerprint(input: {
  readonly values: ReservationFormValues;
  readonly context: ReservationContext;
}) {
  const values = sanitizeReservationFormValues(input.values);
  const normalized = JSON.stringify({
    name: values.name,
    phone: values.phone,
    email: values.email,
    date: values.date,
    time: values.time,
    guests: values.guests,
    message: values.message,
    preferredChannel: values.preferredChannel,
    privacyAccepted: values.privacyAccepted,
    context: input.context.tags.map((tag) => `${tag.kind}:${tag.slug}`),
  });

  return hashString(normalized);
}

export function buildReservationIdempotencyKey(input: {
  readonly sessionId: string;
  readonly fingerprint: string;
}) {
  return `reservation-${input.sessionId}-${input.fingerprint}`;
}

export function buildReservationRequest(input: {
  readonly values: ReservationFormValues;
  readonly context: ReservationContext;
  readonly startedAtMs: number;
  readonly sessionId: string;
  readonly attempt: number;
}): ReservationRequest {
  const values = sanitizeReservationFormValues(input.values);
  const preferredChannel: ReservationPreferredChannel = values.preferredChannel;
  const fingerprint = buildReservationFingerprint({
    values,
    context: input.context,
  });
  const idempotencyKey = buildReservationIdempotencyKey({
    sessionId: input.sessionId,
    fingerprint,
  });

  return {
    contact: {
      name: values.name,
      phone: values.phone,
      email: values.email,
      preferredChannel,
    },
    dateTime: {
      date: values.date,
      time: values.time,
      timezone: reservationConfig.timezone,
    },
    preferences: {
      guests: Number(values.guests),
      message: values.message,
    },
    consent: {
      privacyAccepted: values.privacyAccepted,
    },
    context: input.context,
    metadata: {
      startedAt: new Date(input.startedAtMs).toISOString(),
      submittedAt: new Date().toISOString(),
      honeypot: values.website,
      fingerprint,
      idempotencyKey,
      sessionId: input.sessionId,
      attempt: input.attempt,
    },
  };
}
