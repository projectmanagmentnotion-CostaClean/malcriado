import type {
  BookingProvider,
  BookingRequest,
} from "@/services/booking/bookingTypes";

export class MockBookingProvider implements BookingProvider {
  public readonly kind = "mock" as const;

  public async submitReservation(payload: BookingRequest) {
    await Promise.resolve(payload);

    return {
      status: "pending" as const,
      message:
        "Solicitud enviada. La reserva no queda confirmada hasta respuesta del equipo.",
    };
  }
}
