import {
  businessContent,
} from "../business/business";
import { homeScenes } from "../home/scenes";
import { legalPages } from "../legal/legal";
import { menuContent } from "../menu/menu";
import { offerEditorialState, offers } from "../offers/offers";
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

  issues.push(...validateSchema("business", businessSchema.safeParse(businessContent)));
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
      validateSchema(`contentSources[${index}]`, contentSourceSchema.safeParse(source)),
    ),
  );

  menuContent.categories.forEach((category) => {
    const itemCount = menuContent.items.filter((item) => item.categoryId === category.id).length;
    if (itemCount === 0) {
      issues.push({
        level: "warning",
        area: `menu.categories.${category.slug}`,
        message: "Category has no mapped items.",
      });
    }
  });

  menuContent.items.forEach((item) => {
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

export function buildContentReport() {
  const result = validateContentModel();
  return {
    ok: result.ok,
    sources: contentSourceList.length,
    scenes: homeScenes.length,
    menuCategories: menuContent.categories.length,
    menuItems: menuContent.items.length,
    legalPages: legalPages.length,
    activeOffers: offers.length,
    errors: result.issues.filter((issue) => issue.level === "error").length,
    warnings: result.issues.filter((issue) => issue.level === "warning").length,
  };
}
