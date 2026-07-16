import type { AssetManifestEntry, AssetVariant } from "@/types/assets";

interface ResponsiveImageProps {
  readonly asset: AssetManifestEntry;
  readonly crop?: AssetVariant["crop"];
  readonly sizes: string;
  readonly alt?: string;
  readonly decorative?: boolean;
  readonly className?: string;
  readonly eager?: boolean;
  readonly aspectRatio?: string;
}

function getVariants(asset: AssetManifestEntry, crop: AssetVariant["crop"]) {
  return asset.variants.filter((variant) => variant.crop === crop);
}

function buildSrcSet(variants: readonly AssetVariant[]) {
  return variants
    .map((variant) => `${variant.path} ${variant.width}w`)
    .join(", ");
}

export function ResponsiveImage({
  asset,
  crop = "original",
  sizes,
  alt,
  decorative = false,
  className,
  eager = false,
  aspectRatio,
}: ResponsiveImageProps) {
  const variants = getVariants(asset, crop);
  const avif = variants.filter((variant) => variant.format === "avif");
  const webp = variants.filter((variant) => variant.format === "webp");
  const resolvedAlt = alt ?? asset.provisionalAltText ?? asset.currentAltText;
  const fallback =
    variants.find((variant) => variant.format === "png") ??
    webp.at(-1) ??
    avif.at(-1);

  if (!fallback) {
    return null;
  }

  return (
    <picture
      className={className}
      style={
        aspectRatio
          ? {
              aspectRatio,
            }
          : undefined
      }
    >
      {avif.length > 0 ? (
        <source srcSet={buildSrcSet(avif)} sizes={sizes} type="image/avif" />
      ) : null}
      {webp.length > 0 ? (
        <source srcSet={buildSrcSet(webp)} sizes={sizes} type="image/webp" />
      ) : null}
      <img
        src={fallback.path}
        srcSet={buildSrcSet([fallback])}
        sizes={sizes}
        width={fallback.width}
        height={fallback.height}
        alt={decorative ? "" : resolvedAlt}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        aria-hidden={decorative || undefined}
        style={{ objectPosition: asset.recommendedObjectPosition }}
      />
    </picture>
  );
}
