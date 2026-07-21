import type { ReservationRequest } from "@/features/reservation/domain/reservationTypes";

export function buildReservationAnalyticsPayload(request: ReservationRequest) {
  return {
    preferredChannel: request.contact.preferredChannel,
    guests: request.preferences.guests,
    hasMessage: request.preferences.message.length > 0,
    contextTags: request.context.tags.map((tag) => `${tag.kind}:${tag.slug}`),
  };
}

export function trackReservationSubmission(request: ReservationRequest) {
  void request;
}
