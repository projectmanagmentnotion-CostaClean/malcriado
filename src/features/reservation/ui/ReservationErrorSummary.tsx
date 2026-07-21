import type { ReservationError } from "@/features/reservation/domain/reservationTypes";

interface ReservationErrorSummaryProps {
  readonly errors: readonly ReservationError[];
}

export function ReservationErrorSummary({
  errors,
}: ReservationErrorSummaryProps) {
  if (errors.length === 0) {
    return null;
  }

  return (
    <div
      aria-labelledby="reservation-error-summary-title"
      className="reservation-error-summary"
      role="alert"
      tabIndex={-1}
    >
      <p id="reservation-error-summary-title">
        Revisa estos puntos antes de enviar la solicitud:
      </p>
      <ul>
        {errors.map((error) => (
          <li key={`${error.field}-${error.code}`}>{error.message}</li>
        ))}
      </ul>
    </div>
  );
}
