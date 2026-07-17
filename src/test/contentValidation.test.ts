import { buildContentReport, validateContentModel } from "@/content/validation";

describe("content validation", () => {
  it("keeps the content model schema-valid", () => {
    const result = validateContentModel();
    expect(result.ok).toBe(true);
    expect(result.issues.filter((issue) => issue.level === "error")).toHaveLength(0);
  });

  it("builds an operational report", () => {
    const report = buildContentReport();
    expect(report.sources).toBeGreaterThan(0);
    expect(report.menuItems).toBeGreaterThan(0);
    expect(report.warnings).toBeGreaterThan(0);
  });
});
