import type { Offer } from "../../types/content";
import { contentSources } from "../shared/sources";

export const offers: readonly Offer[] = [];

export const offerEditorialState = {
  status: "PENDING_CONTENT" as const,
  message:
    "No se han recuperado ofertas publicas vigentes con fechas verificables. La ruta de especiales debe permanecer sin promociones ficticias.",
  references: {
    sourceIds: [
      contentSources.currentSiteAudit.id,
      contentSources.contentInventory.id,
    ],
  },
};
