import type {
  PersonProfile,
  QuoteSource,
  StoryBlock,
  TimelineItem,
} from "@/types/content";
import { contentSources } from "@/content/shared/sources";

export const peopleProfiles: readonly PersonProfile[] = [
  {
    id: "person-hector",
    name: "Hector",
    role: "Chef venezolano",
    biography:
      "Malcriado presenta a Hector como chef venezolano y cara visible de la propuesta culinaria.",
    status: "VERIFIED",
    mediaAssetId: null,
    references: {
      sourceIds: [
        contentSources.siteNosotros.id,
        contentSources.contentInventory.id,
      ],
    },
  },
];

export const storyBlocks: readonly StoryBlock[] = [
  {
    id: "story-origin",
    eyebrow: "Origen",
    heading: "Malcriado une cocina fusion, producto para compartir y mar.",
    body: "La propuesta combina sabores latinoamericanos y mediterraneos en un formato pensado para comer, cenar y reservar frente al mar.",
    status: "VERIFIED",
    references: {
      sourceIds: [
        contentSources.siteNosotros.id,
        contentSources.contentInventory.id,
      ],
    },
  },
  {
    id: "story-chef",
    eyebrow: "Chef",
    heading: "Hector lidera la cocina visible de Malcriado.",
    body: "La web presenta a Hector como chef visible del proyecto. La biografia ampliada y el recorrido completo se estan terminando de confirmar con el equipo.",
    status: "PENDING_VALIDATION",
    references: {
      sourceIds: [
        contentSources.siteNosotros.id,
        contentSources.contentInventory.id,
      ],
    },
  },
];

export const timelineItems: readonly TimelineItem[] = [
  {
    id: "timeline-fusion",
    label: "Fusion latinoamericana y mediterranea",
    description:
      "Sabores, platos y cocteles con una mezcla reconocible en toda la experiencia.",
    status: "VERIFIED",
    references: {
      sourceIds: [
        contentSources.siteHome.id,
        contentSources.siteMenu.id,
        contentSources.siteNosotros.id,
      ],
    },
  },
];

export const quoteSources: readonly QuoteSource[] = [];
