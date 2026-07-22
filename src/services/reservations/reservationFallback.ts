import { getEmailHref, getTelephoneHref, getWhatsappHref } from "@/content";
import type { ReservationRequest } from "@/features/reservation/domain/reservationTypes";
import type { ReservationChannelActions } from "./reservationTypes";
import { abbreviateReservationReference } from "./reservationReference";

const zoneLabels: Record<ReservationRequest["preferences"]["zone"], string> = {
  "sin-preferencia": "Sin preferencia",
  interior: "Interior",
  terraza: "Terraza",
};

export function buildReservationMessage(request: ReservationRequest) {
  const reference = abbreviateReservationReference(request.metadata.requestId);
  const lines = [
    "Solicitud de reserva · Malcriado",
    `Referencia: ${reference}`,
    `Nombre: ${request.contact.name}`,
    `Fecha: ${request.dateTime.date}`,
    `Hora: ${request.dateTime.time}`,
    `Personas: ${request.preferences.guests}`,
    `Zona: ${zoneLabels[request.preferences.zone]}`,
  ];

  if (request.preferences.occasion) {
    lines.push(`Ocasión: ${request.preferences.occasion}`);
  }
  if (request.preferences.message) {
    lines.push(`Comentarios: ${request.preferences.message}`);
  }
  if (
    request.consent.includeAllergiesInMessage &&
    request.preferences.allergies
  ) {
    lines.push(`Alergias o intolerancias: ${request.preferences.allergies}`);
  }

  lines.push(
    "La solicitud queda pendiente de confirmación por el equipo de Malcriado.",
  );

  return lines.join("\n");
}

export function buildReservationChannelActions(
  request: ReservationRequest,
): ReservationChannelActions {
  const message = buildReservationMessage(request);
  const shortReference = abbreviateReservationReference(
    request.metadata.requestId,
  );
  const whatsappHref = getWhatsappHref();
  const emailHref = getEmailHref();
  const telephoneHref = getTelephoneHref();

  if (!whatsappHref || !emailHref || !telephoneHref) {
    throw new Error("Missing verified public reservation channel.");
  }

  const emailAddress = emailHref.replace(/^mailto:/, "");
  const emailSubject = `Solicitud de reserva · ${shortReference}`;

  return {
    whatsappHref: `${whatsappHref}?text=${encodeURIComponent(message)}`,
    emailHref: `mailto:${emailAddress}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(message)}`,
    telephoneHref,
    message,
    emailSubject,
    shortReference,
  };
}

export async function copyReservationMessage(message: string) {
  if (typeof navigator === "undefined" || !navigator.clipboard) {
    return false;
  }

  try {
    await navigator.clipboard.writeText(message);
    return true;
  } catch {
    return false;
  }
}
