import type {
  BookingChannel,
  BookingPolicy,
  BookingRequestContext,
} from "@/types/content";
import { contentSources } from "@/content/shared/sources";

export const bookingChannels: readonly BookingChannel[] = [
  {
    id: "booking-form",
    label: "Formulario",
    href: "/reservar/",
    method: "form",
    status: "VERIFIED",
  },
  {
    id: "booking-whatsapp",
    label: "WhatsApp",
    href: "https://wa.me/34672695670",
    method: "whatsapp",
    status: "VERIFIED",
  },
];

export const bookingPolicy: BookingPolicy = {
  summary: "Solicitud sujeta a confirmación del equipo.",
  privacyStatus: "PENDING_VALIDATION",
  confirmationStatus: "MANUAL_CONFIRMATION",
  cancellationPolicy: null,
  delayTolerance: null,
  references: {
    sourceIds: [
      contentSources.currentSiteAudit.id,
      contentSources.ownerChecklist.id,
    ],
  },
};

export const bookingRequestContext: BookingRequestContext = {
  defaultPartySize: 2,
  supportsNotes: true,
  privacyCopy: "He leido la informacion de privacidad.",
};
