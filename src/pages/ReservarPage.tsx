import { FormEvent, useState } from "react";
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
        title={seoPage.metadata.title}
        description={seoPage.metadata.description}
        path={seoPage.metadata.path}
        robots={seoPage.metadata.robots}
        structuredData={getRestaurantStructuredData(seoPage)}
      />
      <section className="form-layout">
        <header className="section-intro">
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
        <form
          className="booking-form"
          onSubmit={(event) => {
            void handleSubmit(event);
          }}
        >
          <label>
            Fecha
            <input required name="date" type="date" />
          </label>
          <label>
            Hora
            <input required name="time" type="time" />
          </label>
          <label>
            Comensales
            <input required min="1" name="guests" type="number" />
          </label>
          <label>
            Nombre
            <input required name="name" type="text" />
          </label>
          <label>
            Contacto
            <input required name="contact" type="text" />
          </label>
          <label>
            Notas
            <textarea name="notes" rows={4} />
          </label>
          <label className="checkbox">
            <input required name="privacy" type="checkbox" />
            {bookingRequestContext.privacyCopy}
          </label>
          <button className="button button--primary" type="submit">
            Enviar solicitud
          </button>
          <p
            aria-live="polite"
            className="form-status"
            data-status={result.status}
          >
            {result.message}
          </p>
        </form>
      </section>
    </>
  );
}
