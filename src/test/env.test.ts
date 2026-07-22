import { resolvePublicSiteUrl } from "@/lib/env";

describe("public site environment", () => {
  it("keeps CI builds renderable when no local env file exists", () => {
    expect(resolvePublicSiteUrl(undefined)).toBe("https://malcriadobcn.com");
    expect(resolvePublicSiteUrl("")).toBe("https://malcriadobcn.com");
  });

  it("preserves an explicit staging URL", () => {
    expect(resolvePublicSiteUrl("https://staging.malcriadobcn.com")).toBe(
      "https://staging.malcriadobcn.com",
    );
  });
});
