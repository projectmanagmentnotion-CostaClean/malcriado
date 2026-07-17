import { contentSources } from "@/content/shared/sources";
import type { StoryBlock } from "@/types/content";

export const venueStoryBlocks: readonly StoryBlock[] = [
  {
    id: "venue-seaside",
    eyebrow: "Frente al mar",
    heading: "Experiencia culinaria junto al mar en Pineda de Mar.",
    body: "La ubicacion frente al mar es un atributo visible y repetido en el sitio auditado.",
    status: "VERIFIED",
    references: {
      sourceIds: [contentSources.siteHome.id, contentSources.siteNosotros.id],
    },
  },
  {
    id: "venue-ambience",
    eyebrow: "Ambiente",
    heading: "Ambiente acogedor y sabores memorables.",
    body: "Se trata de un claim editorial, no de una caracteristica operativa cuantificable.",
    status: "VERIFIED",
    references: {
      sourceIds: [contentSources.siteNosotros.id, contentSources.contentInventory.id],
    },
  },
];
