import type { AssetManifestEntry, AssetVariant } from "@/types/assets";

export type AssetUsageContext = "public" | "internal";
export type AssetPublicEntry = AssetManifestEntry & { readonly state: "ACCEPTED" };
export type AssetCrop = AssetVariant["crop"];
