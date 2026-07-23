import type { Offer } from "../../types/content";
import { contentSources } from "../shared/sources";

export const offers: readonly Offer[] = [
  {
    id: "offer-chicharron",
    slug: "especial-chicharron",
    title: "Chicharron Malcriado",
    description: "Consulta disponibilidad y detalles con el equipo.",
    label: "Especial de la casa",
    type: "promotion",
    validity: {
      startsAt: null,
      endsAt: null,
      timezone: "Europe/Madrid",
    },
    schedule: {
      weekdays: null,
      startTime: null,
      endTime: null,
    },
    assetId: "asset-034",
    cta: {
      route: "/reservar/",
      label: "Consultar disponibilidad",
      note: "La solicitud no confirma disponibilidad automaticamente.",
    },
    priority: 1,
    editorialStatus: "PENDING_CONTENT",
    computedStatus: "PENDING_CONTENT",
    audience: "ALL",
    fallbackContent:
      "Precio, composicion y vigencia pendientes de confirmacion.",
    references: {
      sourceIds: [
        contentSources.siteMenu.id,
        contentSources.contentInventory.id,
      ],
    },
  },
];

export const offerEditorialState = {
  status: "PENDING_CONTENT" as const,
  message:
    "Ahora mismo no hay promociones activas publicadas. Puedes seguir consultando la carta y reservar igualmente.",
  references: {
    sourceIds: [
      contentSources.currentSiteAudit.id,
      contentSources.contentInventory.id,
    ],
  },
};
