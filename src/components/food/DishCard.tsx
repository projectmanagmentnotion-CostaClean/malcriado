import { EditorialImage } from "@/components/media/EditorialImage";
import { AllergenStatus } from "@/components/food/AllergenStatus";
import { DietaryTags } from "@/components/food/DietaryTags";
import { PriceDisplay } from "@/components/food/PriceDisplay";
import { getAsset } from "@/content";
import type { MenuItem } from "@/types/content";

interface DishCardProps {
  readonly item: MenuItem;
}

export function DishCard({ item }: DishCardProps) {
  const asset = item.media?.assetId ? getAsset(item.media.assetId) : null;

  return (
    <article className="dish-card">
      {asset ? (
        <EditorialImage
          asset={asset}
          crop={item.media?.crop ?? "editorial"}
          ratio="portrait"
          sizes="(max-width: 768px) 100vw, 28vw"
          alt={item.media?.alt ?? item.name}
        />
      ) : null}
      <div className="dish-card__body">
        <p className="eyebrow">Carta</p>
        <h3>{item.name}</h3>
        <p>
          {item.description ?? "Descripcion pendiente de ampliacion editorial."}
        </p>
        <PriceDisplay price={item.price} />
        <DietaryTags tags={item.dietaryTags} />
        <AllergenStatus
          allergens={item.allergens}
          status={item.allergenStatus}
        />
      </div>
    </article>
  );
}
