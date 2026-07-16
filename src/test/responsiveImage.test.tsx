import { render, screen } from "@testing-library/react";
import { ResponsiveImage } from "@/components/media/ResponsiveImage";
import type { AssetManifestEntry } from "@/types/assets";

const asset: AssetManifestEntry = {
  id: "asset-test",
  originalName: "test.webp",
  localPath: "public/assets/source/test.webp",
  sourceUrl: "https://example.com/test.webp",
  pageUrls: [],
  mimeType: "image/webp",
  extension: ".webp",
  sizeBytes: 1000,
  sha256: "abc",
  width: 1200,
  height: 800,
  orientation: "landscape",
  hasTransparency: false,
  containsEmbeddedText: false,
  colorSpace: "srgb",
  quality: "high",
  qualityNotes: "",
  cropSafety: "high",
  focalPoint: { x: 50, y: 40, confidence: "manual" },
  recommendedObjectPosition: "50% 40%",
  roles: ["HERO_CANDIDATE"],
  state: "ACCEPTED",
  deviceSupport: ["mobile", "desktop"],
  heroCandidate: true,
  backgroundCandidate: true,
  productionProfile: "hero",
  productionPath: "/assets/optimized/food/asset-test",
  duplicateGroup: null,
  duplicateOf: null,
  rightsStatus: "OWNED",
  currentAltText: "Asset test",
  provisionalAltText: "Asset test",
  recommendedUsage: "Uso test",
  suggestedScene: "Hero",
  variants: [
    {
      id: "asset-test-original-avif",
      path: "/asset-test-768.avif",
      format: "avif",
      width: 768,
      height: 512,
      bytes: 100,
      crop: "original",
    },
    {
      id: "asset-test-original-webp",
      path: "/asset-test-768.webp",
      format: "webp",
      width: 768,
      height: 512,
      bytes: 100,
      crop: "original",
    },
    {
      id: "asset-test-original-png",
      path: "/asset-test-768.png",
      format: "png",
      width: 768,
      height: 512,
      bytes: 100,
      crop: "original",
    },
  ],
};

describe("ResponsiveImage", () => {
  it("renders picture sources and fallback", () => {
    const { container } = render(
      <ResponsiveImage asset={asset} sizes="100vw" />,
    );

    expect(
      container.querySelector('source[type="image/avif"]'),
    ).toBeInTheDocument();
    expect(
      container.querySelector('source[type="image/webp"]'),
    ).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "Asset test" })).toHaveAttribute(
      "src",
      "/asset-test-768.png",
    );
  });

  it("supports decorative images", () => {
    const { container } = render(
      <ResponsiveImage asset={asset} sizes="100vw" decorative />,
    );

    expect(container.querySelector("img")).toHaveAttribute("alt", "");
  });

  it("supports eager loading and object position", () => {
    render(<ResponsiveImage asset={asset} sizes="100vw" eager />);

    const image = screen.getByRole("img", { name: "Asset test" });
    expect(image).toHaveAttribute("loading", "eager");
    expect(image).toHaveStyle({ objectPosition: "50% 40%" });
    expect(image).toHaveAttribute("width", "768");
  });
});
