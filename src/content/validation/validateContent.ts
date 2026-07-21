import { businessContent } from "../business/business";
import { homeScenes } from "../home/scenes";
import { legalPages } from "../legal/legal";
import { menuContent } from "../menu/menu";
import { offerEditorialState, offers } from "../offers/offers";
import {
  getActiveOffers,
  getExpiredOffers,
  getUpcomingOffers,
} from "../offers/offerSelectors";
import { seoPages } from "../seo/pages";
import { contentSourceList } from "../shared/sources";
import {
  businessSchema,
  contentSourceSchema,
  homeSceneSchema,
  menuSchema,
  offerEditorialStateSchema,
  offerSchema,
  seoPageSchema,
} from "../schemas";

export interface ContentValidationIssue {
  readonly level: "error" | "warning";
  readonly area: string;
  readonly message: string;
}

export interface ContentValidationResult {
  readonly ok: boolean;
  readonly issues: readonly ContentValidationIssue[];
}

export interface ContentReport {
  readonly ok: boolean;
  readonly sources: number;
  readonly scenes: number;
  readonly menuCategories: number;
  readonly menuItems: number;
  readonly legalPages: number;
  readonly activeOffers: number;
  readonly upcomingOffers: number;
  readonly expiredOffers: number;
  readonly menuItemsWithImage: number;
  readonly menuItemsWithoutImage: number;
  readonly verifiedPrices: number;
  readonly pendingPrices: number;
  readonly verifiedAllergens: number;
  readonly pendingAllergens: number;
  readonly emptyCategories: readonly string[];
  readonly publicEmptyCategories: readonly string[];
  readonly hiddenCategories: readonly string[];
  readonly ambiguousNames: readonly string[];
  readonly missingDescriptions: number;
  readonly duplicateSlugs: readonly string[];
  readonly duplicateCategorySlugs: readonly string[];
  readonly itemsWithoutCategory: readonly string[];
  readonly errors: number;
  readonly warnings: number;
}

function validateSchema(
  area: string,
  parseResult:
    | ReturnType<typeof businessSchema.safeParse>
    | ReturnType<typeof menuSchema.safeParse>
    | ReturnType<typeof homeSceneSchema.safeParse>
    | ReturnType<typeof offerSchema.safeParse>
    | ReturnType<typeof offerEditorialStateSchema.safeParse>
    | ReturnType<typeof seoPageSchema.safeParse>
    | ReturnType<typeof contentSourceSchema.safeParse>,
) {
  if (parseResult.success) {
    return [];
  }

  return parseResult.error.issues.map<ContentValidationIssue>((issue) => ({
    level: "error",
    area,
    message: `${issue.path.join(".") || "root"}: ${issue.message}`,
  }));
}

export function validateContentModel(): ContentValidationResult {
  const issues: ContentValidationIssue[] = [];
  const categoryIds = new Set(
    menuContent.categories.map((category) => category.id),
  );
  const categorySlugCounts = new Map<string, number>();
  const itemSlugCounts = new Map<string, number>();

  issues.push(
    ...validateSchema("business", businessSchema.safeParse(businessContent)),
  );
  issues.push(...validateSchema("menu", menuSchema.safeParse(menuContent)));
  issues.push(
    ...homeScenes.flatMap((scene, index) =>
      validateSchema(`homeScenes[${index}]`, homeSceneSchema.safeParse(scene)),
    ),
  );
  issues.push(
    ...offers.flatMap((offer, index) =>
      validateSchema(`offers[${index}]`, offerSchema.safeParse(offer)),
    ),
  );
  issues.push(
    ...validateSchema(
      "offerEditorialState",
      offerEditorialStateSchema.safeParse(offerEditorialState),
    ),
  );
  issues.push(
    ...Object.entries(seoPages).flatMap(([key, page]) =>
      validateSchema(`seoPages.${key}`, seoPageSchema.safeParse(page)),
    ),
  );
  issues.push(
    ...contentSourceList.flatMap((source, index) =>
      validateSchema(
        `contentSources[${index}]`,
        contentSourceSchema.safeParse(source),
      ),
    ),
  );

  menuContent.categories.forEach((category) => {
    categorySlugCounts.set(
      category.slug,
      (categorySlugCounts.get(category.slug) ?? 0) + 1,
    );
    const itemCount = menuContent.items.filter(
      (item) => item.categoryId === category.id,
    ).length;
    if (itemCount === 0) {
      issues.push({
        level: "warning",
        area: `menu.categories.${category.slug}`,
        message:
          category.publicationStatus === "PUBLIC"
            ? "Public category has no mapped items."
            : "Category has no mapped items.",
      });
    }
  });

  [...categorySlugCounts.entries()]
    .filter(([, count]) => count > 1)
    .forEach(([slug]) => {
      issues.push({
        level: "error",
        area: `menu.categorySlug.${slug}`,
        message: "Duplicate menu category slug detected.",
      });
    });

  menuContent.items.forEach((item) => {
    itemSlugCounts.set(item.slug, (itemSlugCounts.get(item.slug) ?? 0) + 1);

    if (!categoryIds.has(item.categoryId)) {
      issues.push({
        level: "error",
        area: `menu.items.${item.slug}`,
        message: "Item points to a missing category.",
      });
    }
    if (item.price.amount === null) {
      issues.push({
        level: "warning",
        area: `menu.items.${item.slug}`,
        message: "Price remains pending validation.",
      });
    }
    if (item.allergenStatus !== "VERIFIED") {
      issues.push({
        level: "warning",
        area: `menu.items.${item.slug}`,
        message: "Allergen data remains pending validation.",
      });
    }
    if (!item.description) {
      issues.push({
        level: "warning",
        area: `menu.items.${item.slug}`,
        message: "Description remains pending editorial expansion.",
      });
    }
  });

  [...itemSlugCounts.entries()]
    .filter(([, count]) => count > 1)
    .forEach(([slug]) => {
      issues.push({
        level: "warning",
        area: `menu.slug.${slug}`,
        message: "Duplicate menu slug detected.",
      });
    });

  legalPages.forEach((page) => {
    if (page.status !== "VERIFIED") {
      issues.push({
        level: "warning",
        area: `legal.${page.id}`,
        message: "Legal content still requires validation.",
      });
    }
  });

  return {
    ok: issues.every((issue) => issue.level !== "error"),
    issues,
  };
}

