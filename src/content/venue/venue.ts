import { contentSources } from "@/content/shared/sources";
import type { StoryBlock } from "@/types/content";

export const venueStoryBlocks: readonly StoryBlock[] = [
  {
    id: "venue-seaside",
    eyebrow: "Frente al mar",
    heading: "Experiencia culinaria junto al mar en Pineda de Mar.",
    body: "Comer junto al mar forma parte de la experiencia y del caracter de Malcriado en Pineda de Mar.",
    status: "VERIFIED",
    references: {
      sourceIds: [contentSources.siteHome.id, contentSources.siteNosotros.id],
    },
  },
  {
    id: "venue-ambience",
    eyebrow: "Ambiente",
    heading: "Ambiente acogedor y sabores memorables.",
    body: "Una propuesta pensada para quedarse, compartir y volver a reservar.",
    status: "VERIFIED",
    references: {
      sourceIds: [
        contentSources.siteNosotros.id,
        contentSources.contentInventory.id,
      ],
    },
  },
];
