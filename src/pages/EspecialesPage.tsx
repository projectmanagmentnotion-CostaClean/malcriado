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
      noteTitle: "Promocion activa",
      noteBody:
        "La promocion esta publicada y mantiene sus fechas activas en Europe/Madrid.",
    };
  }

  if (snapshot.kind === "upcoming" && offer) {
    return {
      eyebrow: "Especial programado",
      title: `Proximo especial: ${offer.title}`,
      body: `Existe una promocion preparada, pero todavia no ha llegado su fecha de inicio. ${
        offer.description ?? offer.fallbackContent ?? ""
      }`.trim(),
      noteTitle: "Todavia no disponible",
      noteBody: "La web no adelanta una promocion como activa antes de tiempo.",
    };
  }

  if (snapshot.kind === "expired" && offer) {
    return {
      eyebrow: "Especial finalizado",
      title: `${offer.title} ya no esta activo`,
      body: `La ultima promocion tipada ya ha terminado. ${
        offer.description ?? offer.fallbackContent ?? ""
      }`.trim(),
      noteTitle: "Promocion cerrada",
      noteBody:
        "Cuando una promocion termina, deja de mostrarse como activa para evitar confusiones.",
    };
  }

  return {
    eyebrow: "Especiales",
    title: "Ahora mismo no hay promociones activas publicadas.",
    body: offerEditorialState.message,
    noteTitle: "Sin urgencia artificial",
    noteBody:
      "Si hoy no hay una promocion publicada, puedes reservar igualmente desde la carta o por WhatsApp.",
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
                  Especiales y promociones de Malcriado
                </h1>
                <p className="specials-hero__lede">
                  Aqui solo aparecen promociones con fechas claras. Si hoy no
                  hay una publicada, puedes reservar igualmente desde la carta.
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
                    Reservar mesa
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
