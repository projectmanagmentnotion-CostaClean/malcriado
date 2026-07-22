import { useMemo, useRef, useState } from "react";
import { reservationProvider } from "@/services/reservations/reservationProvider";
import { trackReservationSubmission } from "@/features/reservation/analytics/reservationAnalytics";
import {
  buildReservationRequest,
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
  zone: "sin-preferencia",
  occasion: "",
  allergies: "",
  preferredChannel: "phone",
  privacyAccepted: false,
  includeAllergiesInMessage: false,
  website: "",
};

const initialSubmission: ReservationSubmission = {
  status: "idle",
  title: "Solicita tu mesa",
  message:
    "Completa los datos y continúa por WhatsApp o correo. El equipo revisará la disponibilidad y te confirmará personalmente la reserva.",
};

export function useReservationForm(context: ReservationContext) {
  const startedAtRef = useRef(Date.now());
  const attemptRef = useRef(0);
  const sessionIdRef = useRef(
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID().slice(0, 8)
      : `session-${Math.random().toString(36).slice(2, 10)}`,
  );
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

    setErrors([]);
    setSubmission({
      status: "submitting",
      title: "Preparando solicitud",
      message: "Validando los datos en este dispositivo...",
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

    const result = await reservationProvider.submit(request, context);

    setSubmission({
      status:
        result.status === "success"
          ? "success"
          : result.status === "prepared_for_contact"
            ? "prepared_for_contact"
            : result.status === "action_required"
              ? "action_required"
              : mapResultStatus(result.code),
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