export function buildContentReport(now = new Date()): ContentReport {
  const result = validateContentModel();
  const menuItemsWithImage = menuContent.items.filter((item) =>
    Boolean(item.media?.assetId),
  ).length;
  const verifiedPrices = menuContent.items.filter(
    (item) => item.price.status === "VERIFIED" && item.price.amount !== null,
  ).length;
  const verifiedAllergens = menuContent.items.filter(
    (item) => item.allergenStatus === "VERIFIED",
  ).length;
  const emptyCategories = menuContent.categories
    .filter(
      (category) =>
        menuContent.items.filter((item) => item.categoryId === category.id)
          .length === 0,
    )
    .map((category) => category.label);
  const publicEmptyCategories = menuContent.categories
    .filter(
      (category) =>
        category.publicationStatus === "PUBLIC" &&
        menuContent.items.filter((item) => item.categoryId === category.id)
          .length === 0,
    )
    .map((category) => category.label);
  const hiddenCategories = menuContent.categories
    .filter((category) => category.publicationStatus !== "PUBLIC")
    .map((category) => category.label);
  const duplicateSlugs = [
    ...new Set(
      menuContent.items
        .map((item) => item.slug)
        .filter(
          (slug, index, list) =>
            list.findIndex((entry) => entry === slug) !== index,
        ),
    ),
  ];
  const duplicateCategorySlugs = [
    ...new Set(
      menuContent.categories
        .map((category) => category.slug)
        .filter(
          (slug, index, list) =>
            list.findIndex((entry) => entry === slug) !== index,
        ),
    ),
  ];
  const ambiguousNames = menuContent.items
    .filter((item) =>
      [
        "tequenos-u-d",
        "infladita-de-res",
        "fajitas-mixta",
        "margarita",
        "margarita-maracuya",
        "margarita-fresa",
        "vino-tinto",
        "vino-blanco",
        "vino-rosado",
        "cava",
      ].includes(item.slug),
    )
    .map((item) => item.name);
  const itemsWithoutCategory = menuContent.items
    .filter(
      (item) =>
        !menuContent.categories.some(
          (category) => category.id === item.categoryId,
        ),
    )
    .map((item) => item.slug);

  return {
    ok: result.ok,
    sources: contentSourceList.length,
    scenes: homeScenes.length,
    menuCategories: menuContent.categories.length,
    menuItems: menuContent.items.length,
    legalPages: legalPages.length,
    activeOffers: getActiveOffers(offers, now).length,
    upcomingOffers: getUpcomingOffers(offers, now).length,
    expiredOffers: getExpiredOffers(offers, now).length,
    menuItemsWithImage,
    menuItemsWithoutImage: menuContent.items.length - menuItemsWithImage,
    verifiedPrices,
    pendingPrices: menuContent.items.length - verifiedPrices,
    verifiedAllergens,
    pendingAllergens: menuContent.items.length - verifiedAllergens,
    emptyCategories,
    publicEmptyCategories,
    hiddenCategories,
    ambiguousNames,
    missingDescriptions: menuContent.items.filter((item) => !item.description)
      .length,
    duplicateSlugs,
    duplicateCategorySlugs,
    itemsWithoutCategory,
    errors: result.issues.filter((issue) => issue.level === "error").length,
    warnings: result.issues.filter((issue) => issue.level === "warning").length,
  };
}
