import type { Offer } from "@/types/content";

interface OfferValidityProps {
  readonly offer: Offer;
}

export function OfferValidity({ offer }: OfferValidityProps) {
  const starts = offer.validity.startsAt ?? "Pendiente";
  const ends = offer.validity.endsAt ?? "Pendiente";

  return (
    <p className="offer-validity">
      Vigencia: {starts} - {ends}
    </p>
  );
}
