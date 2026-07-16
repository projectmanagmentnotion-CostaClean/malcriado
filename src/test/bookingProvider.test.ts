import { bookingProvider } from "@/services/booking/BookingProvider";

describe("booking provider", () => {
  it("returns a pending confirmation message", async () => {
    const result = await bookingProvider.submitReservation({
      date: "2026-07-20",
      time: "20:00",
      guests: 2,
      name: "Ada",
      contact: "ada@example.com",
      acceptedPrivacy: true,
    });

    expect(result.status).toBe("pending");
    expect(result.message).toMatch(/no queda confirmada/i);
  });
});
