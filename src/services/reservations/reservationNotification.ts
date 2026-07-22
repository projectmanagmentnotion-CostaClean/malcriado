import type { ReservationRequest } from "@/features/reservation/domain/reservationTypes";
import type { ReservationChannelActions } from "./reservationTypes";
import { buildReservationChannelActions as buildActions } from "./reservationFallback";

export function buildReservationChannelActions(
  request: ReservationRequest,
): ReservationChannelActions {
  return buildActions(request);
}
