import type { ContentReference, VerificationStatus } from "./shared";

export type BookingAvailabilityStatus =
  "REQUEST_ONLY" | "MANUAL_CONFIRMATION" | "UNAVAILABLE";

export interface BookingChannel {
  readonly id: string;
  readonly label: string;
  readonly href: string;
  readonly method: "form" | "whatsapp" | "phone" | "email";
  readonly status: VerificationStatus;
}

export interface BookingPolicy {
  readonly summary: string;
  readonly privacyStatus: VerificationStatus;
  readonly confirmationStatus: BookingAvailabilityStatus;
  readonly cancellationPolicy: string | null;
  readonly delayTolerance: string | null;
  readonly references: ContentReference;
}

export interface BookingRequestContext {
  readonly defaultPartySize: number;
  readonly supportsNotes: boolean;
  readonly privacyCopy: string;
}
