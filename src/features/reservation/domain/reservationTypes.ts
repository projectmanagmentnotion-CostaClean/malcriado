export type ReservationPreferredChannel = "phone" | "whatsapp" | "email";

export interface ReservationContextEntity {
  readonly kind: "dish" | "category" | "offer" | "context" | "source";
  readonly slug: string;
  readonly label: string;
  readonly meta?: string;
}

export interface ReservationContext {
  readonly dish: ReservationContextEntity | null;
  readonly category: ReservationContextEntity | null;
  readonly offer: ReservationContextEntity | null;
  readonly context: ReservationContextEntity | null;
  readonly source: ReservationContextEntity | null;
  readonly summaryTitle: string | null;
  readonly summaryBody: string | null;
  readonly tags: readonly ReservationContextEntity[];
  readonly ignoredParams: readonly string[];
  readonly hasContext: boolean;
}

export interface ReservationContact {
  readonly name: string;
  readonly phone: string;
  readonly email: string;
  readonly preferredChannel: ReservationPreferredChannel;
}

export interface ReservationDateTime {
  readonly date: string;
  readonly time: string;
  readonly timezone: "Europe/Madrid";
}

export interface ReservationPreferences {
  readonly guests: number;
  readonly message: string;
}

export interface ReservationConsent {
  readonly privacyAccepted: boolean;
}

export interface ReservationRequest {
  readonly contact: ReservationContact;
  readonly dateTime: ReservationDateTime;
  readonly preferences: ReservationPreferences;
  readonly consent: ReservationConsent;
  readonly context: ReservationContext;
  readonly metadata: {
    readonly startedAt: string;
    readonly submittedAt: string;
    readonly honeypot: string;
    readonly fingerprint: string;
    readonly idempotencyKey: string;
    readonly sessionId: string;
    readonly attempt: number;
  };
}

export type ReservationResultCode =
  | "pending_confirmation"
  | "duplicate_ignored"
  | "offline"
  | "timeout"
  | "rate_limited"
  | "provider_error";

export interface ReservationResult {
  readonly status: "success" | "error";
  readonly code: ReservationResultCode;
  readonly title: string;
  readonly message: string;
  readonly retryable: boolean;
  readonly reference?: string | null;
  readonly retryAfterSeconds?: number | null;
  readonly idempotencyKey: string;
}

export interface ReservationError {
  readonly field:
    | "name"
    | "phone"
    | "email"
    | "date"
    | "time"
    | "guests"
    | "message"
    | "preferredChannel"
    | "privacyAccepted"
    | "honeypot"
    | "form";
  readonly code: string;
  readonly message: string;
}

export interface ReservationSubmission {
  readonly status:
    | "idle"
    | "submitting"
    | "success"
    | "error"
    | "offline"
    | "timeout"
    | "rate_limited";
  readonly title?: string;
  readonly message: string;
  readonly result?: ReservationResult;
  readonly errors?: readonly ReservationError[];
}

export type ReservationMockMode =
  "success" | "error" | "timeout" | "offline" | "rate_limited";

export interface ReservationFormValues {
  readonly name: string;
  readonly phone: string;
  readonly email: string;
  readonly date: string;
  readonly time: string;
  readonly guests: string;
  readonly message: string;
  readonly preferredChannel: ReservationPreferredChannel;
  readonly privacyAccepted: boolean;
  readonly website: string;
}
