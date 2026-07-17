import { OfferCard } from "@/components/offers/OfferCard";
import type { Offer } from "@/types/content";

interface OfferFeatureProps {
  readonly offer: Offer | null;
  readonly pendingMessage?: string;
}

export function OfferFeature(props: OfferFeatureProps) {
  return (
    <section className="offer-feature">
      <p className="eyebrow">Especiales</p>
      <OfferCard {...props} />
    </section>
  );
}
