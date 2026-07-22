import type { ServerReservationRequest } from "./reservationSchema";
import type { ReservationRecord } from "./reservationTypes";

export interface ReservationRepository {
  create(request: ServerReservationRequest): Promise<ReservationWriteResult>;
}

export interface ReservationWriteResult {
  readonly record: ReservationRecord;
  readonly created: boolean;
}

export class LocalDevelopmentReservationRepository implements ReservationRepository {
  private readonly records = new Map<string, ReservationRecord>();

  create(request: ServerReservationRequest) {
    const existing = this.records.get(request.metadata.idempotencyKey);
    if (existing) return Promise.resolve({ record: existing, created: false });

    const record: ReservationRecord = {
      requestId: request.metadata.requestId,
      status: "received",
      createdAt: request.metadata.submittedAt,
    };
    this.records.set(request.metadata.idempotencyKey, record);
    return Promise.resolve({ record, created: true });
  }
}
