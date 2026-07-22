export type ConsentCategory =
  "necessary" | "analytics" | "marketing" | "external_media";

export interface ConsentPreferences {
  readonly necessary: true;
  readonly analytics: boolean;
  readonly marketing: boolean;
  readonly externalMedia: boolean;
}

export interface ConsentRecord {
  readonly version: string;
  readonly source: "accept_all" | "reject_all" | "customize";
  readonly updatedAt: string;
  readonly preferences: ConsentPreferences;
}

export interface ConsentCategoryDefinition {
  readonly id: ConsentCategory;
  readonly label: string;
  readonly description: string;
  readonly required: boolean;
}

export interface ThirdPartyService {
  readonly id: string;
  readonly name: string;
  readonly provider: string;
  readonly category: Exclude<ConsentCategory, "necessary">;
  readonly loadStrategy: "blocked_until_consent" | "not_configured";
  readonly implementationStatus: "ACTIVE" | "PENDING_VALIDATION";
  readonly notes: string;
}
