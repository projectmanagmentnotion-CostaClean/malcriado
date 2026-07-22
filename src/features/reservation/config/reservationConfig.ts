export interface PendingValidationRule<T> {
  readonly status: "PENDING_VALIDATION" | "VERIFIED";
  readonly value: T | null;
  readonly note: string;
}

export interface ReservationConfig {
  readonly timezone: "Europe/Madrid";
  readonly minimumSubmissionSeconds: number;
  readonly minDateIso: string;
  readonly guestLimits: {
    readonly min: number;
    readonly max: number | null;
  };
  readonly leadTimeMinutes: PendingValidationRule<number>;
  readonly futureWindowDays: PendingValidationRule<number>;
  readonly closedWeekdays: PendingValidationRule<readonly number[]>;
  readonly serviceHours: PendingValidationRule<
    Readonly<Record<string, readonly string[]>>
  >;
  readonly exceptions: PendingValidationRule<
    readonly {
      readonly date: string;
      readonly slots: readonly string[];
      readonly status: "closed" | "adjusted";
    }[]
  >;
}

import {
  getServiceHoursByWeekday,
  proposedOpeningHours,
} from "@/content/business/openingHours";

function formatDatePart(parts: Intl.DateTimeFormatPart[], type: string) {
  return parts.find((part) => part.type === type)?.value ?? "";
}

export function getCurrentMadridDateIso(now: Date = new Date()) {
  const formatter = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Madrid",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  const parts = formatter.formatToParts(now);
  const year = formatDatePart(parts, "year");
  const month = formatDatePart(parts, "month");
  const day = formatDatePart(parts, "day");

  return `${year}-${month}-${day}`;
}

export const reservationConfig: ReservationConfig = {
  timezone: "Europe/Madrid",
  minimumSubmissionSeconds: 3,
  minDateIso: getCurrentMadridDateIso(),
  guestLimits: {
    min: 1,
    max: null,
  },
  leadTimeMinutes: {
    status: "PENDING_VALIDATION",
    value: null,
    note: "La antelacion minima real sigue pendiente de confirmacion operativa.",
  },
  futureWindowDays: {
    status: "PENDING_VALIDATION",
    value: null,
    note: "La ventana de reserva futura no esta validada todavia.",
  },
  closedWeekdays: {
    status: "PENDING_VALIDATION",
    value: proposedOpeningHours.flatMap((day, index) =>
      day.intervals.length === 0 ? [index] : [],
    ),
    note: "Configuracion comercial propuesta; requiere validacion del titular antes del lanzamiento.",
  },
  serviceHours: {
    status: "PENDING_VALIDATION",
    value: getServiceHoursByWeekday(),
    note: "Configuracion comercial propuesta; cada solicitud sigue sujeta a revision manual.",
  },
  exceptions: {
    status: "PENDING_VALIDATION",
    value: [],
    note: "No hay excepciones verificadas cargadas en frontend.",
  },
};
