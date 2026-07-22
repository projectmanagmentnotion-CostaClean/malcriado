import type { ContentReference, VerificationStatus } from "./shared";

export interface LegalPageSection {
  readonly id: string;
  readonly title: string;
  readonly paragraphs: readonly string[];
  readonly items?: readonly string[];
}

export interface LegalPageContent {
  readonly id: string;
  readonly title: string;
  readonly path: string;
  readonly summary: string;
  readonly body: string | null;
  readonly intro?: string | null;
  readonly sections?: readonly LegalPageSection[];
  readonly disclaimer?: string | null;
  readonly status: VerificationStatus;
  readonly references: ContentReference;
}
