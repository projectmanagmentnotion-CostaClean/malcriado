export function abbreviateReservationReference(reference: string) {
  return reference.split("-")[0]?.toUpperCase() ?? reference.toUpperCase();
}
