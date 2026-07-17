import { EmptyState } from "@/components/ui/EmptyState";
import { LinkButton } from "@/components/ui/LinkButton";
import { OfferBadge } from "@/components/offers/OfferBadge";
import { OfferValidity } from "@/components/offers/OfferValidity";
import type { Offer } from "@/types/content";

interface OfferCardProps {
  readonly offer: Offer | null;
  readonly pendingMessage?: string;
}

export function OfferCard({ offer, pendingMessage }: OfferCardProps) {
  if (!offer) {
    return (
      <EmptyState
        title="Especial pendiente"
        body={
          pendingMessage ??
          "No se publican promociones sin fechas verificables ni contenido inventado."
        }
      />
    );
  }

  return (
    <article className="offer-card">
      <OfferBadge status={offer.computedStatus} />
      <h3>{offer.title}</h3>
      <p>
        {offer.description ??
          offer.fallbackContent ??
          "Oferta sin copy ampliado."}
      </p>
      <OfferValidity offer={offer} />
      {offer.cta ? (
        <LinkButton to={offer.cta.route} variant="secondary">
          {offer.cta.label}
        </LinkButton>
      ) : null}
    </article>
  );
}
