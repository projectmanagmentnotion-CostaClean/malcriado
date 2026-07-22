import { businessContent } from "@/content";
import type { ReservationRequest } from "@/features/reservation/domain/reservationTypes";
import type { ReservationChannelActions } from "./reservationTypes";

export function buildReservationChannelActions(
  request: ReservationRequest,
): ReservationChannelActions {
  const message = [
    "Solicitud de reserva Malcriado",
    `Referencia: ${request.metadata.requestId}`,
    "Quiero completar los datos de la solicitud por este canal.",
  ].join("\n");
  const whatsappBase =
    businessContent.contact.whatsapp.value ?? "https://wa.me/34672695670";
  const email = businessContent.contact.email.value ?? "info@malcriadobcn.com";

  return {
    whatsappHref: `${whatsappBase}?text=${encodeURIComponent(message)}`,
    emailHref: `mailto:${email}?subject=${encodeURIComponent(`Solicitud ${request.metadata.requestId}`)}&body=${encodeURIComponent(message)}`,
  };
}
