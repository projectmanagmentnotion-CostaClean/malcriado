export const PENDING_CONTENT = "PENDING_CONTENT" as const;

export type PendingContent = typeof PENDING_CONTENT;

// eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
export type ContentValue = string | PendingContent;

export interface BusinessIdentity {
  readonly name: string;
  readonly address: string;
  readonly phone: string;
  readonly email: string;
  readonly instagramUrl: string;
  readonly whatsappReservationUrl: string;
  readonly openingHours: ContentValue | null;
}

export interface MenuCategory {
  readonly slug: string;
  readonly label: string;
  readonly description: ContentValue;
}

export interface OfferStatus {
  readonly type: "active" | "pending";
  readonly message: ContentValue;
}
