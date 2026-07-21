import { menuContent } from "@/content";
import {
  findMenuItemBySlug,
  getPublicMenuCategories,
  getPublicMenuItemsForCategory,
} from "@/lib/menu/menuPresentation";

describe("menu presentation", () => {
  it("keeps public categories filtered from empty pending chapters", () => {
    expect(
      getPublicMenuCategories().map((category) => category.label),
    ).not.toContain("Vermut");
  });

  it("resolves unique public slugs for pizza and cocktail margarita", () => {
    expect(findMenuItemBySlug("pizza-margarita")?.id).toBe(
      "item-pizza-margarita",
    );
    expect(findMenuItemBySlug("margarita")?.id).toBe("item-margarita");
  });

  it("keeps public menu items addressable inside public categories", () => {
    const pizzas = menuContent.categories.find(
      (category) => category.id === "cat-pizzas",
    );
    expect(pizzas).toBeTruthy();
    expect(getPublicMenuItemsForCategory(pizzas?.id ?? "")).toHaveLength(5);
  });
});
