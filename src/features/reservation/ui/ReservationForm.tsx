import { useEffect, useRef } from "react";
import { Checkbox } from "@/components/forms/Checkbox";
import { DateInput } from "@/components/forms/DateInput";
import { FormField } from "@/components/forms/FormField";
import { FormSection } from "@/components/forms/FormSection";
import { Select } from "@/components/forms/Select";
import { TextArea } from "@/components/forms/TextArea";
import { TextInput } from "@/components/forms/TextInput";
import { TimeInput } from "@/components/forms/TimeInput";
import { TextLink } from "@/components/ui/TextLink";
import { bookingRequestContext } from "@/content";
import { reservationConfig } from "@/features/reservation/config/reservationConfig";
import type { ReservationContext } from "@/features/reservation/domain/reservationTypes";
import { useReservationForm } from "@/features/reservation/state/useReservationForm";
import { ReservationContextPanel } from "@/features/reservation/ui/ReservationContextPanel";
import { ReservationErrorSummary } from "@/features/reservation/ui/ReservationErrorSummary";
import { ReservationGuestField } from "@/features/reservation/ui/ReservationGuestField";
import { ReservationStatusPanel } from "@/features/reservation/ui/ReservationStatusPanel";

interface ReservationFormProps {
  readonly context: ReservationContext;
}

function describedBy(
  id: string,
  options: { readonly description?: boolean; readonly error?: boolean },
) {
  return [
    options.description ? `${id}-description` : null,
    options.error ? `${id}-error` : null,
  ]
    .filter(Boolean)
    .join(" ");
}

