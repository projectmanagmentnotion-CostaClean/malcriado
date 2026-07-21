import { LinkButton } from "@/components/ui/LinkButton";
import type { ReservationContext } from "@/features/reservation/domain/reservationTypes";

interface ReservationContextPanelProps {
  readonly context: ReservationContext;
  readonly clearHref: string;
}

export function ReservationContextPanel({
  context,
  clearHref,
}: ReservationContextPanelProps) {
  if (!context.hasContext && context.ignoredParams.length === 0) {
    return null;
  }

  return (
    <section
      aria-labelledby="reservation-context-title"
      className="reservation-context-panel"
    >
      <div className="reservation-context-panel__header">
        <p className="eyebrow" id="reservation-context-title">
          {context.summaryTitle ?? "Contexto de solicitud"}
        </p>
        <LinkButton size="sm" to={clearHref} variant="ghost">
          Limpiar contexto
        </LinkButton>
      </div>
      {context.summaryBody ? <p>{context.summaryBody}</p> : null}
      {context.tags.length > 0 ? (
        <ul
          aria-label="Contexto conservado"
          className="reservation-context-panel__tags"
        >
          {context.tags.map((tag) => (
            <li key={`${tag.kind}-${tag.slug}`}>
              <span className="reservation-context-pill">
                {tag.label}
                {tag.meta ? ` / ${tag.meta}` : ""}
              </span>
            </li>
          ))}
        </ul>
      ) : null}
      {context.ignoredParams.length > 0 ? (
        <p className="reservation-inline-note">
          Se han ignorado parametros no validos:{" "}
          {context.ignoredParams.join(", ")}.
        </p>
      ) : null}
    </section>
  );
}
