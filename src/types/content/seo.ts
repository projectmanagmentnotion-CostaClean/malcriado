import type { ContentReference, VerificationStatus } from "./shared";

export interface OpenGraphData {
  readonly title: string;
  readonly description: string;
  readonly type: "website";
  readonly imageAssetId: string | null;
}

export interface StructuredDataContext {
  readonly type: "Restaurant" | "WebPage";
  readonly includeMenu: boolean;
  readonly includeOffers: boolean;
}

export interface SeoMetadata {
  readonly id: string;
  readonly path: string;
  readonly title: string;
  readonly description: string;
  readonly canonicalPath: string;
  readonly robots: string;
  readonly primaryKeyword: string;
  readonly intent: "informational" | "transactional" | "navigational";
  readonly entities: readonly string[];
  readonly openGraph: OpenGraphData;
  readonly structuredData: StructuredDataContext;
  readonly validationStatus: VerificationStatus;
  readonly references: ContentReference;
}

export interface LocalSeoPage {
  readonly pageId: string;
  readonly metadata: SeoMetadata;
}
