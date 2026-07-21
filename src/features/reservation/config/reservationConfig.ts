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

export const reservationConfig: ReservationConfig = {
  timezone: "Europe/Madrid",
  minimumSubmissionSeconds: 3,
  minDateIso: "2026-07-21",
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
    value: null,
    note: "No existe calendario de cierre confirmado para bloquear fechas.",
  },
  serviceHours: {
    status: "PENDING_VALIDATION",
    value: null,
    note: "Los horarios por servicio siguen sujetos a confirmacion manual.",
  },
  exceptions: {
    status: "PENDING_VALIDATION",
    value: [],
    note: "No hay excepciones verificadas cargadas en frontend.",
  },
};
