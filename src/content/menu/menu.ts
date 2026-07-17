import type { Menu } from "../../types/content";
import { menuCategories } from "./categories";
import { menuItems } from "./items";

export const menuContent: Menu = {
  id: "menu-malcriado",
  title: "Carta Malcriado",
  categories: menuCategories,
  items: menuItems,
};

export function getMenuItemsByCategory(categoryId: string) {
  return menuItems.filter((item) => item.categoryId === categoryId);
}

export function getFeaturedMenuItems() {
  return menuItems.filter((item) =>
    [
      "item-pulpo-chimichurri",
      "item-nachos-malcriados",
      "item-pizza-malcriada",
      "item-tarta-atun",
    ].includes(item.id),
  );
}
