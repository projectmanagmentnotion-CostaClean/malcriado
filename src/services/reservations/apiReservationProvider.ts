import type {
  ReservationContext,
  ReservationRequest,
} from "@/features/reservation/domain/reservationTypes";
import { reservationRequestSchema } from "./reservationSchema";
import type {
  ReservationProvider,
  ReservationSubmissionResult,
} from "./reservationTypes";

export class ApiReservationProvider implements ReservationProvider {
  public constructor(private readonly endpoint?: string) {}

  async submit(
    request: ReservationRequest,
    context: ReservationContext,
  ): Promise<ReservationSubmissionResult> {
    if (!this.endpoint) {
      return this.error(request, "El canal de reserva no está configurado.");
    }

    const validation = reservationRequestSchema.safeParse({
      ...request,
      context,
    });
    if (!validation.success) {
      return this.error(request, "Revisa los datos antes de continuar.");
    }

    try {
      const response = await fetch(this.endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Idempotency-Key": request.metadata.idempotencyKey,
        },
        body: JSON.stringify(validation.data),
        credentials: "omit",
      });

      if (!response.ok) {
        return this.error(
          request,
          response.status === 429
            ? "Hay demasiados intentos. Espera antes de reintentar."
            : "No se ha podido registrar la solicitud.",
          response.status === 429 ? "rate_limited" : "provider_error",
        );
      }

      return {
        status: "success",
        code: "pending_confirmation",
        title: "Solicitud recibida",
        message:
          "El equipo revisará la disponibilidad y te confirmará personalmente la reserva.",
        retryable: false,
        reference: request.metadata.requestId,
        retryAfterSeconds: null,
        idempotencyKey: request.metadata.idempotencyKey,
      };
    } catch {
      return this.error(
        request,
        "No se ha podido conectar con el canal de reserva.",
      );
    }
  }

  private error(
    request: ReservationRequest,
    message: string,
    code: "provider_error" | "rate_limited" = "provider_error",
  ): ReservationSubmissionResult {
    return {
      status: "error",
      code,
      title: "Solicitud no registrada",
      message,
      retryable: true,
      reference: null,
      retryAfterSeconds: code === "rate_limited" ? 60 : null,
      idempotencyKey: request.metadata.idempotencyKey,
    };
  }
}
