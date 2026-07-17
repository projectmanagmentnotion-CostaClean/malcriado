import type { ContentReference, VerificationStatus } from "./shared";

export interface QuoteSource {
  readonly quote: string;
  readonly attribution: string | null;
  readonly status: VerificationStatus;
  readonly references: ContentReference;
}

export interface TimelineItem {
  readonly id: string;
  readonly label: string;
  readonly description: string | null;
  readonly status: VerificationStatus;
  readonly references: ContentReference;
}

export interface StoryBlock {
  readonly id: string;
  readonly eyebrow: string | null;
  readonly heading: string;
  readonly body: string | null;
  readonly status: VerificationStatus;
  readonly references: ContentReference;
}

export interface PersonProfile {
  readonly id: string;
  readonly name: string;
  readonly role: string | null;
  readonly biography: string | null;
  readonly status: VerificationStatus;
  readonly mediaAssetId: string | null;
  readonly references: ContentReference;
}
