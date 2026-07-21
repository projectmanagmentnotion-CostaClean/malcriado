import { useEffect, useMemo, useRef, useState } from "react";
import { reservationAdapter } from "@/features/reservation/adapters/MockReservationAdapter";
import { trackReservationSubmission } from "@/features/reservation/analytics/reservationAnalytics";
import {
  buildReservationRequest,
  buildReservationFingerprint,
  sanitizeReservationFormValues,
  validateReservationFormValues,
} from "@/features/reservation/validation/reservationValidation";
import type {
  ReservationContext,
  ReservationError,
  ReservationFormValues,
  ReservationSubmission,
} from "@/features/reservation/domain/reservationTypes";

const initialValues: ReservationFormValues = {
  name: "",
  phone: "",
  email: "",
  date: "",
  time: "",
  guests: "2",
  message: "",
  preferredChannel: "phone",
  privacyAccepted: false,
  website: "",
};

const initialSubmission: ReservationSubmission = {
  status: "idle",
  title: "Solicitud de reserva",
  message: "Completa el formulario para enviar una solicitud de reserva.",
};

export function useReservationForm(context: ReservationContext) {
  const startedAtRef = useRef(Date.now());
  const attemptRef = useRef(0);
  const sessionIdRef = useRef(
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID().slice(0, 8)
      : `session-${Math.random().toString(36).slice(2, 10)}`,
  );
  const lastResolvedFingerprintRef = useRef<string | null>(null);
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<readonly ReservationError[]>([]);
  const [submission, setSubmission] =
    useState<ReservationSubmission>(initialSubmission);

  const errorMap = useMemo(() => {
    const map = new Map<string, string>();
    for (const error of errors) {
      if (!map.has(error.field)) {
        map.set(error.field, error.message);
      }
    }
    return map;
  }, [errors]);

  function setFieldValue<K extends keyof ReservationFormValues>(
    field: K,
    value: ReservationFormValues[K],
  ) {
    setValues((current) => ({ ...current, [field]: value }));

    if (submission.status !== "idle") {
      setSubmission(initialSubmission);
    }
  }

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const handleOnline = () => {
      setSubmission((current) =>
        current.status === "offline" ? initialSubmission : current,
      );
    };
    const handleOffline = () => {
      setSubmission((current) =>
        current.status === "success"
          ? current
          : {
              status: "offline",
              title: "Sin conexion",
              message:
                "No hay conexion disponible. Puedes completar el formulario y enviarlo cuando vuelva la red.",
            },
      );
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  function mapResultStatus(code: string) {
    switch (code) {
      case "offline":
        return "offline" as const;
      case "timeout":
        return "timeout" as const;
      case "rate_limited":
        return "rate_limited" as const;
      default:
        return "error" as const;
    }
  }

  async function submit() {
    if (submission.status === "submitting") {
      return {
        ok: false as const,
        prevented: "already_submitting" as const,
      };
    }

    const validation = validateReservationFormValues({
      values,
      context,
      startedAtMs: startedAtRef.current,
    });

    setValues(validation.values);

    if (validation.errors.length > 0) {
      setErrors(validation.errors);
      setSubmission({
        status: "error",
        title: "Revisa el formulario",
        message:
          "Revisa los campos marcados antes de enviar la solicitud manual.",
        errors: validation.errors,
      });
      return {
        ok: false as const,
        errors: validation.errors,
      };
    }

    const fingerprint = buildReservationFingerprint({
      values: validation.values,
      context,
    });

    if (lastResolvedFingerprintRef.current === fingerprint) {
      setSubmission({
        status: "success",
        title: "Solicitud ya enviada",
        message:
          "Ya hemos recibido esta solicitud y evitamos un segundo envio duplicado. Espera la confirmacion manual del equipo.",
        result: {
          status: "success",
          code: "duplicate_ignored",
          title: "Solicitud ya enviada",
          message:
            "Ya hemos recibido esta solicitud y evitamos un segundo envio duplicado. Espera la confirmacion manual del equipo.",
          retryable: false,
          reference: null,
          retryAfterSeconds: null,
          idempotencyKey: `duplicate-${fingerprint}`,
        },
      });
      return {
        ok: true as const,
        prevented: "duplicate_completed" as const,
      };
    }

    setErrors([]);
    setSubmission({
      status: "submitting",
      title: "Enviando solicitud",
      message: "Enviando solicitud...",
    });

    attemptRef.current += 1;
    const request = buildReservationRequest({
      values: sanitizeReservationFormValues(validation.values),
      context,
      startedAtMs: startedAtRef.current,
      sessionId: sessionIdRef.current,
      attempt: attemptRef.current,
    });
    trackReservationSubmission(request);

    const result = await reservationAdapter.submit(request);
    if (result.status === "success") {
      lastResolvedFingerprintRef.current = request.metadata.fingerprint;
    }

    setSubmission({
      status:
        result.status === "success" ? "success" : mapResultStatus(result.code),
      title: result.title,
      message: result.message,
      result,
    });

    return {
      ok: result.status !== ("error" as const),
      result,
    };
  }

  return {
    values,
    errors,
    errorMap,
    submission,
    setFieldValue,
    submit,
    clearContextUrl: "/reservar/",
  };
}
