import type { MenuCategory, MenuItem } from "@/types/content";
import { menuContent } from "@/content";

function sortByEditorialOrder<T extends { editorialOrder: number }>(
  items: T[],
) {
  return [...items].sort(
    (left, right) => left.editorialOrder - right.editorialOrder,
  );
}

export function getPublicMenuCategories(): MenuCategory[] {
  return [...menuContent.categories]
    .filter((category) => category.publicationStatus === "PUBLIC")
    .filter((category) =>
      menuContent.items.some((item) => item.categoryId === category.id),
    )
    .sort((left, right) => left.order - right.order);
}

export function getMenuItemsForCategory(categoryId: string): MenuItem[] {
  return sortByEditorialOrder(
    menuContent.items.filter((item) => item.categoryId === categoryId),
  );
}

export function getPublicMenuItemsForCategory(categoryId: string): MenuItem[] {
  return getMenuItemsForCategory(categoryId).filter(
    (item) => item.publicationStatus !== "UNAVAILABLE",
  );
}

export function getMenuFeaturedItem(items: readonly MenuItem[]) {
  return (
    items.find(
      (item) => item.media?.assetId && item.publicationStatus === "PUBLIC",
    ) ??
    items.find((item) => item.media?.assetId) ??
    items[0] ??
    null
  );
}

export function getRemainingMenuItems(
  items: readonly MenuItem[],
  featuredItem: MenuItem | null,
) {
  return featuredItem
    ? items.filter((item) => item.id !== featuredItem.id)
    : [...items];
}

export function buildMenuCategoryId(categorySlug: string) {
  return `menu-category-${categorySlug}`;
}

export function buildMenuItemId(itemId: string) {
  return `menu-item-${itemId}`;
}

export function normalizeMenuSearchTerm(value: string) {
  return value
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .trim();
}

export function matchesMenuSearch(item: MenuItem, rawTerm: string) {
  const term = normalizeMenuSearchTerm(rawTerm);
  if (!term) {
    return true;
  }

  const haystack = normalizeMenuSearchTerm(
    [item.name, item.description ?? "", item.sourceName].join(" "),
  );

  return haystack.includes(term);
}

export function filterMenuItemsBySearch(
  items: readonly MenuItem[],
  rawTerm: string,
) {
  return items.filter((item) => matchesMenuSearch(item, rawTerm));
}

export function getMenuSearchResultCount(
  categories: readonly MenuCategory[],
  rawTerm: string,
) {
  return categories.reduce((total, category) => {
    const items = filterMenuItemsBySearch(
      getPublicMenuItemsForCategory(category.id),
      rawTerm,
    );
    return total + items.length;
  }, 0);
}

export function findMenuItemBySlug(slug: string | null) {
  if (!slug) {
    return null;
  }

  return menuContent.items.find((item) => item.slug === slug) ?? null;
}

export function findMenuCategoryBySlug(slug: string | null) {
  if (!slug) {
    return null;
  }

  return (
    menuContent.categories.find((category) => category.slug === slug) ?? null
  );
}
