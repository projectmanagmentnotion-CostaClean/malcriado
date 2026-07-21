import type { ContentReference, VerificationStatus } from "./shared";

export interface FaqEntry {
  readonly id: string;
  readonly question: string;
  readonly answer: string;
  readonly category: "general" | "booking" | "menu" | "location" | "legal";
  readonly status: VerificationStatus;
  readonly references: ContentReference;
}
