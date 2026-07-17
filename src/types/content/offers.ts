import type { ContentReference, VerificationStatus } from "./shared";

export type OfferStatus =
  "SCHEDULED" | "ACTIVE" | "EXPIRED" | "DISABLED" | "PENDING_CONTENT";

export type OfferAudience = "ALL" | "DINNER" | "GROUPS" | "DRINKS";

export interface OfferValidity {
  readonly startsAt: string | null;
  readonly endsAt: string | null;
  readonly timezone: "Europe/Madrid";
}

export interface OfferSchedule {
  readonly weekdays:
    | readonly (
        | "monday"
        | "tuesday"
        | "wednesday"
        | "thursday"
        | "friday"
        | "saturday"
        | "sunday"
      )[]
    | null;
  readonly startTime: string | null;
  readonly endTime: string | null;
}

export interface OfferBookingContext {
  readonly route: string;
  readonly label: string;
  readonly note?: string;
}

export interface Offer {
  readonly id: string;
  readonly slug: string;
  readonly title: string;
  readonly description: string | null;
  readonly label: string | null;
  readonly type:
    "daily" | "weekly" | "seasonal" | "event" | "promotion" | "scheduled";
  readonly validity: OfferValidity;
  readonly schedule: OfferSchedule;
  readonly assetId: string | null;
  readonly cta: OfferBookingContext | null;
  readonly priority: number;
  readonly editorialStatus: VerificationStatus;
  readonly computedStatus: OfferStatus;
  readonly audience: OfferAudience;
  readonly fallbackContent: string | null;
  readonly references: ContentReference;
}
