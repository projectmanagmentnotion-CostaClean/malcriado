import type { OfferStatus } from "@/types/content";

interface OfferBadgeProps {
  readonly status: OfferStatus;
}

export function OfferBadge({ status }: OfferBadgeProps) {
  return (
    <span className={`offer-badge offer-badge--${status.toLowerCase()}`}>
      {status}
    </span>
  );
}
