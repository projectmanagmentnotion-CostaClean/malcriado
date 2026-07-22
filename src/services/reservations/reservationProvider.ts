import type { ReservationAdapter } from "@/features/reservation/adapters/ReservationAdapter";
import type {
  ReservationRequest,
  ReservationResult,
} from "@/features/reservation/domain/reservationTypes";
import { env } from "@/lib/env";
import { buildReservationChannelActions } from "./reservationNotification";

const receivedCopy =
  "Solicitud recibida. El equipo de Malcriado revisará la disponibilidad y te confirmará la reserva por teléfono, WhatsApp o correo.";

export class ReservationProvider implements ReservationAdapter {
  async submit(request: ReservationRequest): Promise<ReservationResult> {
    if (!env.VITE_RESERVATION_API_URL) {
      return {
        status: "action_required",
        code: "channel_required",
        title: "Elige cómo enviar la solicitud",
        message:
          "Revisa los datos y envíalos por WhatsApp o correo. La web no marcará la solicitud como recibida hasta que completes ese paso.",
        retryable: false,
        reference: request.metadata.requestId,
        retryAfterSeconds: null,
        idempotencyKey: request.metadata.idempotencyKey,
        actions: buildReservationChannelActions(request),
      };
    }

    try {
      const response = await fetch(env.VITE_RESERVATION_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Idempotency-Key": request.metadata.idempotencyKey,
        },
        body: JSON.stringify(request),
        credentials: "same-origin",
      });

      if (response.status === 429) {
        return this.error(request, "rate_limited", "Demasiados intentos", true);
      }
      if (!response.ok) {
        return this.error(
          request,
          "provider_error",
          "No se ha podido enviar la solicitud",
          true,
        );
      }

      return {
        status: "success",
        code: "pending_confirmation",
        title: "Solicitud recibida",
        message: receivedCopy,
        retryable: false,
        reference: request.metadata.requestId,
        retryAfterSeconds: null,
        idempotencyKey: request.metadata.idempotencyKey,
      };
    } catch {
      return this.error(
        request,
        "offline",
        "No se ha podido conectar con el canal de reserva",
        true,
      );
    }
  }

  private error(
    request: ReservationRequest,
    code: "offline" | "rate_limited" | "provider_error",
    title: string,
    retryable: boolean,
  ): ReservationResult {
    return {
      status: "error",
      code,
      title,
      message:
        "No hemos registrado la solicitud. Reintenta o utiliza WhatsApp o correo.",
      retryable,
      reference: null,
      retryAfterSeconds: code === "rate_limited" ? 60 : null,
      idempotencyKey: request.metadata.idempotencyKey,
    };
  }
}

export const reservationProvider = new ReservationProvider();
