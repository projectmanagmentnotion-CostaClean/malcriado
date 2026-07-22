import type {
  ReservationContext,
  ReservationRequest,
  ReservationResult,
} from "@/features/reservation/domain/reservationTypes";

export type ReservationMode = "contact" | "api" | "disabled";

export type ReservationSubmissionResult = ReservationResult;

export interface ReservationProvider {
  submit(
    request: ReservationRequest,
    context: ReservationContext,
  ): Promise<ReservationSubmissionResult>;
}

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
  readonly telephoneHref: string;
  readonly message: string;
  readonly emailSubject: string;
  readonly shortReference: string;
}
