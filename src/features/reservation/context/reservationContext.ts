import { menuContent, offers } from "@/content";
import type {
  ReservationContext,
  ReservationContextEntity,
} from "@/features/reservation/domain/reservationTypes";

const allowedContexts = new Map<string, string>([
  ["contact", "Contacto"],
  ["featured-dish", "Plato destacado"],
  ["footer", "Footer"],
  ["header", "Cabecera"],
  ["home-booking-panel", "Panel de reserva"],
  ["home-featured-dish", "Plato destacado home"],
  ["home-hero", "Hero principal"],
  ["home-special", "Especial destacado home"],
  ["menu-category", "Categoria de carta"],
  ["mobile-nav", "Menu movil"],
  ["offer", "Especial"],
  ["section-booking-callout", "Bloque editorial"],
  ["shell", "CTA persistente"],
  ["specials", "Especiales"],
]);

const allowedSources = new Map<string, string>([
  ["contact", "Contacto"],
  ["footer", "Footer"],
  ["home", "Home"],
  ["menu", "Carta"],
  ["specials", "Especiales"],
]);

function createEntity(
  kind: ReservationContextEntity["kind"],
  slug: string,
  label: string,
  meta?: string,
): ReservationContextEntity {
  return { kind, slug, label, ...(meta ? { meta } : {}) };
}

export function parseReservationContext(
  searchParams: URLSearchParams,
): ReservationContext {
  const ignoredParams: string[] = [];

  const dishSlug = searchParams.get("dish") ?? searchParams.get("item");
  const categorySlug = searchParams.get("category");
  const offerSlug = searchParams.get("offer");
  const contextSlug = searchParams.get("context");
  const sourceSlug = searchParams.get("source");

  const dishMatch = dishSlug
    ? (menuContent.items.find((entry) => entry.slug === dishSlug) ?? null)
    : null;
  if (dishSlug && !dishMatch) {
    ignoredParams.push(`dish:${dishSlug}`);
  }

  const categoryMatch = categorySlug
    ? (menuContent.categories.find(
        (entry) => entry.slug === categorySlug || entry.id === categorySlug,
      ) ?? null)
    : dishMatch
      ? (menuContent.categories.find(
          (entry) => entry.id === dishMatch.categoryId,
        ) ?? null)
      : null;
  if (categorySlug && !categoryMatch) {
    ignoredParams.push(`category:${categorySlug}`);
  }

  const offerMatch = offerSlug
    ? (offers.find((entry) => entry.slug === offerSlug) ?? null)
    : null;
  if (offerSlug && !offerMatch) {
    ignoredParams.push(`offer:${offerSlug}`);
  }

  const contextLabel = contextSlug ? allowedContexts.get(contextSlug) : null;
  if (contextSlug && !contextLabel) {
    ignoredParams.push(`context:${contextSlug}`);
  }

  const sourceLabel = sourceSlug ? allowedSources.get(sourceSlug) : null;
  if (sourceSlug && !sourceLabel) {
    ignoredParams.push(`source:${sourceSlug}`);
  }

  const dish = dishMatch
    ? createEntity(
        "dish",
        dishMatch.slug,
        dishMatch.name,
        categoryMatch?.label ?? undefined,
      )
    : null;
  const category = categoryMatch
    ? createEntity("category", categoryMatch.slug, categoryMatch.label)
    : null;
  const offer = offerMatch
    ? createEntity("offer", offerMatch.slug, offerMatch.title)
    : null;
  const context =
    contextSlug && contextLabel
      ? createEntity("context", contextSlug, contextLabel)
      : null;
  const source =
    sourceSlug && sourceLabel
      ? createEntity("source", sourceSlug, sourceLabel)
      : null;

  if (offer) {
    return {
      dish,
      category,
      offer,
      context,
      source,
      summaryTitle: "Solicitud iniciada desde un especial",
      summaryBody: `Llegas desde ${offer.label}. El equipo recibira ese contexto junto con la solicitud manual.`,
      tags: [offer, source, context].filter(
        Boolean,
      ) as ReservationContextEntity[],
      ignoredParams,
      hasContext: true,
    };
  }

  if (dish || category) {
    const parts = [dish?.label, category?.label].filter(Boolean);

    return {
      dish,
      category,
      offer,
      context,
      source,
      summaryTitle: "Solicitud iniciada desde carta",
      summaryBody: `Llegas con contexto de ${parts.join(" / ")}. Se conserva para orientar la respuesta manual sin afirmar disponibilidad.`,
      tags: [dish, category, source, context].filter(
        Boolean,
      ) as ReservationContextEntity[],
      ignoredParams,
      hasContext: true,
    };
  }

  if (context || source) {
    return {
      dish,
      category,
      offer,
      context,
      source,
      summaryTitle: "Solicitud iniciada desde navegacion",
      summaryBody:
        "Se conserva el origen de entrada para trazabilidad editorial y futura integracion de conversion, sin almacenar datos personales en la URL.",
      tags: [source, context].filter(Boolean) as ReservationContextEntity[],
      ignoredParams,
      hasContext: true,
    };
  }

  return {
    dish,
    category,
    offer,
    context,
    source,
    summaryTitle: null,
    summaryBody: null,
    tags: [],
    ignoredParams,
    hasContext: false,
  };
}
