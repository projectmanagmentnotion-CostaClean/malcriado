import type { MenuItemPrice } from "@/types/content";
import { StatusMessage } from "@/components/ui/StatusMessage";

interface PriceDisplayProps {
  readonly price: MenuItemPrice;
}

export function PriceDisplay({ price }: PriceDisplayProps) {
  if (price.status !== "VERIFIED" || price.amount === null) {
    return (
      <StatusMessage
        className="inline-status menu-item-status"
        title="Precio a consultar"
        tone="pending"
      >
        <p>
          {price.note ??
            "Consulta el precio actual con el equipo antes de reservar o hacer tu pedido."}
        </p>
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
