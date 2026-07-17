import { EditorialImage } from "@/components/media/EditorialImage";
import { PageSeo } from "@/components/seo/PageSeo";
import { LinkButton } from "@/components/ui/LinkButton";
import {
  getAsset,
  getOfferEditorialSnapshot,
  offerEditorialState,
  offers,
  seoPages,
} from "@/content";
import { buildBookingIntentHref } from "@/lib/booking/buildBookingIntentHref";
import { buildPageSeoProps } from "@/lib/seo/pageSeoProps";

function getSpecialsCopy() {
  const snapshot = getOfferEditorialSnapshot(offers);
  const offer = snapshot.primaryOffer;

  if (snapshot.kind === "active" && offer) {
    return {
      eyebrow: "Especial activo",
      title: offer.title,
      body: offer.description ?? offer.fallbackContent ?? offer.title,
      noteTitle: "Promocion vigente",
      noteBody:
        "La oferta esta activa en Europe/Madrid y mantiene prioridad editorial frente a otras promociones verificadas.",
    };
  }

  if (snapshot.kind === "upcoming" && offer) {
    return {
      eyebrow: "Especial programado",
      title: `Proximo especial: ${offer.title}`,
      body: `Existe una oferta futura con vigencia tipada, pero aun no esta activa en Europe/Madrid. ${
        offer.description ?? offer.fallbackContent ?? ""
      }`.trim(),
      noteTitle: "Aun no publicada como activa",
      noteBody:
        "La ruta no debe adelantar una promocion como vigente antes de su fecha exacta de inicio.",
    };
  }

  if (snapshot.kind === "expired" && offer) {
    return {
      eyebrow: "Especial expirado",
      title: `Ultimo especial expirado: ${offer.title}`,
      body: `La ultima oferta tipada ya no esta vigente y no debe seguir publicandose como activa. ${
        offer.description ?? offer.fallbackContent ?? ""
      }`.trim(),
      noteTitle: "No se re-publica por caducidad",
      noteBody:
        "Las promociones vencidas quedan fuera de la capa activa y solo se conservan para trazabilidad editorial y testing.",
    };
  }

  return {
    eyebrow: "Especial activo",
    title: "Ahora mismo no hay una promocion vigente con fechas verificables.",
    body: offerEditorialState.message,
    noteTitle: "Sin promociones ficticias",
    noteBody:
      "Especiales expirados no aparecen como activos y la ausencia de campanas se trata como estado editorial disenado, no como error.",
  };
}

export function EspecialesPage() {
  const seoPage = seoPages.offers!;
  const copy = getSpecialsCopy();

  return (
    <>
      <PageSeo {...buildPageSeoProps(seoPage)} />
      <div className="specials-page">
        <section className="specials-hero">
          <div className="specials-hero__media">
            <EditorialImage
              alt="Imagen gastronomica para la apertura de especiales."
              asset={getAsset("asset-017")}
              crop="portrait"
              eager
              ratio="cinema"
              sizes="100vw"
            />
          </div>
          <div aria-hidden="true" className="specials-hero__veil" />
          <div className="container container--wide">
            <div className="specials-hero__grid">
              <header className="specials-hero__content">
                <p className="eyebrow">Especiales</p>
                <h1 data-route-heading="true" id="page-heading-especiales">
                  Estado editorial de ofertas y vigencia
                </h1>
                <p className="specials-hero__lede">
                  Solo se publican promociones activas con fechas verificables.
                  Cuando no existen, la ruta se mantiene util sin inventar una
                  oferta ni forzar urgencia falsa.
                </p>
              </header>
              <div className="specials-hero__status">
                <p className="eyebrow">Situacion actual</p>
                <strong>{copy.title}</strong>
                <span>{copy.body}</span>
              </div>
            </div>
          </div>
        </section>

        <section className="specials-state">
          <div className="container container--wide">
            <div className="specials-state__grid">
              <div className="specials-state__copy">
                <p className="eyebrow">{copy.eyebrow}</p>
                <h2>{copy.title}</h2>
                <p>{copy.body}</p>
                <div className="specials-state__actions">
                  <LinkButton
                    iconEnd="arrow-right"
                    to="/menu/"
                    variant="editorial"
                  >
                    Ver carta
                  </LinkButton>
                  <LinkButton
                    to={buildBookingIntentHref({ context: "specials" })}
                    variant="secondary"
                  >
                    Reservar sin esperar oferta
                  </LinkButton>
                </div>
              </div>
              <div className="specials-state__note">
                <p className="eyebrow">Criterio</p>
                <strong>{copy.noteTitle}</strong>
                <span>{copy.noteBody}</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