export function ReservationForm({ context }: ReservationFormProps) {
  const {
    values,
    errors,
    errorMap,
    submission,
    setFieldValue,
    submit,
    clearContextUrl,
  } = useReservationForm(context);
  const fieldRefs = useRef<
    Partial<Record<string, HTMLInputElement | HTMLTextAreaElement>>
  >({});

  useEffect(() => {
    if (errors.length === 0) {
      return;
    }

    const firstField = errors.find((error) => error.field !== "form")?.field;
    if (!firstField) {
      return;
    }

    fieldRefs.current[firstField]?.focus();
  }, [errors]);

  return (
    <section className="booking-form-shell">
      <form
        className="booking-form"
        noValidate
        onSubmit={(event) => {
          event.preventDefault();
          void submit();
        }}
      >
        <FormSection title="Datos de la solicitud">
          <ReservationStatusPanel
            onRetry={() => {
              void submit();
            }}
            submission={submission}
          />
          <ReservationErrorSummary errors={errors} />
          <ReservationContextPanel
            clearHref={clearContextUrl}
            context={context}
          />
          <div className="reservation-inline-note">
            <strong>Reserva sujeta a confirmación.</strong>
          </div>
          <div className="reservation-form__grid">
            <FormField
              error={errorMap.get("date")}
              htmlFor="booking-date"
              label="Fecha"
              required
            >
              <DateInput
                aria-describedby={describedBy("booking-date", {
                  error: errorMap.has("date"),
                })}
                aria-invalid={errorMap.has("date")}
                id="booking-date"
                min={reservationConfig.minDateIso}
                name="date"
                onChange={(event) => setFieldValue("date", event.target.value)}
                ref={(element) => {
                  fieldRefs.current.date = element ?? undefined;
                }}
                required
                value={values.date}
              />
            </FormField>
            <FormField
              error={errorMap.get("time")}
              htmlFor="booking-time"
              label="Hora"
              required
            >
              <TimeInput
                aria-describedby={describedBy("booking-time", {
                  error: errorMap.has("time"),
                })}
                aria-invalid={errorMap.has("time")}
                id="booking-time"
                name="time"
                onChange={(event) => setFieldValue("time", event.target.value)}
                ref={(element) => {
                  fieldRefs.current.time = element ?? undefined;
                }}
                required
                value={values.time}
              />
            </FormField>
            <div className="form-field">
              <span className="form-field__label" id="booking-guests-label">
                Comensales <span aria-hidden="true">*</span>
              </span>
              <ReservationGuestField
                describedBy={describedBy("booking-guests", {
                  error: errorMap.has("guests"),
                })}
                id="booking-guests"
                invalid={errorMap.has("guests")}
                labelledBy="booking-guests-label"
                name="guests"
                onChange={(value) => setFieldValue("guests", value)}
                value={values.guests}
              />
              {errorMap.has("guests") ? (
                <span className="field-error" id="booking-guests-error">
                  {errorMap.get("guests")}
                </span>
              ) : null}
            </div>
            <FormField
              error={errorMap.get("name")}
              htmlFor="booking-name"
              label="Nombre"
              required
            >
              <TextInput
                aria-describedby={describedBy("booking-name", {
                  error: errorMap.has("name"),
                })}
                aria-invalid={errorMap.has("name")}
                autoComplete="name"
                id="booking-name"
                name="name"
                onChange={(event) => setFieldValue("name", event.target.value)}
                ref={(element) => {
                  fieldRefs.current.name = element ?? undefined;
                }}
                required
                type="text"
                value={values.name}
              />
            </FormField>
            <FormField
              error={errorMap.get("phone")}
              htmlFor="booking-phone"
              label="Telefono"
              required
            >
              <TextInput
                aria-describedby={describedBy("booking-phone", {
                  error: errorMap.has("phone"),
                })}
                aria-invalid={errorMap.has("phone")}
                autoComplete="tel"
                id="booking-phone"
                inputMode="tel"
                name="phone"
                onChange={(event) => setFieldValue("phone", event.target.value)}
                ref={(element) => {
                  fieldRefs.current.phone = element ?? undefined;
                }}
                required
                type="tel"
                value={values.phone}
              />
            </FormField>
            <FormField
              error={errorMap.get("email")}
              htmlFor="booking-email"
              label="Correo electronico (opcional)"
            >
              <TextInput
                aria-describedby={describedBy("booking-email", {
                  error: errorMap.has("email"),
                })}
                aria-invalid={errorMap.has("email")}
                autoComplete="email"
                id="booking-email"
                name="email"
                onChange={(event) => setFieldValue("email", event.target.value)}
                ref={(element) => {
                  fieldRefs.current.email = element ?? undefined;
                }}
                type="email"
                value={values.email}
              />
            </FormField>
          </div>
          <fieldset className="reservation-channel-fieldset">
            <legend className="form-field__label">
              Canal preferido de respuesta
            </legend>
            <div className="reservation-channel-options" role="radiogroup">
              {[
                { value: "phone", label: "Llamada" },
                { value: "whatsapp", label: "WhatsApp" },
                { value: "email", label: "Correo" },
              ].map((option) => (
                <label
                  className="reservation-channel-option"
                  key={option.value}
                >
                  <input
                    checked={values.preferredChannel === option.value}
                    name="preferredChannel"
                    onChange={() =>
                      setFieldValue(
                        "preferredChannel",
                        option.value as "phone" | "whatsapp" | "email",
                      )
                    }
                    type="radio"
                    value={option.value}
                  />
                  <span>{option.label}</span>
                </label>
              ))}
            </div>
          </fieldset>
          <div className="reservation-form__grid">
            <FormField
              error={errorMap.get("zone")}
              htmlFor="booking-zone"
              label="Zona preferida (opcional)"
            >
              <Select
                id="booking-zone"
                name="zone"
                onChange={(event) =>
                  setFieldValue(
                    "zone",
                    event.target.value as typeof values.zone,
                  )
                }
                value={values.zone}
              >
                <option value="sin-preferencia">Sin preferencia</option>
                <option value="interior">Interior</option>
                <option value="terraza">Terraza</option>
              </Select>
            </FormField>
            <FormField
              error={errorMap.get("occasion")}
              htmlFor="booking-occasion"
              label="Ocasion (opcional)"
            >
              <TextInput
                aria-invalid={errorMap.has("occasion")}
                id="booking-occasion"
                name="occasion"
                onChange={(event) =>
                  setFieldValue("occasion", event.target.value)
                }
                ref={(element) => {
                  fieldRefs.current.occasion = element ?? undefined;
                }}
                value={values.occasion}
              />
            </FormField>
          </div>
          <FormField
            error={errorMap.get("allergies")}
            htmlFor="booking-allergies"
            label="Alergias o intolerancias (opcional)"
          >
            <TextArea
              aria-invalid={errorMap.has("allergies")}
              id="booking-allergies"
              name="allergies"
              onChange={(event) =>
                setFieldValue("allergies", event.target.value)
              }
              ref={(element) => {
                fieldRefs.current.allergies = element ?? undefined;
              }}
              rows={3}
              value={values.allergies}
            />
          </FormField>
          <Checkbox
            checked={values.includeAllergiesInMessage}
            label="Incluir en el mensaje la información sobre alergias o intolerancias que he indicado."
            name="includeAllergiesInMessage"
            onChange={(event) =>
              setFieldValue("includeAllergiesInMessage", event.target.checked)
            }
          />
          <p className="reservation-inline-note">
            ¿Tienes alguna alergia o intolerancia? Consulta con nuestro equipo
            antes de realizar tu pedido.{" "}
            <TextLink to="/menu/#informacion-alergenos">
              Ver los 14 grupos de alergenos
            </TextLink>
            .
          </p>
          <FormField
            error={errorMap.get("message")}
            htmlFor="booking-message"
            label="Mensaje (opcional)"
          >
            <TextArea
              aria-describedby={describedBy("booking-message", {
                error: errorMap.has("message"),
              })}
              aria-invalid={errorMap.has("message")}
              id="booking-message"
              name="message"
              onChange={(event) => setFieldValue("message", event.target.value)}
              ref={(element) => {
                fieldRefs.current.message = element ?? undefined;
              }}
              rows={5}
              value={values.message}
            />
          </FormField>
          <div aria-hidden="true" className="sr-only">
            <label htmlFor="booking-website">No rellenar</label>
            <input
              id="booking-website"
              name="website"
              onChange={(event) => setFieldValue("website", event.target.value)}
              tabIndex={-1}
              type="text"
              value={values.website}
            />
          </div>
          <Checkbox
            checked={values.privacyAccepted}
            label={
              <>
                {bookingRequestContext.privacyCopy}{" "}
                <TextLink to="/privacidad/">Leer privacidad</TextLink>
              </>
            }
            name="privacy"
            onChange={(event) =>
              setFieldValue("privacyAccepted", event.target.checked)
            }
            required
          />
          {errorMap.has("privacyAccepted") ? (
            <p className="field-error" id="booking-privacy-error" role="alert">
              {errorMap.get("privacyAccepted")}
            </p>
          ) : null}
        </FormSection>
        <button
          className="ui-button ui-button--editorial"
          disabled={submission.status === "submitting"}
          type="submit"
        >
          {submission.status === "submitting"
            ? "Preparando solicitud..."
            : "Preparar solicitud"}
        </button>
        <TextLink to="/contacto/">Solicitar por telefono o WhatsApp</TextLink>
      </form>
    </section>
  );
}
