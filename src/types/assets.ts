export type AssetState =
  | "ACCEPTED"
  | "LOW_QUALITY"
  | "DUPLICATE"
  | "REJECTED"
  | "PENDING_RIGHTS"
  | "PENDING_SOURCE";

export type AssetRole =
  | "HERO_CANDIDATE"
  | "FEATURED_DISH"
  | "MENU_SUPPORT"
  | "COCKTAIL"
  | "VENUE"
  | "PEOPLE"
  | "BRAND"
  | "TEXTURE"
  | "DOCUMENT";

export type AssetOrientation = "landscape" | "portrait" | "square";

export interface AssetVariant {
  readonly id: string;
  readonly path: string;
  readonly format: "avif" | "webp" | "png";
  readonly width: number;
  readonly height: number;
  readonly bytes: number;
  readonly crop:
    "original" | "landscape" | "portrait" | "square" | "mobile" | "editorial";
}

export interface AssetManifestEntry {
  readonly id: string;
  readonly originalName: string;
  readonly localPath: string;
  readonly sourceUrl: string;
  readonly pageUrls: readonly string[];
  readonly mimeType: string;
  readonly extension: string;
  readonly sizeBytes: number;
  readonly sha256: string;
  readonly width: number;
  readonly height: number;
  readonly orientation: AssetOrientation;
  readonly hasTransparency: boolean;
  readonly containsEmbeddedText: boolean;
  readonly colorSpace: string | null;
  readonly quality: "high" | "medium" | "low";
  readonly qualityNotes: string;
  readonly cropSafety: "high" | "medium" | "low";
  readonly focalPoint: {
    readonly x: number;
    readonly y: number;
    readonly confidence: "manual" | "heuristic";
  };
  readonly recommendedObjectPosition: string;
  readonly roles: readonly AssetRole[];
  readonly state: AssetState;
  readonly deviceSupport: readonly ("mobile" | "desktop")[];
  readonly heroCandidate: boolean;
  readonly backgroundCandidate: boolean;
  readonly productionProfile:
    | "brand"
    | "hero"
    | "featured-dish"
    | "menu-support"
    | "cocktail"
    | "excluded";
  readonly productionPath: string | null;
  readonly duplicateGroup: string | null;
  readonly duplicateOf: string | null;
  readonly rightsStatus: string;
  readonly currentAltText: string;
  readonly provisionalAltText: string;
  readonly recommendedUsage: string;
  readonly suggestedScene: string | null;
  readonly variants: readonly AssetVariant[];
}

export interface AssetManifestDocument {
  readonly generatedAt: string;
  readonly sourceCount: number;
  readonly originalTotalBytes: number;
  readonly optimizedTotalBytes: number;
  readonly derivativesCount: number;
  readonly duplicateGroups: readonly {
    readonly id: string;
    readonly masterAssetId: string;
    readonly duplicateAssetIds: readonly string[];
    readonly criterion: string;
    readonly action: string;
    readonly productionPath: string | null;
  }[];
  readonly pendingVideos: readonly {
    readonly id: string;
    readonly url: string;
    readonly status: "PENDING_SOURCE";
    readonly probableRole: string;
    readonly notes: string;
  }[];
  readonly assets: readonly AssetManifestEntry[];
}
