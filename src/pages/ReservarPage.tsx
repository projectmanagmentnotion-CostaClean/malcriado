import { FormEvent, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Checkbox } from "@/components/forms/Checkbox";
import { DateInput } from "@/components/forms/DateInput";
import { FormField } from "@/components/forms/FormField";
import { FormMessage } from "@/components/forms/FormMessage";
import { FormSection } from "@/components/forms/FormSection";
import { TextArea } from "@/components/forms/TextArea";
import { TextInput } from "@/components/forms/TextInput";
import { TimeInput } from "@/components/forms/TimeInput";
import { Cluster } from "@/components/layout/Cluster";
import { Container } from "@/components/layout/Container";
import { EditorialImage } from "@/components/media/EditorialImage";
import { LinkButton } from "@/components/ui/LinkButton";
import { TextLink } from "@/components/ui/TextLink";
import { PageSeo } from "@/components/seo/PageSeo";
import { buildPageSeoProps } from "@/lib/seo/pageSeoProps";
import {
  bookingChannels,
  bookingPolicy,
  bookingRequestContext,
  getAsset,
  menuContent,
  offers,
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

function getBookingContextSummary(searchParams: URLSearchParams) {
  const context = searchParams.get("context");
  const itemSlug = searchParams.get("dish") ?? searchParams.get("item");
  const categorySlug = searchParams.get("category");
  const offerSlug = searchParams.get("offer");

  const item = itemSlug
    ? menuContent.items.find((entry) => entry.slug === itemSlug)
    : null;
  const category = categorySlug
    ? menuContent.categories.find(
        (entry) => entry.slug === categorySlug || entry.id === categorySlug,
      )
    : null;
  const offer = offerSlug
    ? offers.find((entry) => entry.slug === offerSlug)
    : null;

  if (offer) {
    return {
      title: "Solicitud iniciada desde un especial",
      body: `Llegas desde ${offer.title}. El equipo vera ese contexto junto con tu solicitud.`,
    };
  }

  if (item || category) {
    const parts = [item?.name, category?.label].filter(Boolean);

    return {
      title: "Solicitud iniciada desde carta",
      body: `Llegas con contexto de ${parts.join(" / ")}. Se conserva para orientar la respuesta manual.`,
    };
  }

  if (context === "contact") {
    return {
      title: "Solicitud iniciada desde contacto",
      body: "Has pasado a la reserva desde contacto y sigues teniendo WhatsApp y telefono como alternativa.",
    };
  }

  if (context) {
    return {
      title: "Solicitud iniciada desde navegacion",
      body: "La solicitud conserva el origen de entrada para QA y trazabilidad editorial.",
    };
  }

  return null;
}

export function ReservarPage() {
  const [result, setResult] = useState(initialResult);
  const [searchParams] = useSearchParams();
  const seoPage = seoPages.booking!;
  const bookingHeroAsset = getAsset("asset-019");
  const bookingContextSummary = useMemo(
    () => getBookingContextSummary(searchParams),
    [searchParams],
  );

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
      <PageSeo {...buildPageSeoProps(seoPage)} />
      <Container width="wide">
        <section className="split split--content-first">
          <header className="booking-hero">
            <div className="booking-hero__media">
              <EditorialImage
                alt="Escena editorial de Malcriado para introducir la reserva."
                asset={bookingHeroAsset}
                crop="landscape"
                eager
                ratio="cinema"
                sizes="(max-width: 900px) 100vw, 48vw"
              />
              <div className="booking-hero__overlay">
                <p className="eyebrow">Reserva</p>
                <h1 data-route-heading="true" id="page-heading-reservar">
                  Solicitud de reserva
                </h1>
                <p>{bookingPolicy.summary}</p>
              </div>
            </div>
            <div className="booking-hero__copy">
              {bookingContextSummary ? (
                <div className="booking-context">
                  <p className="eyebrow">{bookingContextSummary.title}</p>
                  <p>{bookingContextSummary.body}</p>
                </div>
              ) : null}
              <p>
                La disponibilidad sigue siendo manual hasta la confirmacion
                final del equipo. La web no comunica confirmacion automatica ni
                plaza cerrada en tiempo real.
              </p>
              <Cluster className="booking-hero__channels" gap="sm">
                {bookingChannels.map((channel) => (
                  <span className="booking-hero__channel" key={channel.id}>
                    {channel.label}
                  </span>
                ))}
              </Cluster>
              <ul className="booking-hero__list">
                {bookingChannels.map((channel) => (
                  <li key={channel.id}>
                    {channel.label}: {channel.href}
                  </li>
                ))}
              </ul>
              <p className="booking-hero__note">
                Si faltan datos de mesa, horario o contexto, contacta primero y
                el equipo resolvera la solicitud manualmente.
              </p>
            </div>
          </header>
          <section className="booking-form-shell">
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
                <TextLink to="/contacto/">
                  Tambien puedes confirmar por telefono o WhatsApp
                </TextLink>
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
          </section>
        </section>
      </Container>
    </>
  );
}
