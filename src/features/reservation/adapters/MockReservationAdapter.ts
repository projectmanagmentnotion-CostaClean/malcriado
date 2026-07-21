import type { ReservationAdapter } from "@/features/reservation/adapters/ReservationAdapter";
import type {
  ReservationMockMode,
  ReservationRequest,
  ReservationResult,
} from "@/features/reservation/domain/reservationTypes";
import type {
  BookingProvider,
  BookingSubmissionResult,
} from "@/services/booking/bookingTypes";
import { bookingProvider } from "@/services/booking/BookingProvider";

const mockModeStorageKey = "malcriado:reservation:mock-mode";

declare global {
  interface Window {
    __MALCRIADO_MOCK_RESERVATION_MODE__?: ReservationMockMode;
  }
}

interface MockReservationAdapterRuntime {
  readonly provider: BookingProvider;
  isOnline(): boolean;
  readMode(): ReservationMockMode;
  sleep(ms: number): Promise<void>;
}

function delay(ms: number) {
  return new Promise<void>((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

function mapProviderPendingResult(
  providerResult: BookingSubmissionResult,
  request: ReservationRequest,
): ReservationResult {
  if (providerResult.status === "error") {
    return {
      status: "error",
      code: "provider_error",
      title: "No se ha podido enviar la solicitud",
      message:
        "El canal de reserva no ha podido registrar la solicitud. Reintenta o usa telefono/WhatsApp.",
      retryable: true,
      reference: null,
      retryAfterSeconds: null,
      idempotencyKey: request.metadata.idempotencyKey,
    };
  }

  return {
    status: "success",
    code: "pending_confirmation",
    title: "Solicitud enviada",
    message:
      "Solicitud enviada. La reserva no queda confirmada hasta respuesta del equipo.",
    retryable: false,
    reference: `mock-${request.metadata.fingerprint.slice(0, 8)}`,
    retryAfterSeconds: null,
    idempotencyKey: request.metadata.idempotencyKey,
  };
}

function createDefaultRuntime(): MockReservationAdapterRuntime {
  return {
    provider: bookingProvider,
    isOnline() {
      if (typeof navigator === "undefined") {
        return true;
      }

      return navigator.onLine;
    },
    readMode() {
      if (typeof window === "undefined") {
        return "success";
      }

      const windowMode = window.__MALCRIADO_MOCK_RESERVATION_MODE__;
      if (windowMode) {
        return windowMode;
      }

      const storageMode = window.sessionStorage.getItem(mockModeStorageKey);
      if (
        storageMode === "success" ||
        storageMode === "error" ||
        storageMode === "timeout" ||
        storageMode === "offline" ||
        storageMode === "rate_limited"
      ) {
        return storageMode;
      }

      return "success";
    },
    sleep: delay,
  };
}

export class MockReservationAdapter implements ReservationAdapter {
  private readonly inFlight = new Map<string, Promise<ReservationResult>>();
  private readonly completed = new Map<string, ReservationResult>();

  public constructor(
    private readonly runtime: MockReservationAdapterRuntime = createDefaultRuntime(),
  ) {}

  public async submit(request: ReservationRequest): Promise<ReservationResult> {
    const { idempotencyKey } = request.metadata;
    const cachedResult = this.completed.get(idempotencyKey);

    if (cachedResult) {
      return {
        status: "success",
        code: "duplicate_ignored",
        title: "Solicitud ya enviada",
        message:
          "Ya hemos recibido esta solicitud. Evitamos un segundo envio duplicado mientras llega la confirmacion manual.",
        retryable: false,
        reference: cachedResult.reference ?? null,
        retryAfterSeconds: null,
        idempotencyKey,
      };
    }

    const inFlightRequest = this.inFlight.get(idempotencyKey);
    if (inFlightRequest) {
      return inFlightRequest;
    }

    const submission = this.executeSubmission(request);
    this.inFlight.set(idempotencyKey, submission);

    try {
      const result = await submission;
      if (result.status === "success") {
        this.completed.set(idempotencyKey, result);
      }
      return result;
    } finally {
      this.inFlight.delete(idempotencyKey);
    }
  }

  private async executeSubmission(
    request: ReservationRequest,
  ): Promise<ReservationResult> {
    const { idempotencyKey } = request.metadata;
    const mode = this.runtime.readMode();

    if (!this.runtime.isOnline() || mode === "offline") {
      return {
        status: "error",
        code: "offline",
        title: "Sin conexion",
        message:
          "No hay conexion disponible para enviar la solicitud. Recupera red o usa telefono/WhatsApp.",
        retryable: true,
        reference: null,
        retryAfterSeconds: null,
        idempotencyKey,
      };
    }

    if (mode === "timeout") {
      await this.runtime.sleep(1600);
      return {
        status: "error",
        code: "timeout",
        title: "La solicitud ha tardado demasiado",
        message:
          "El canal de reserva no ha respondido a tiempo. Reintenta el envio o usa un canal alternativo.",
        retryable: true,
        reference: null,
        retryAfterSeconds: null,
        idempotencyKey,
      };
    }

    if (mode === "rate_limited") {
      await this.runtime.sleep(250);
      return {
        status: "error",
        code: "rate_limited",
        title: "Demasiados intentos",
        message:
          "Se ha alcanzado el limite temporal de intentos. Espera un minuto o usa telefono/WhatsApp.",
        retryable: true,
        reference: null,
        retryAfterSeconds: 60,
        idempotencyKey,
      };
    }

    if (mode === "error") {
      await this.runtime.sleep(250);
      return {
        status: "error",
        code: "provider_error",
        title: "No se ha podido enviar la solicitud",
        message:
          "El canal de reserva no ha podido registrar la solicitud. Reintenta o usa telefono/WhatsApp.",
        retryable: true,
        reference: null,
        retryAfterSeconds: null,
        idempotencyKey,
      };
    }

    const contact =
      request.contact.preferredChannel === "email" && request.contact.email
        ? request.contact.email
        : request.contact.phone;

    const providerResult = await this.runtime.provider.submitReservation({
      date: request.dateTime.date,
      time: request.dateTime.time,
      guests: request.preferences.guests,
      name: request.contact.name,
      contact,
      notes: request.preferences.message,
      acceptedPrivacy: request.consent.privacyAccepted,
    });

    return mapProviderPendingResult(providerResult, request);
  }
}

export const reservationAdapter = new MockReservationAdapter();

export function setReservationMockMode(mode: ReservationMockMode | null) {
  if (typeof window === "undefined") {
    return;
  }

  if (mode === null) {
    window.sessionStorage.removeItem(mockModeStorageKey);
    delete window.__MALCRIADO_MOCK_RESERVATION_MODE__;
    return;
  }

  window.sessionStorage.setItem(mockModeStorageKey, mode);
}
