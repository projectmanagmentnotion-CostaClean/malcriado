import { reservationConfig } from "@/features/reservation/config/reservationConfig";

interface ReservationGuestFieldProps {
  readonly id: string;
  readonly name: string;
  readonly value: string;
  readonly labelledBy?: string;
  readonly describedBy?: string;
  readonly invalid?: boolean;
  readonly onChange: (value: string) => void;
}

export function ReservationGuestField({
  id,
  name,
  value,
  labelledBy,
  describedBy,
  invalid = false,
  onChange,
}: ReservationGuestFieldProps) {
  const currentValue = Number(value) || reservationConfig.guestLimits.min;

  function step(next: number) {
    const safeValue = Math.max(reservationConfig.guestLimits.min, next);
    onChange(String(safeValue));
  }

  return (
    <div className="reservation-guest-field">
      <button
        aria-label="Reducir comensales"
        className="reservation-guest-stepper"
        onClick={() => step(currentValue - 1)}
        type="button"
      >
        -
      </button>
      <input
        aria-labelledby={labelledBy}
        aria-describedby={describedBy}
        aria-invalid={invalid}
        className="input-control reservation-guest-input"
        id={id}
        inputMode="numeric"
        min={reservationConfig.guestLimits.min}
        name={name}
        onChange={(event) => onChange(event.target.value)}
        required
        type="number"
        value={value}
      />
      <button
        aria-label="Aumentar comensales"
        className="reservation-guest-stepper"
        onClick={() => step(currentValue + 1)}
        type="button"
      >
        +
      </button>
    </div>
  );
}
