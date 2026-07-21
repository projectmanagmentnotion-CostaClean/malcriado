import { useEffect, useRef } from "react";
import { Checkbox } from "@/components/forms/Checkbox";
import { DateInput } from "@/components/forms/DateInput";
import { FormField } from "@/components/forms/FormField";
import { FormSection } from "@/components/forms/FormSection";
import { TextArea } from "@/components/forms/TextArea";
import { TextInput } from "@/components/forms/TextInput";
import { TimeInput } from "@/components/forms/TimeInput";
import { LinkButton } from "@/components/ui/LinkButton";
import { TextLink } from "@/components/ui/TextLink";
import {
  bookingChannels,
  bookingPolicy,
  bookingRequestContext,
} from "@/content";
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
        <FormSection
          body="El resultado final siempre es solicitud enviada, nunca reserva confirmada. Fecha, hora y capacidad siguen sujetas a validacion manual del equipo."
          title="Datos de la solicitud"
        >
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
            <strong>Horario y disponibilidad:</strong> el frontend usa
            configuracion tipada en estado <code>PENDING_VALIDATION</code> para
            antelacion, servicios, cierres y excepciones. La solicitud siempre
            queda pendiente de confirmacion manual.
          </div>
          <div className="reservation-form__grid">
            <FormField
              description="Fecha deseada de la visita."
              error={errorMap.get("date")}
              htmlFor="booking-date"
              label="Fecha"
              required
            >
              <DateInput
                aria-describedby={describedBy("booking-date", {
                  description: true,
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
              description="Hora orientativa sujeta a confirmacion manual."
              error={errorMap.get("time")}
              htmlFor="booking-time"
              label="Hora"
              required
            >
              <TimeInput
                aria-describedby={describedBy("booking-time", {
                  description: true,
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
              <span
                className="form-field__description"
                id="booking-guests-description"
              >
                Puedes escribir el numero directamente o usar los controles.
              </span>
              <ReservationGuestField
                describedBy={describedBy("booking-guests", {
                  description: true,
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
              description="Telefono con prefijo internacional si procede."
              error={errorMap.get("phone")}
              htmlFor="booking-phone"
              label="Telefono"
              required
            >
              <TextInput
                aria-describedby={describedBy("booking-phone", {
                  description: true,
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
              description="Solo es obligatorio si prefieres recibir respuesta por correo."
              error={errorMap.get("email")}
              htmlFor="booking-email"
              label="Correo electronico"
            >
              <TextInput
                aria-describedby={describedBy("booking-email", {
                  description: true,
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
            <p
              className="form-field__description"
              id="booking-preferred-channel-description"
            >
              Se usara como preferencia, pero la confirmacion real depende del
              equipo y del proveedor final.
            </p>
            <div
              aria-describedby="booking-preferred-channel-description"
              className="reservation-channel-options"
              role="radiogroup"
            >
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
          <FormField
            description="Alergias, celebraciones, acceso, carrito o cualquier detalle relevante."
            error={errorMap.get("message")}
            htmlFor="booking-message"
            label="Mensaje"
          >
            <TextArea
              aria-describedby={describedBy("booking-message", {
                description: true,
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
          <div
            className="reservation-hint-list"
            aria-label="Politica de solicitud"
          >
            <p>{bookingPolicy.summary}</p>
            <p>
              El formulario no comunica disponibilidad en tiempo real ni escribe
              datos personales en la URL.
            </p>
          </div>
          <div className="reservation-actions">
            <LinkButton to="/contacto/" variant="ghost">
              Ver canales alternativos
            </LinkButton>
            <TextLink to="/contacto/">
              Tambien puedes confirmar por telefono o WhatsApp
            </TextLink>
          </div>
        </FormSection>
        <button
          className="ui-button ui-button--editorial"
          disabled={submission.status === "submitting"}
          type="submit"
        >
          {submission.status === "submitting"
            ? "Enviando solicitud..."
            : "Enviar solicitud"}
        </button>
        <ul className="booking-hero__list">
          {bookingChannels.map((channel) => (
            <li key={channel.id}>
              {channel.label}: {channel.href}
            </li>
          ))}
        </ul>
      </form>
    </section>
  );
}
