import { useEffect, useState } from "react";
import type { ReservationSubmission } from "@/features/reservation/domain/reservationTypes";
import { copyReservationMessage } from "@/services/reservations/reservationFallback";

interface ReservationStatusPanelProps {
  readonly submission: ReservationSubmission;
  readonly onRetry: () => void;
}

export function ReservationStatusPanel({
  submission,
  onRetry,
}: ReservationStatusPanelProps) {
  const [channelFeedback, setChannelFeedback] = useState("");
  const actions = submission.result?.actions;

  useEffect(() => {
    setChannelFeedback("");
  }, [actions?.message]);

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
      {actions ? (
        <>
          <div className="reservation-message-preview">
            <h4>Revisa el mensaje antes de continuar</h4>
            <pre>{actions.message}</pre>
          </div>
          <div className="reservation-status-panel__actions">
            <a
              className="ui-button ui-button--editorial ui-button--sm"
              href={actions.whatsappHref}
              rel="noreferrer"
              target="_blank"
            >
              Enviar por WhatsApp
            </a>
            <a
              className="ui-button ui-button--secondary ui-button--sm"
              href={actions.emailHref}
              onClick={() => {
                setChannelFeedback(
                  "Se ha abierto tu aplicación de correo. Revisa el mensaje y pulsa Enviar.",
                );
              }}
            >
              Enviar por correo
            </a>
          </div>
          <div
            aria-label="Alternativas de contacto"
            className="reservation-status-panel__fallbacks"
          >
            <button
              className="ui-button ui-button--ghost ui-button--sm"
              onClick={() => {
                void copyReservationMessage(actions.message).then((copied) => {
                  setChannelFeedback(
                    copied
                      ? "Mensaje copiado. Puedes pegarlo en el canal que prefieras."
                      : "No se ha podido copiar automáticamente. Selecciona el texto de la vista previa.",
                  );
                });
              }}
              type="button"
            >
              Copiar mensaje
            </button>
            <a href={actions.telephoneHref}>Llamar al restaurante</a>
          </div>
          {channelFeedback ? (
            <p aria-live="polite" className="reservation-inline-note">
              {channelFeedback}
            </p>
          ) : null}
        </>
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
            Reintentar
          </button>
        </div>
      ) : null}
    </section>
  );
}
