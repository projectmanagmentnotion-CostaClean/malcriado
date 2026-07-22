import { MockReservationAdapter } from "@/features/reservation/adapters/MockReservationAdapter";
import type {
  ReservationMockMode,
  ReservationRequest,
} from "@/features/reservation/domain/reservationTypes";
import { parseReservationContext } from "@/features/reservation/context/reservationContext";

function createRequest(
  overrides: Partial<ReservationRequest> = {},
): ReservationRequest {
  return {
    contact: {
      name: "Ada Lovelace",
      phone: "+34 600 000 000",
      email: "ada@example.com",
      preferredChannel: "email",
    },
    dateTime: {
      date: "2026-07-22",
      time: "20:30",
      timezone: "Europe/Madrid",
    },
    preferences: {
      guests: 2,
      zone: "sin-preferencia",
      occasion: "",
      allergies: "",
      message: "Mesa tranquila",
    },
    consent: {
      privacyAccepted: true,
    },
    context: parseReservationContext(new URLSearchParams("context=home-hero")),
    metadata: {
      requestId: "28fb86a1-4d6d-4f70-8dd5-e66fc9120522",
      startedAt: "2026-07-21T17:00:00.000Z",
      submittedAt: "2026-07-21T17:00:05.000Z",
      honeypot: "",
      fingerprint: "fingerprint-1",
      idempotencyKey: "reservation-session-fingerprint-1",
      sessionId: "session",
      attempt: 1,
    },
    ...overrides,
  };
}

function createAdapter(mode: ReservationMockMode, online = true) {
  const provider = {
    kind: "mock" as const,
    submitReservation: vi.fn(() =>
      Promise.resolve({
        status: "pending" as const,
        message:
          "Solicitud enviada. La reserva no queda confirmada hasta respuesta del equipo.",
      }),
    ),
  };

  const adapter = new MockReservationAdapter({
    provider,
    isOnline: () => online,
    readMode: () => mode,
    sleep: () => Promise.resolve(),
  });

  return { adapter, provider };
}

describe("reservation adapter", () => {
  it.each([
    ["success", "success", "pending_confirmation"],
    ["error", "error", "provider_error"],
    ["timeout", "error", "timeout"],
    ["rate_limited", "error", "rate_limited"],
    ["offline", "error", "offline"],
  ] as const)("maps mock mode %s", async (mode, status, code) => {
    const { adapter } = createAdapter(mode);
    const result = await adapter.submit(createRequest());

    expect(result.status).toBe(status);
    expect(result.code).toBe(code);
  });

  it("treats browser offline as offline regardless of mode", async () => {
    const { adapter } = createAdapter("success", false);
    const result = await adapter.submit(createRequest());

    expect(result.code).toBe("offline");
  });

  it("deduplicates repeated idempotency keys", async () => {
    const { adapter, provider } = createAdapter("success");
    const request = createRequest();

    const first = await adapter.submit(request);
    const second = await adapter.submit(request);

    expect(provider.submitReservation).toHaveBeenCalledTimes(1);
    expect(first.code).toBe("pending_confirmation");
    expect(second.code).toBe("duplicate_ignored");
  });
});
