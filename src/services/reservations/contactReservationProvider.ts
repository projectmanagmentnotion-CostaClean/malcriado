import type {
  ReservationContext,
  ReservationRequest,
} from "@/features/reservation/domain/reservationTypes";
import { buildReservationChannelActions } from "./reservationFallback";
import { reservationRequestSchema } from "./reservationSchema";
import type {
  ReservationProvider,
  ReservationSubmissionResult,
} from "./reservationTypes";

export class ContactReservationProvider implements ReservationProvider {
  submit(
    request: ReservationRequest,
    context: ReservationContext,
  ): Promise<ReservationSubmissionResult> {
    const validation = reservationRequestSchema.safeParse({
      ...request,
      context,
    });

    if (!validation.success) {
      return Promise.resolve({
        status: "error",
        code: "provider_error",
        title: "No se ha podido preparar la solicitud",
        message: "Revisa los datos del formulario y vuelve a intentarlo.",
        retryable: false,
        reference: null,
        retryAfterSeconds: null,
        idempotencyKey: request.metadata.idempotencyKey,
      });
    }

    return Promise.resolve({
      status: "prepared_for_contact",
      code: "prepared_for_contact",
      title: "Solicitud preparada",
      message:
        "Tu solicitud está lista. Elige WhatsApp o correo para enviarla al equipo de Malcriado. La reserva quedará pendiente de confirmación.",
      retryable: false,
      reference: request.metadata.requestId,
      retryAfterSeconds: null,
      idempotencyKey: request.metadata.idempotencyKey,
      actions: buildReservationChannelActions({ ...request, context }),
    });
  }
}
