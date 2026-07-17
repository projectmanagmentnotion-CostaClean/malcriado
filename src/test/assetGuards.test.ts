import { getAsset } from "@/content";

describe("asset public guards", () => {
  it("blocks rights-pending assets from public usage", () => {
    expect(() => getAsset("asset-027")).toThrow(/blocked for public use/i);
  });

  it("allows the same asset for internal review", () => {
    expect(getAsset("asset-027", "internal").id).toBe("asset-027");
  });
});
