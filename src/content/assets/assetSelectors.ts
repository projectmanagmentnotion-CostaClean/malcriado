import { getAsset } from "./getAsset";
import type { AssetCrop, AssetUsageContext } from "./assetTypes";

export function getAssetVariant(
  assetId: string,
  crop: AssetCrop,
  context: AssetUsageContext = "public",
) {
  const asset = getAsset(assetId, context);
  return asset.variants.filter((variant) => variant.crop === crop);
}

export function getAssetFallback(
  assetId: string,
  crop: AssetCrop,
  context: AssetUsageContext = "public",
) {
  const variants = getAssetVariant(assetId, crop, context);
  return (
    variants.find((variant) => variant.format === "png") ??
    variants.find((variant) => variant.format === "webp") ??
    variants.find((variant) => variant.format === "avif") ??
    null
  );
}
