import { assetManifest } from "@/content/assets/assetManifest";
import type { AssetUsageContext } from "./assetTypes";

export function getAsset(assetId: string, context: AssetUsageContext = "public") {
  const asset = assetManifest.assets.find((entry) => entry.id === assetId);

  if (!asset) {
    throw new Error(`Unknown asset id: ${assetId}`);
  }

  if (context === "public") {
    if (asset.rightsStatus === "REQUIRES_CONFIRMATION") {
      throw new Error(`Asset ${assetId} is blocked for public use until rights are confirmed`);
    }

    if (asset.state !== "ACCEPTED") {
      throw new Error(`Asset ${assetId} is not accepted for public use`);
    }
  }

  return asset;
}
