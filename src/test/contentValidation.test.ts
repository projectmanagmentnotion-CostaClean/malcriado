import { buildContentReport, validateContentModel } from "@/content/validation";

describe("content validation", () => {
  it("keeps the content model schema-valid", () => {
    const result = validateContentModel();
    expect(result.ok).toBe(true);
    expect(
      result.issues.filter((issue) => issue.level === "error"),
    ).toHaveLength(0);
  });

  it("builds an operational report", () => {
    const report = buildContentReport();
    expect(report.sources).toBeGreaterThan(0);
    expect(report.menuItems).toBeGreaterThan(0);
    expect(report.warnings).toBeGreaterThan(0);
    expect(report.menuItemsWithImage).toBeGreaterThan(0);
    expect(report.pendingPrices).toBe(report.menuItems);
    expect(report.pendingAllergens).toBe(report.menuItems);
    expect(report.duplicateSlugs).toHaveLength(0);
    expect(report.duplicateCategorySlugs).toHaveLength(0);
    expect(report.emptyCategories).toContain("Vermut");
  });
});
