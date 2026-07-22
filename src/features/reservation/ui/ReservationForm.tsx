import { useEffect, useRef } from "react";
import { Checkbox } from "@/components/forms/Checkbox";
import { OpeningHours } from "@/components/business/OpeningHours";
import { DateInput } from "@/components/forms/DateInput";
import { FormField } from "@/components/forms/FormField";
import { FormSection } from "@/components/forms/FormSection";
import { Select } from "@/components/forms/Select";
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
          body="Completa los datos y continúa por WhatsApp o correo. El equipo revisará la disponibilidad y te confirmará personalmente la reserva."
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
            <strong>Horario y disponibilidad:</strong> la solicitud siempre
            queda sujeta a confirmacion manual del equipo. Si necesitas una mesa
            muy concreta, te recomendamos anadirlo en el mensaje o usar
            WhatsApp.
            <OpeningHours />
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
          <div className="reservation-form__grid">
            <FormField
              description="Indica una preferencia; no garantiza asignacion."
              error={errorMap.get("zone")}
              htmlFor="booking-zone"
              label="Zona preferida"
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
              description="Cumpleanos, aniversario u otra ocasion."
              error={errorMap.get("occasion")}
              htmlFor="booking-occasion"
              label="Ocasion"
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
            description="Solo se añadirá al mensaje si marcas el consentimiento específico que aparece a continuación."
            error={errorMap.get("allergies")}
            htmlFor="booking-allergies"
            label="Alergias o intolerancias"
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
            description="Añade solo comentarios necesarios y no sensibles, como acceso, carrito u otra preferencia."
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
              Tambien puedes solicitar por telefono o WhatsApp
            </TextLink>
          </div>
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
        <ul className="booking-hero__list">
          {bookingChannels.map((channel) => (
            <li key={channel.id}>
              {channel.label}: disponible para solicitar mesa
            </li>
          ))}
        </ul>
      </form>
    </section>
  );
}
