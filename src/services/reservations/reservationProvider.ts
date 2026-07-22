import type {
  ReservationContext,
  ReservationRequest,
} from "@/features/reservation/domain/reservationTypes";
import { env } from "@/lib/env";
import { createReservationProvider } from "./reservationProviderFactory";
import type {
  ReservationProvider as ReservationProviderContract,
  ReservationSubmissionResult,
} from "./reservationTypes";

export class ReservationProvider implements ReservationProviderContract {
  private readonly provider: ReservationProviderContract;

  public constructor(
    mode = env.VITE_RESERVATION_MODE,
    apiUrl = env.VITE_RESERVATION_API_URL,
  ) {
    this.provider = createReservationProvider({
      mode,
      ...(apiUrl ? { apiUrl } : {}),
    });
  }

  submit(
    request: ReservationRequest,
    context: ReservationContext,
  ): Promise<ReservationSubmissionResult> {
    return this.provider.submit(request, context);
  }
}

export const reservationProvider = new ReservationProvider();
