import { buildContentReport } from "../../src/content/validation";

const report = buildContentReport();

console.log("Editorial content report");
console.log(`ok: ${report.ok}`);
console.log(`sources: ${report.sources}`);
console.log(`scenes: ${report.scenes}`);
console.log(`menuCategories: ${report.menuCategories}`);
console.log(`menuItems: ${report.menuItems}`);
console.log(`menuItemsWithImage: ${report.menuItemsWithImage}`);
console.log(`menuItemsWithoutImage: ${report.menuItemsWithoutImage}`);
console.log(`verifiedPrices: ${report.verifiedPrices}`);
console.log(`pendingPrices: ${report.pendingPrices}`);
console.log(`verifiedAllergens: ${report.verifiedAllergens}`);
console.log(`pendingAllergens: ${report.pendingAllergens}`);
console.log(`emptyCategories: ${report.emptyCategories.join(", ") || "none"}`);
console.log(
  `publicEmptyCategories: ${report.publicEmptyCategories.join(", ") || "none"}`,
);
console.log(
  `hiddenCategories: ${report.hiddenCategories.join(", ") || "none"}`,
);
console.log(`ambiguousNames: ${report.ambiguousNames.join(", ") || "none"}`);
console.log(`missingDescriptions: ${report.missingDescriptions}`);
console.log(`duplicateSlugs: ${report.duplicateSlugs.join(", ") || "none"}`);
console.log(
  `duplicateCategorySlugs: ${report.duplicateCategorySlugs.join(", ") || "none"}`,
);
console.log(
  `itemsWithoutCategory: ${report.itemsWithoutCategory.join(", ") || "none"}`,
);
console.log(`upcomingOffers: ${report.upcomingOffers}`);
console.log(`expiredOffers: ${report.expiredOffers}`);
console.log(`legalPages: ${report.legalPages}`);
console.log(`activeOffers: ${report.activeOffers}`);
console.log(`errors: ${report.errors}`);
console.log(`warnings: ${report.warnings}`);
