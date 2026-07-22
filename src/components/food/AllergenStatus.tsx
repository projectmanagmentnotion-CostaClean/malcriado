import type { MenuAllergen } from "@/types/content";
import { StatusMessage } from "@/components/ui/StatusMessage";

const allergenLabels: Record<MenuAllergen, string> = {
  GLUTEN: "Gluten",
  CRUSTACEANS: "Crustaceos",
  EGGS: "Huevos",
  FISH: "Pescado",
  PEANUTS: "Cacahuetes",
  SOY: "Soja",
  MILK: "Leche",
  TREE_NUTS: "Frutos de cascara",
  CELERY: "Apio",
  MUSTARD: "Mostaza",
  SESAME: "Sesamo",
  SULPHITES: "Sulfitos",
  LUPIN: "Altramuces",
  MOLLUSCS: "Moluscos",
};

interface AllergenStatusProps {
  readonly allergens: readonly MenuAllergen[];
  readonly status: string;
}

export function AllergenStatus({ allergens, status }: AllergenStatusProps) {
  if (status !== "VERIFIED") {
    return (
      <StatusMessage
        className="inline-status"
        title="Consulta alergias e intolerancias"
        tone="pending"
      >
        <p>
          Si tienes alergias o intolerancias, confirma los alergenos
          directamente con el equipo antes de pedir.
        </p>
      </StatusMessage>
    );
  }

  if (allergens.length === 0) {
    return <p className="allergen-list">Sin alergenos declarados.</p>;
  }

  return (
    <ul className="token-list" aria-label="Alergenos declarados">
      {allergens.map((allergen) => (
        <li key={allergen}>{allergenLabels[allergen]}</li>
      ))}
    </ul>
  );
}
