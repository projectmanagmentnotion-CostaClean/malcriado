import type { ReservationSubmission } from "@/features/reservation/domain/reservationTypes";

interface ReservationStatusPanelProps {
  readonly submission: ReservationSubmission;
  readonly onRetry: () => void;
}

export function ReservationStatusPanel({
  submission,
  onRetry,
}: ReservationStatusPanelProps) {
  if (submission.status === "idle") {
    return null;
  }

  const retryable = submission.result?.retryable ?? false;

  return (
    <section
      aria-live={submission.status === "submitting" ? "polite" : "assertive"}
      className="reservation-status-panel"
      data-status={submission.status}
    >
      {submission.title ? (
        <h3 className="reservation-status-panel__title">{submission.title}</h3>
      ) : null}
      <p>{submission.message}</p>
      {submission.result?.actions ? (
        <div className="reservation-status-panel__actions">
          <a
            className="ui-button ui-button--editorial ui-button--sm"
            href={submission.result.actions.whatsappHref}
            rel="noreferrer"
            target="_blank"
          >
            Enviar por WhatsApp
          </a>
          <a
            className="ui-button ui-button--secondary ui-button--sm"
            href={submission.result.actions.emailHref}
          >
            Enviar por correo
          </a>
        </div>
      ) : null}
      {submission.result?.retryAfterSeconds ? (
        <p className="reservation-inline-note">
          Reintenta en aproximadamente {submission.result.retryAfterSeconds}{" "}
          segundos si prefieres seguir en el formulario.
        </p>
      ) : null}
      {retryable ? (
        <div className="reservation-status-panel__actions">
          <button
            className="ui-button ui-button--secondary ui-button--sm"
            onClick={onRetry}
            type="button"
          >
            Reintentar envio
          </button>
        </div>
      ) : null}
    </section>
  );
}
