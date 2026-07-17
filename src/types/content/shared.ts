export type VerificationStatus =
  | "VERIFIED"
  | "PENDING_VALIDATION"
  | "PENDING_CONTENT"
  | "UNAVAILABLE"
  | "NOT_APPLICABLE";

export interface ContentSource {
  readonly id: string;
  readonly label: string;
  readonly kind:
    "website" | "document" | "asset" | "owner" | "internal-audit" | "derived";
  readonly url: string | null;
  readonly owner: string;
  readonly notes: string;
}

export interface VerificationField<T> {
  readonly value: T | null;
  readonly status: VerificationStatus;
  readonly note?: string;
  readonly sourceIds: readonly string[];
  readonly expectedFrom?: string;
}

export interface ContentReference {
  readonly sourceIds: readonly string[];
  readonly note?: string;
}

export interface ContentWarning {
  readonly id: string;
  readonly level: "info" | "warning" | "error";
  readonly message: string;
}
