import type {
  ContentReference,
  VerificationField,
  VerificationStatus,
} from "./shared";

export type BusinessStatus = "ACTIVE" | "SEASONAL" | "PENDING_OPENING";

export interface SocialLink {
  readonly id: string;
  readonly label: string;
  readonly platform: "instagram" | "whatsapp" | "phone" | "email" | "other";
  readonly href: VerificationField<string>;
}

export interface BusinessIdentity {
  readonly commercialName: VerificationField<string>;
  readonly seoName: VerificationField<string>;
  readonly shortDescription: VerificationField<string>;
  readonly culinaryProposition: VerificationField<string>;
  readonly currentLanguages: VerificationField<readonly string[]>;
  readonly businessStatus: VerificationField<BusinessStatus>;
}

export interface BusinessLocation {
  readonly publicAddress: VerificationField<string>;
  readonly locality: VerificationField<string>;
  readonly province: VerificationField<string>;
  readonly country: VerificationField<string>;
  readonly postalCode: VerificationField<string>;
  readonly coordinates: VerificationField<{
    readonly latitude: number;
    readonly longitude: number;
  }>;
}

export interface BusinessContact {
  readonly phone: VerificationField<string>;
  readonly email: VerificationField<string>;
  readonly whatsapp: VerificationField<string>;
  readonly canonicalUrl: VerificationField<string>;
  readonly socials: readonly SocialLink[];
}

export interface BusinessHoursDay {
  readonly day:
    | "monday"
    | "tuesday"
    | "wednesday"
    | "thursday"
    | "friday"
    | "saturday"
    | "sunday";
  readonly opensAt: string | null;
  readonly closesAt: string | null;
  readonly status: VerificationStatus;
  readonly note?: string;
}

export interface BusinessHours {
  readonly summary: VerificationField<string>;
  readonly timezone: "Europe/Madrid";
  readonly byDay: readonly BusinessHoursDay[];
}

export interface BusinessContent {
  readonly identity: BusinessIdentity;
  readonly location: BusinessLocation;
  readonly contact: BusinessContact;
  readonly hours: BusinessHours;
  readonly references: ContentReference;
}
