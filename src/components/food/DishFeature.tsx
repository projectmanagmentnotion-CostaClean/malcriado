import { EditorialImage } from "@/components/media/EditorialImage";
import { Cluster } from "@/components/layout/Cluster";
import { Stack } from "@/components/layout/Stack";
import { AllergenStatus } from "@/components/food/AllergenStatus";
import { DietaryTags } from "@/components/food/DietaryTags";
import { PriceDisplay } from "@/components/food/PriceDisplay";
import { LinkButton } from "@/components/ui/LinkButton";
import { getAsset } from "@/content";
import { buildBookingIntentHref } from "@/lib/booking/buildBookingIntentHref";
import type { MenuItem } from "@/types/content";

interface DishFeatureProps {
  readonly item: MenuItem;
}

export function DishFeature({ item }: DishFeatureProps) {
  const asset = item.media?.assetId ? getAsset(item.media.assetId) : null;

  return (
    <article className="dish-feature">
      {asset ? (
        <EditorialImage
          asset={asset}
          crop={item.media?.crop ?? "landscape"}
          ratio="cinema"
          sizes="(max-width: 900px) 100vw, 54vw"
          alt={item.media?.alt ?? item.name}
        />
      ) : null}
      <Stack className="dish-feature__body" gap="lg">
        <div>
          <p className="eyebrow">Plato protagonista</p>
          <h2>{item.name}</h2>
          <p>
            {item.description ??
              "Disponible en la carta de Malcriado. Consulta al equipo por ingredientes, precio y disponibilidad del momento."}
          </p>
        </div>
        <Cluster gap="md">
          <PriceDisplay price={item.price} />
          <DietaryTags tags={item.dietaryTags} />
        </Cluster>
        <AllergenStatus
          allergens={item.allergens}
          status={item.allergenStatus}
        />
        <Cluster gap="sm">
          <LinkButton iconEnd="arrow-right" to="/menu/" variant="editorial">
            Ver carta
          </LinkButton>
          <LinkButton
            to={buildBookingIntentHref({
              context: "featured-dish",
              item: item.slug,
              category: item.categoryId,
            })}
            variant="secondary"
          >
            Reservar este plan
          </LinkButton>
        </Cluster>
      </Stack>
    </article>
  );
}
