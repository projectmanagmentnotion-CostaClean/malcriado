import type {
  ReservationContext,
  ReservationRequest,
} from "@/features/reservation/domain/reservationTypes";
import { ApiReservationProvider } from "./apiReservationProvider";
import { ContactReservationProvider } from "./contactReservationProvider";
import type {
  ReservationMode,
  ReservationProvider,
  ReservationSubmissionResult,
} from "./reservationTypes";

class DisabledReservationProvider implements ReservationProvider {
  submit(
    request: ReservationRequest,
    context: ReservationContext,
  ): Promise<ReservationSubmissionResult> {
    void context;
    return Promise.resolve({
      status: "error",
      code: "provider_error",
      title: "Solicitudes no disponibles",
      message: "Contacta con el restaurante por teléfono.",
      retryable: false,
      reference: null,
      retryAfterSeconds: null,
      idempotencyKey: request.metadata.idempotencyKey,
    });
  }
}

export function createReservationProvider(options: {
  readonly mode: ReservationMode;
  readonly apiUrl?: string;
}): ReservationProvider {
  switch (options.mode) {
    case "contact":
      return new ContactReservationProvider();
    case "api":
      return new ApiReservationProvider(options.apiUrl);
    case "disabled":
      return new DisabledReservationProvider();
  }
}
