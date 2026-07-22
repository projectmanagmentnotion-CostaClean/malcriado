import type { MenuItemPrice } from "@/types/content";

interface PriceDisplayProps {
  readonly price: MenuItemPrice;
}

export function PriceDisplay({ price }: PriceDisplayProps) {
  if (price.amount === null) {
    return <p className="price-display">Consultar</p>;
  }

  return (
    <p className="price-display">
      {new Intl.NumberFormat("es-ES", {
        style: "currency",
        currency: price.currency,
      }).format(price.amount)}
      {price.unitLabel ? <span> / {price.unitLabel}</span> : null}
      <span className="sr-only">, IVA incluido cuando corresponda</span>
    </p>
  );
}
