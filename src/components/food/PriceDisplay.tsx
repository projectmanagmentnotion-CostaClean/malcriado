import type { MenuItemPrice } from "@/types/content";
import { StatusMessage } from "@/components/ui/StatusMessage";

interface PriceDisplayProps {
  readonly price: MenuItemPrice;
}

export function PriceDisplay({ price }: PriceDisplayProps) {
  if (price.status !== "VERIFIED" || price.amount === null) {
    return (
      <StatusMessage
        className="inline-status"
        title="Precio pendiente"
        tone="pending"
      >
        <p>{price.note ?? "Pendiente de validacion editorial."}</p>
      </StatusMessage>
    );
  }

  return (
    <p className="price-display">
      {price.amount.toFixed(2)} {price.currency}
      {price.unitLabel ? <span> / {price.unitLabel}</span> : null}
    </p>
  );
}
