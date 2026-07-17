import type { VerificationStatus } from "./shared";

export interface NavigationLink {
  readonly id: string;
  readonly label: string;
  readonly path: string;
  readonly priority: number;
  readonly context:
    "primary" | "mobile" | "footer" | "legal" | "social" | "legacy";
  readonly behavior: "internal" | "external";
  readonly accessibleName?: string;
  readonly status: VerificationStatus;
}

export interface LegacyRedirect {
  readonly id: string;
  readonly from: string;
  readonly to: string;
  readonly statusCode: 301 | 302;
}
