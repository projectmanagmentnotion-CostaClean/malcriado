import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Cluster } from "@/components/layout/Cluster";
import { Container } from "@/components/layout/Container";
import { EditorialImage } from "@/components/media/EditorialImage";
import { PageSeo } from "@/components/seo/PageSeo";
import { LinkButton } from "@/components/ui/LinkButton";
import { buildPageSeoProps } from "@/lib/seo/pageSeoProps";
import {
  bookingChannels,
  bookingPolicy,
  businessContent,
  getAsset,
  getGoogleMapsHref,
  seoPages,
} from "@/content";
import { ConsentManagedMap } from "@/features/consent/ui/ConsentManagedMap";
import {
  parseReservationContext,
  ReservationForm,
} from "@/features/reservation";

export function ReservarPage() {
  const [searchParams] = useSearchParams();
  const seoPage = seoPages.booking!;
  const bookingHeroAsset = getAsset("asset-019");
  const mapsHref = getGoogleMapsHref();
  const reservationContext = useMemo(
    () => parseReservationContext(searchParams),
    [searchParams],
  );

  return (
    <>
      <PageSeo {...buildPageSeoProps(seoPage)} />
      <div className="booking-page">
        <Container width="wide">
          <section className="booking-layout">
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
                <p>Te confirmaremos disponibilidad por WhatsApp o correo.</p>
                <Cluster className="booking-hero__channels" gap="sm">
                  {bookingChannels.map((channel) => (
                    <span className="booking-hero__channel" key={channel.id}>
                      {channel.label}
                    </span>
                  ))}
                </Cluster>
              </div>
            </header>
            <ReservationForm context={reservationContext} />
          </section>
        </Container>

        <section
          aria-labelledby="booking-location-title"
          className="booking-location"
        >
          <Container width="wide">
            <div className="booking-location__grid">
              <div className="booking-location__copy">
                <p className="eyebrow">Antes de venir</p>
                <h2 id="booking-location-title">Encuentranos frente al mar</h2>
                <p>{businessContent.location.publicAddress.value}</p>
                <p>
                  Consulta la ubicacion, como llegar y las resenas publicadas
                  directamente en Google. No mostramos puntuaciones ni citas sin
                  una fuente verificada.
                </p>
                {mapsHref ? (
                  <LinkButton
                    href={mapsHref}
                    rel="noreferrer"
                    target="_blank"
                    variant="editorial"
                  >
                    Ver ubicacion y resenas en Google
                  </LinkButton>
                ) : null}
              </div>
              <ConsentManagedMap />
            </div>
          </Container>
        </section>
      </div>
    </>
  );
}
