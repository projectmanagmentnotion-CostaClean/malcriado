import type { ContentReference, VerificationStatus } from "./shared";

export type MenuPublicationStatus =
  | "PUBLIC"
  | "PENDING_VALIDATION"
  | "PENDING_CONTENT"
  | "UNAVAILABLE";

export type MenuAvailability = "AVAILABLE" | "SEASONAL" | "UNKNOWN";

export type MenuDietaryTag =
  | "VEGETARIAN"
  | "VEGAN"
  | "GLUTEN_FREE_OPTION"
  | "NON_ALCOHOLIC"
  | "SHAREABLE"
  | "SPICY";

export type MenuAllergen =
  | "GLUTEN"
  | "CRUSTACEANS"
  | "EGGS"
  | "FISH"
  | "PEANUTS"
  | "SOY"
  | "MILK"
  | "TREE_NUTS"
  | "CELERY"
  | "MUSTARD"
  | "SESAME"
  | "SULPHITES"
  | "LUPIN"
  | "MOLLUSCS";

export interface MenuItemPrice {
  readonly amount: number | null;
  readonly currency: "EUR";
  readonly unitLabel?: string;
  readonly status: VerificationStatus;
  readonly note?: string;
}

export interface MenuItemMedia {
  readonly assetId: string | null;
  readonly assetStatus: VerificationStatus;
  readonly crop: "original" | "landscape" | "portrait" | "square" | "mobile";
  readonly alt: string | null;
}

export interface MenuCategory {
  readonly id: string;
  readonly slug: string;
  readonly label: string;
  readonly description: string | null;
  readonly order: number;
  readonly publicationStatus: MenuPublicationStatus;
  readonly sourceLabel: string;
  readonly note?: string;
  readonly sourceIds: readonly string[];
}

export interface MenuItem {
  readonly id: string;
  readonly slug: string;
  readonly sourceName: string;
  readonly name: string;
  readonly description: string | null;
  readonly categoryId: string;
  readonly subcategory: string | null;
  readonly publishedIngredients: readonly string[];
  readonly ingredientStatus: VerificationStatus;
  readonly price: MenuItemPrice;
  readonly allergens: readonly MenuAllergen[];
  readonly allergenStatus: VerificationStatus;
  readonly dietaryTags: readonly MenuDietaryTag[];
  readonly spicyLevel: number | null;
  readonly availability: MenuAvailability;
  readonly media: MenuItemMedia | null;
  readonly editorialOrder: number;
  readonly publicationStatus: MenuPublicationStatus;
  readonly references: ContentReference;
  readonly validationNotes?: string;
}

export interface Menu {
  readonly id: string;
  readonly title: string;
  readonly categories: readonly MenuCategory[];
  readonly items: readonly MenuItem[];
}
