export type ReservationLifecycleStatus =
  "received" | "pending_review" | "confirmed" | "rejected" | "cancelled";

export interface ReservationRecord {
  readonly requestId: string;
  readonly status: ReservationLifecycleStatus;
  readonly createdAt: string;
}

export interface ReservationChannelActions {
  readonly whatsappHref: string;
  readonly emailHref: string;
}
