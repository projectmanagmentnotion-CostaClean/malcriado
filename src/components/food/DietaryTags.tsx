import type { MenuDietaryTag } from "@/types/content";

const tagLabels: Record<MenuDietaryTag, string> = {
  VEGETARIAN: "Vegetariano",
  VEGAN: "Vegano",
  GLUTEN_FREE_OPTION: "Opcion sin gluten",
  NON_ALCOHOLIC: "Sin alcohol",
  SHAREABLE: "Para compartir",
  SPICY: "Picante",
};

interface DietaryTagsProps {
  readonly tags: readonly MenuDietaryTag[];
}

export function DietaryTags({ tags }: DietaryTagsProps) {
  if (tags.length === 0) {
    return null;
  }

  return (
    <ul
      className="token-list token-list--warm"
      aria-label="Etiquetas dieteticas"
    >
      {tags.map((tag) => (
        <li key={tag}>{tagLabels[tag]}</li>
      ))}
    </ul>
  );
}
