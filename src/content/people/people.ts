import type { PersonProfile, QuoteSource, StoryBlock, TimelineItem } from "@/types/content";
import { contentSources } from "@/content/shared/sources";

export const peopleProfiles: readonly PersonProfile[] = [
  {
    id: "person-hector",
    name: "Héctor",
    role: "Chef venezolano",
    biography:
      "Malcriado presenta a Héctor como chef venezolano y lider creativo del proyecto.",
    status: "VERIFIED",
    mediaAssetId: null,
    references: {
      sourceIds: [contentSources.siteNosotros.id, contentSources.contentInventory.id],
    },
  },
];

export const storyBlocks: readonly StoryBlock[] = [
  {
    id: "story-origin",
    eyebrow: "Origen",
    heading: "Malcriado nace de una pasion por la gastronomia y la fusion de culturas.",
    body: null,
    status: "VERIFIED",
    references: {
      sourceIds: [contentSources.siteNosotros.id, contentSources.contentInventory.id],
    },
  },
  {
    id: "story-chef",
    eyebrow: "Chef",
    heading: "Héctor aparece como la autoria culinaria visible del proyecto.",
    body:
      "La trayectoria ampliada y el cargo exacto siguen pendientes de confirmacion directa del titular.",
    status: "PENDING_VALIDATION",
    references: {
      sourceIds: [contentSources.siteNosotros.id, contentSources.contentInventory.id],
    },
  },
];

export const timelineItems: readonly TimelineItem[] = [
  {
    id: "timeline-fusion",
    label: "Fusión latinoamericana y mediterránea",
    description: "Claim central verificado en home, menu y nosotros.",
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
