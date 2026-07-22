import { reservationRequestSchema } from "./reservationSchema";
import type { ReservationRepository } from "./reservationRepository";

interface ApiDependencies {
  readonly repository: ReservationRepository;
  readonly allowedOrigin: string;
  readonly notifyRestaurant: (requestId: string) => Promise<void>;
  readonly now?: () => number;
}

const attempts = new Map<string, readonly number[]>();

function json(status: number, body: object) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
    },
  });
}

export function createReservationApiHandler(dependencies: ApiDependencies) {
  return async function handleReservation(request: Request) {
    if (request.method !== "POST")
      return json(405, { error: "method_not_allowed" });
    if (request.headers.get("Origin") !== dependencies.allowedOrigin) {
      return json(403, { error: "origin_rejected" });
    }

    const clientKey =
      request.headers.get("CF-Connecting-IP") ??
      request.headers.get("X-Forwarded-For") ??
      "unknown";
    const now = dependencies.now?.() ?? Date.now();
    const recent = (attempts.get(clientKey) ?? []).filter(
      (value) => now - value < 60_000,
    );
    if (recent.length >= 5) return json(429, { error: "rate_limited" });
    attempts.set(clientKey, [...recent, now]);

    let input: unknown;
    try {
      input = await request.json();
    } catch {
      return json(400, { error: "invalid_json" });
    }

    const parsed = reservationRequestSchema.safeParse(input);
    if (!parsed.success) return json(422, { error: "invalid_request" });

    const record = await dependencies.repository.create(parsed.data);
    try {
      await dependencies.notifyRestaurant(record.requestId);
      return json(202, { requestId: record.requestId, status: "received" });
    } catch {
      return json(202, {
        requestId: record.requestId,
        status: "received",
        notification: "pending",
      });
    }
  };
}
