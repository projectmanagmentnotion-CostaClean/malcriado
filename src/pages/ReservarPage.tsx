import { FormEvent, useState } from "react";
import { Checkbox } from "@/components/forms/Checkbox";
import { DateInput } from "@/components/forms/DateInput";
import { FormField } from "@/components/forms/FormField";
import { FormMessage } from "@/components/forms/FormMessage";
import { FormSection } from "@/components/forms/FormSection";
import { TextArea } from "@/components/forms/TextArea";
import { TextInput } from "@/components/forms/TextInput";
import { TimeInput } from "@/components/forms/TimeInput";
import { Container } from "@/components/layout/Container";
import { Frame } from "@/components/layout/Frame";
import { LinkButton } from "@/components/ui/LinkButton";
import { PageSeo } from "@/components/seo/PageSeo";
import {
  bookingChannels,
  bookingPolicy,
  bookingRequestContext,
  getRestaurantStructuredData,
  seoPages,
} from "@/content";
import { bookingProvider } from "@/services/booking/BookingProvider";
import type { BookingSubmissionResult } from "@/services/booking/bookingTypes";

const initialResult: BookingSubmissionResult = {
  status: "pending",
  message: "Completa el formulario para enviar una solicitud de reserva.",
};

function readFormValue(data: FormData, key: string) {
  const value = data.get(key);
  return typeof value === "string" ? value : "";
}

export function ReservarPage() {
  const [result, setResult] = useState(initialResult);
  const seoPage = seoPages.booking!;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const response = await bookingProvider.submitReservation({
      date: readFormValue(data, "date"),
      time: readFormValue(data, "time"),
      guests: Number(data.get("guests") ?? 0),
      name: readFormValue(data, "name"),
      contact: readFormValue(data, "contact"),
      notes: readFormValue(data, "notes"),
      acceptedPrivacy: data.get("privacy") === "on",
    });

    setResult(response);
  }

  return (
    <>
      <PageSeo
        description={seoPage.metadata.description}
        path={seoPage.metadata.path}
        robots={seoPage.metadata.robots}
        structuredData={getRestaurantStructuredData(seoPage)}
        title={seoPage.metadata.title}
      />
      <Container width="wide">
        <section className="split split--content-first">
          <header className="editorial-intro">
            <p className="eyebrow">Reservar</p>
            <h1>Solicitud de reserva</h1>
            <p>{bookingPolicy.summary}</p>
            <ul>
              {bookingChannels.map((channel) => (
                <li key={channel.id}>
                  {channel.label}: {channel.href}
                </li>
              ))}
            </ul>
          </header>
          <Frame>
            <form
              className="booking-form"
              onSubmit={(event) => {
                void handleSubmit(event);
              }}
            >
              <FormSection
                body="El estado final siempre es solicitud enviada, nunca reserva confirmada."
                title="Datos de la solicitud"
              >
                <FormField
                  description="Fecha deseada de la visita."
                  htmlFor="booking-date"
                  label="Fecha"
                  required
                >
                  <DateInput id="booking-date" name="date" required />
                </FormField>
                <FormField htmlFor="booking-time" label="Hora" required>
                  <TimeInput id="booking-time" name="time" required />
                </FormField>
                <FormField htmlFor="booking-guests" label="Comensales" required>
                  <TextInput
                    id="booking-guests"
                    min="1"
                    name="guests"
                    required
                    type="number"
                  />
                </FormField>
                <FormField htmlFor="booking-name" label="Nombre" required>
                  <TextInput
                    autoComplete="name"
                    id="booking-name"
                    name="name"
                    required
                    type="text"
                  />
                </FormField>
                <FormField
                  description="Telefono o email para confirmar manualmente."
                  htmlFor="booking-contact"
                  label="Contacto"
                  required
                >
                  <TextInput
                    autoComplete="email"
                    id="booking-contact"
                    name="contact"
                    required
                    type="text"
                  />
                </FormField>
                <FormField htmlFor="booking-notes" label="Notas">
                  <TextArea id="booking-notes" name="notes" rows={4} />
                </FormField>
                <Checkbox
                  label={bookingRequestContext.privacyCopy}
                  name="privacy"
                  required
                />
                <LinkButton to="/contacto/" variant="ghost">
                  Ver canales alternativos
                </LinkButton>
              </FormSection>
              <button className="ui-button ui-button--editorial" type="submit">
                Enviar solicitud
              </button>
              <FormMessage
                className="form-status"
                tone={
                  result.status === "success"
                    ? "success"
                    : result.status === "error"
                      ? "error"
                      : "pending"
                }
              >
                {result.message}
              </FormMessage>
            </form>
          </Frame>
        </section>
      </Container>
    </>
  );
}
