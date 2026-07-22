import type { Offer } from "../../types/content";
import { contentSources } from "../shared/sources";

export const offers: readonly Offer[] = [];

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
