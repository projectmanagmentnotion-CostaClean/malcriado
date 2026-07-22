import type { ContentReference, VerificationStatus } from "./shared";

export interface OpenGraphData {
  readonly title: string;
  readonly description: string;
  readonly type: "website";
  readonly imageAssetId: string | null;
}

export interface TwitterCardData {
  readonly card: "summary" | "summary_large_image";
  readonly title: string;
  readonly description: string;
  readonly imageAssetId: string | null;
}

export interface StructuredDataContext {
  readonly type:
    | "Restaurant"
    | "WebSite"
    | "WebPage"
    | "ContactPage"
    | "AboutPage"
    | "FAQPage";
  readonly includeMenu: boolean;
  readonly includeOffers: boolean;
  readonly includeFaq?: boolean;
  readonly includeBreadcrumbs?: boolean;
}

export interface SeoMetadata {
  readonly id: string;
  readonly path: string;
  readonly title: string;
  readonly description: string;
  readonly canonicalPath: string;
  readonly robots: string;
  readonly language?: string;
  readonly primaryKeyword: string;
  readonly intent: "informational" | "transactional" | "navigational";
  readonly entities: readonly string[];
  readonly openGraph: OpenGraphData;
  readonly twitter?: TwitterCardData;
  readonly structuredData: StructuredDataContext;
  readonly breadcrumbLabel?: string;
  readonly updatedAt?: string | null;
  readonly validationStatus: VerificationStatus;
  readonly references: ContentReference;
}

export interface LocalSeoPage {
  readonly pageId: string;
  readonly metadata: SeoMetadata;
}
