import type { ContentReference, VerificationStatus } from "./shared";

export interface LegalPageContent {
  readonly id: string;
  readonly title: string;
  readonly path: string;
  readonly summary: string;
  readonly body: string | null;
  readonly status: VerificationStatus;
  readonly references: ContentReference;
}
