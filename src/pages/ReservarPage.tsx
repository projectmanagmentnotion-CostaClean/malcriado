import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Cluster } from "@/components/layout/Cluster";
import { Container } from "@/components/layout/Container";
import { EditorialImage } from "@/components/media/EditorialImage";
import { PageSeo } from "@/components/seo/PageSeo";
import { buildPageSeoProps } from "@/lib/seo/pageSeoProps";
import { bookingChannels, bookingPolicy, getAsset, seoPages } from "@/content";
import {
  parseReservationContext,
  ReservationForm,
} from "@/features/reservation";

export function ReservarPage() {
  const [searchParams] = useSearchParams();
  const seoPage = seoPages.booking!;
  const bookingHeroAsset = getAsset("asset-019");
  const reservationContext = useMemo(
    () => parseReservationContext(searchParams),
    [searchParams],
  );

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
                fetchPriority="high"
                ratio="cinema"
                sizes="(max-width: 900px) 100vw, 48vw"
              />
              <div className="booking-hero__overlay">
                <p className="eyebrow">Reserva</p>
                <h1 data-route-heading="true" id="page-heading-reservar">
                  Solicita tu mesa
                </h1>
                <p>{bookingPolicy.summary}</p>
              </div>
            </div>
            <div className="booking-hero__copy">
              <p>
                Completa los datos y continúa por WhatsApp o correo. El equipo
                revisará la disponibilidad y te confirmará personalmente la
                reserva.
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
                    {channel.label}:{" "}
                    {channel.label === "Formulario"
                      ? "Disponible en esta pagina"
                      : channel.href}
                  </li>
                ))}
              </ul>
              <p className="booking-hero__note">
                Si necesitas una mesa para hoy o tienes una peticion especial,
                WhatsApp y telefono siguen siendo la via mas rapida.
              </p>
            </div>
          </header>
          <ReservationForm context={reservationContext} />
        </section>
      </Container>
    </>
  );
}
