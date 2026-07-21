import type {
  ReservationRequest,
  ReservationResult,
} from "@/features/reservation/domain/reservationTypes";

export interface ReservationAdapter {
  submit(request: ReservationRequest): Promise<ReservationResult>;
}
