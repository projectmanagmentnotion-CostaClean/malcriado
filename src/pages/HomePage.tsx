import { useCallback, useEffect, useRef, useState } from "react";
import { Container } from "@/components/layout/Container";
import { Cluster } from "@/components/layout/Cluster";
import { EditorialImage } from "@/components/media/EditorialImage";
import { ResponsiveImage } from "@/components/media/ResponsiveImage";
import { PageSeo } from "@/components/seo/PageSeo";
import { LinkButton } from "@/components/ui/LinkButton";
import { HomePreloader } from "@/components/home/HomePreloader";
import { buildBookingIntentHref } from "@/lib/booking/buildBookingIntentHref";
import { buildPageSeoProps } from "@/lib/seo/pageSeoProps";
import { useReducedMotion } from "@/motion/hooks/useReducedMotion";
import { useHomePageMotion } from "@/motion/home/useHomePageMotion";
import {
  businessContent,
  getAsset,
  getFeaturedMenuItems,
  getGoogleMapsHref,
  getMenuItemsByCategory,
  getPrimaryOffer,
  getTelephoneHref,
  getWhatsappHref,
  homeScenes,
  homeStoryContent,
  menuContent,
  offers,
  offerEditorialState,
  peopleProfiles,
  seoPages,
} from "@/content";

const PRELOADER_SESSION_KEY = "malcriado-home-preloader-seen";

function getScene(slug: string) {
  return homeScenes.find((scene) => scene.slug === slug) ?? homeScenes[0]!;
}

function splitHeadline(heading: string | null) {
  if (!heading) {
    return [];
  }

  const parts = heading.split(". ").filter(Boolean);
  return parts.length > 1 ? parts.map((part) => `${part.trim()}.`) : [heading];
}

export function HomePage() {
  const seoPage = seoPages.home!;
  const rootRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const [showPreloader, setShowPreloader] = useState(() => {
    if (typeof window === "undefined") {
      return false;
    }

    return (
      window.matchMedia(
        "(min-width: 901px) and (prefers-reduced-motion: no-preference)",
      ).matches &&
      window.sessionStorage.getItem(PRELOADER_SESSION_KEY) !== "true"
    );
  });

  const heroScene = getScene("hero");
  const specialScene = getScene("especial-activo");
  const fusionScene = getScene("declaracion-de-fusion");
  const featuredScene = getScene("platos-insignia");
  const coastScene = getScene("frente-al-mar");
  const nightScene = getScene("cocteles-y-noche");
  const storyScene = getScene("historia");
  const menuScene = getScene("carta-visual");
  const bookingScene = getScene("reserva");
  const locationScene = getScene("ubicacion-y-cierre");

  const heroAsset = getAsset("asset-019");
  const specialAsset = getAsset("asset-017");
  const fusionAsset = getAsset("asset-026");
  const coastAsset = getAsset("asset-019");
  const nightAsset = getAsset("asset-028");

  const heroTitleLines = splitHeadline(heroScene.content.heading);
  const featuredDishes = getFeaturedMenuItems();
  const leadDish = featuredDishes[0] ?? null;
  const primaryOffer = getPrimaryOffer(offers);
  const chefProfile = peopleProfiles[0] ?? null;
  const chefAsset = chefProfile?.mediaAssetId
    ? getAsset(chefProfile.mediaAssetId)
    : getAsset("asset-018");
  const storyHighlights = homeStoryContent.slice(0, 3);
  const visibleCategories = menuContent.categories.slice(0, 5);
  const mapsHref = getGoogleMapsHref();
  const whatsappHref = getWhatsappHref();
  const phoneHref = getTelephoneHref();
  const socialLinks = businessContent.contact.socials.slice(0, 2);
  const handlePreloaderComplete = useCallback(() => {
    if (typeof window !== "undefined") {
      window.sessionStorage.setItem(PRELOADER_SESSION_KEY, "true");
    }

    setShowPreloader(false);
  }, []);

  useEffect(() => {
    if (!showPreloader || typeof window === "undefined") {
      return;
    }

    const fallbackTimeout = window.setTimeout(() => {
      handlePreloaderComplete();
    }, 2200);

    return () => window.clearTimeout(fallbackTimeout);
  }, [handlePreloaderComplete, showPreloader]);

  useHomePageMotion({
    rootRef,
    reducedMotion,
    showPreloader,
    onPreloaderComplete: handlePreloaderComplete,
  });

  return (
    <div className="home-page" ref={rootRef}>
      <PageSeo {...buildPageSeoProps(seoPage)} />
      <HomePreloader active={showPreloader} />

      <section
        className="home-hero home-scene"
        data-header-theme="overlay"
        data-motion="reveal"
        id="home-hero"
      >
        <div className="home-hero__media" data-scene-media="true">
          <ResponsiveImage
            alt="Plato editorial protagonista de Malcriado."
            asset={heroAsset}
            className="home-hero__background"
            crop="landscape"
            decorative
            eager
            fetchPriority="high"
            sizes="100vw"
          />
        </div>
        <div className="home-hero__veil" aria-hidden="true" />
        <Container width="wide">
          <div className="home-hero__grid">
            <div className="home-hero__content">
              <p className="home-hero__eyebrow" data-scene-reveal="true">
                {heroScene.content.eyebrow}
              </p>
              <h1
                className="home-hero__title"
                data-route-heading="true"
                id="page-heading-home"
              >
                {heroTitleLines.map((line, index) => (
                  <span
                    className="home-hero__title-line"
                    data-scene-reveal="true"
                    key={`${line}-${index}`}
                  >
                    {line}
                  </span>
                ))}
              </h1>
              <p className="home-hero__lede" data-scene-reveal="true">
                {heroScene.content.copy}
              </p>
              <Cluster
                className="home-hero__actions"
                gap="sm"
                data-scene-reveal="true"
              >
                <LinkButton
                  iconEnd="arrow-right"
                  size="lg"
                  to={buildBookingIntentHref({ context: "home-hero" })}
                  variant="editorial"
                >
                  Reservar mesa
                </LinkButton>
                <LinkButton
                  {...(whatsappHref
                    ? {
                        href: whatsappHref,
                        rel: "noreferrer",
                        target: "_blank",
                      }
                    : { href: phoneHref ?? "/contacto/" })}
                  variant="secondary"
                >
                  WhatsApp
                </LinkButton>
              </Cluster>
              <p className="home-hero__note">
                Solicitud manual con confirmacion del equipo.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section
        className="home-scene home-scene--special"
        data-header-theme="light"
        data-motion="layered"
        id={specialScene.id}
      >
        <Container width="wide">
          <div className="home-special">
            <div className="home-special__content">
              <p className="eyebrow" data-scene-reveal="true">
                {specialScene.content.eyebrow}
              </p>
              <h2 data-scene-reveal="true">
                {primaryOffer?.title ??
                  "Ahora mismo no hay una promocion vigente con fechas verificables."}
              </h2>
              <p data-scene-reveal="true">
                {primaryOffer?.description ??
                  primaryOffer?.fallbackContent ??
                  offerEditorialState.message}
              </p>
              <div className="home-status-pill" data-scene-reveal="true">
                {primaryOffer ? "Oferta activa" : "Sin promocion activa"}
              </div>
              <Cluster gap="sm" data-scene-reveal="true">
                <LinkButton
                  iconEnd="arrow-right"
                  to="/especiales/"
                  variant="primary"
                >
                  Ver especiales
                </LinkButton>
                <LinkButton
                  to={buildBookingIntentHref({ context: "home-special" })}
                  variant="secondary"
                >
                  Reservar sin esperar oferta
                </LinkButton>
              </Cluster>
            </div>
            <div className="home-special__media" data-scene-media="true">
              <EditorialImage
                alt="Plato destacado para escena de especial activo."
                asset={specialAsset}
                crop="editorial"
                ratio="portrait"
                sizes="(max-width: 900px) 100vw, 36vw"
              />
            </div>
          </div>
        </Container>
      </section>

      <section
        className="home-scene home-scene--fusion"
        data-header-theme="dark"
        data-motion="layered"
        id={fusionScene.id}
      >
        <Container width="wide">
          <div className="home-fusion">
            <div className="home-fusion__lead">
              <p className="eyebrow" data-scene-reveal="true">
                {fusionScene.content.eyebrow}
              </p>
              <h2 data-scene-reveal="true">{fusionScene.content.heading}</h2>
              <p data-scene-reveal="true">{fusionScene.content.copy}</p>
            </div>
            <div className="home-fusion__statement" data-scene-reveal="true">
              <p>
                Una cocina para compartir, mirar el mar y pasar de la primera
                impresion a la reserva sin rodeos.
              </p>
            </div>
            <div className="home-fusion__media" data-scene-media="true">
              <EditorialImage
                alt="Plato de fusion como apoyo a la declaracion editorial."
                asset={fusionAsset}
                crop="editorial"
                ratio="portrait"
                sizes="(max-width: 900px) 100vw, 34vw"
              />
            </div>
          </div>
        </Container>
      </section>

      <section
        className="home-scene home-scene--featured"
        data-header-theme="dark"
        data-motion="horizontal-gallery"
        id={featuredScene.id}
      >
        <Container width="wide">
          <div className="home-featured__intro">
            <p className="eyebrow" data-scene-reveal="true">
              {featuredScene.content.eyebrow}
            </p>
            <h2 data-scene-reveal="true">{featuredScene.content.heading}</h2>
            <p data-scene-reveal="true">{featuredScene.content.copy}</p>
          </div>
          <div className="home-featured__rail">
            {featuredDishes.map((dish, index) => {
              const dishAsset = dish.media?.assetId
                ? getAsset(dish.media.assetId)
                : null;
              const categoryLabel =
                menuContent.categories.find(
                  (category) => category.id === dish.categoryId,
                )?.label ?? dish.categoryId;

              return (
                <article
                  className={`home-featured-card${index === 0 ? " home-featured-card--lead" : ""}`}
                  data-scene-reveal="true"
                  key={dish.id}
                >
                  {dishAsset ? (
                    <div
                      className="home-featured-card__media"
                      data-scene-media="true"
                    >
                      <EditorialImage
                        alt={dish.media?.alt ?? dish.name}
                        asset={dishAsset}
                        crop={dish.media?.crop ?? "portrait"}
                        ratio={index === 0 ? "cinema" : "portrait"}
                        sizes="(max-width: 900px) 100vw, 32vw"
                      />
                    </div>
                  ) : null}
                  <div className="home-featured-card__body">
                    <p className="eyebrow">{categoryLabel}</p>
                    <h3>{dish.name}</h3>
                    <p>
                      {dish.description ??
                        "Disponible en la carta de Malcriado. Consulta al equipo por ingredientes, precio y disponibilidad del momento."}
                    </p>
                    <Cluster gap="sm">
                      <LinkButton to="/menu/" variant="ghost">
                        Ver carta
                      </LinkButton>
                      <LinkButton
                        to={buildBookingIntentHref({
                          context: "home-featured-dish",
                          item: dish.slug,
                          category: dish.categoryId,
                        })}
                        variant="secondary"
                      >
                        Reservar este plan
                      </LinkButton>
                    </Cluster>
                  </div>
                </article>
              );
            })}
          </div>
          {leadDish ? (
            <p className="home-featured__note" data-scene-reveal="true">
              Empieza por {leadDish.name}, sigue por la carta y reserva cuando
              tengas claro el plan.
            </p>
          ) : null}
        </Container>
      </section>

      <section
        className="home-scene home-scene--coast"
        data-header-theme="light"
        data-motion="quiet-reading"
        id={coastScene.id}
      >
        <div className="home-coast__media" data-scene-media="true">
          <EditorialImage
            alt="Escena costera de apoyo para la narrativa frente al mar."
            asset={coastAsset}
            crop="landscape"
            ratio="cinema"
            sizes="100vw"
          />
        </div>
        <Container width="wide">
          <div className="home-coast__content">
            <p className="eyebrow" data-scene-reveal="true">
              {coastScene.content.eyebrow}
            </p>
            <h2 data-scene-reveal="true">{coastScene.content.heading}</h2>
            <p data-scene-reveal="true">{coastScene.content.copy}</p>
            <Cluster gap="sm" data-scene-reveal="true">
              {mapsHref ? (
                <LinkButton
                  href={mapsHref}
                  rel="noreferrer"
                  target="_blank"
                  variant="primary"
                >
                  Como llegar
                </LinkButton>
              ) : null}
              <LinkButton to="/contacto/" variant="secondary">
                Ver contacto
              </LinkButton>
            </Cluster>
          </div>
        </Container>
      </section>

      <section
        className="home-scene home-scene--night"
        data-header-theme="dark"
        data-motion="layered"
        id={nightScene.id}
      >
        <Container width="wide">
          <div className="home-night">
            <div className="home-night__content">
              <p className="eyebrow" data-scene-reveal="true">
                {nightScene.content.eyebrow}
              </p>
              <h2 data-scene-reveal="true">{nightScene.content.heading}</h2>
              <p data-scene-reveal="true">{nightScene.content.copy}</p>
              <div className="home-night__chips" data-scene-reveal="true">
                <span>Margaritas</span>
                <span>Mojitos</span>
                <span>Carta de bebidas</span>
              </div>
            </div>
            <div className="home-night__media" data-scene-media="true">
              <EditorialImage
                alt="Coctel destacado para la escena nocturna."
                asset={nightAsset}
                crop="portrait"
                ratio="portrait"
                sizes="(max-width: 900px) 100vw, 34vw"
              />
            </div>
          </div>
        </Container>
      </section>

      <section
        className="home-scene home-scene--story"
        data-header-theme="light"
        data-motion="quiet-reading"
        id={storyScene.id}
      >
        <Container width="wide">
          <div className="home-story">
            <div className="home-story__media" data-scene-media="true">
              <EditorialImage
                alt="Hector atendiendo desde la cocina movil de Malcriado."
                asset={chefAsset}
                crop="portrait"
                ratio="portrait"
                sizes="(max-width: 900px) 100vw, 38vw"
              />
            </div>
            <div className="home-story__lead">
              <p className="eyebrow" data-scene-reveal="true">
                {storyScene.content.eyebrow}
              </p>
              <h2 data-scene-reveal="true">{storyScene.content.heading}</h2>
              <p data-scene-reveal="true">{storyScene.content.copy}</p>
              {chefProfile ? (
                <div className="home-story__profile" data-scene-reveal="true">
                  <strong>{chefProfile.name}</strong>
                  <span>{chefProfile.role}</span>
                </div>
              ) : null}
            </div>
            <div className="home-story__blocks">
              {storyHighlights.map((block) => (
                <article
                  className="home-story-card"
                  data-scene-reveal="true"
                  key={block.id}
                >
                  <p className="eyebrow">{block.eyebrow}</p>
                  <h3>{block.heading}</h3>
                  <p>
                    {block.body ??
                      "Una historia breve y clara para entender la propuesta antes de reservar."}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section
        className="home-scene home-scene--menu"
        data-header-theme="dark"
        data-motion="reveal"
        id={menuScene.id}
      >
        <Container width="wide">
          <div className="home-menu">
            <div className="home-menu__intro">
              <p className="eyebrow" data-scene-reveal="true">
                {menuScene.content.eyebrow}
              </p>
              <h2 data-scene-reveal="true">{menuScene.content.heading}</h2>
              <p data-scene-reveal="true">{menuScene.content.copy}</p>
            </div>
            <div className="home-menu__grid">
              {visibleCategories.map((category) => (
                <article
                  className="home-menu-card"
                  data-scene-reveal="true"
                  key={category.id}
                >
                  <p className="home-menu-card__count">
                    {getMenuItemsByCategory(category.id).length} items
                  </p>
                  <h3>{category.label}</h3>
                  <p>
                    {category.description ??
                      "Categoria visible en carta tipada y lista para navegacion HTML."}
                  </p>
                </article>
              ))}
            </div>
            <Cluster gap="sm" data-scene-reveal="true">
              <LinkButton iconEnd="arrow-right" to="/menu/" variant="editorial">
                Explorar carta
              </LinkButton>
              <LinkButton to="/especiales/" variant="secondary">
                Ver especiales
              </LinkButton>
            </Cluster>
          </div>
        </Container>
      </section>

      <section
        className="home-scene home-scene--booking"
        data-header-theme="light"
        data-motion="booking-focus"
        id={bookingScene.id}
      >
        <Container width="wide">
          <div className="home-booking">
            <div className="home-booking__intro">
              <p className="eyebrow" data-scene-reveal="true">
                {bookingScene.content.eyebrow}
              </p>
              <h2 data-scene-reveal="true">{bookingScene.content.heading}</h2>
              <p data-scene-reveal="true">{bookingScene.content.copy}</p>
            </div>
            <div className="home-booking__panel" data-scene-reveal="true">
              <div>
                <p className="home-booking__label">Canal principal</p>
                <strong>Formulario de solicitud</strong>
                <p>
                  No comunica confirmacion automatica ni disponibilidad en
                  tiempo real.
                </p>
              </div>
              <Cluster gap="sm">
                <LinkButton
                  iconEnd="arrow-right"
                  size="lg"
                  to={buildBookingIntentHref({ context: "home-booking-panel" })}
                  variant="editorial"
                >
                  Ir a reservar
                </LinkButton>
                {whatsappHref ? (
                  <LinkButton
                    href={whatsappHref}
                    rel="noreferrer"
                    target="_blank"
                    variant="secondary"
                  >
                    WhatsApp
                  </LinkButton>
                ) : null}
              </Cluster>
            </div>
          </div>
        </Container>
      </section>

      <section
        className="home-scene home-scene--location"
        data-header-theme="dark"
        data-motion="quiet-reading"
        id={locationScene.id}
      >
        <Container width="wide">
          <div className="home-location">
            <div className="home-location__lead">
              <p className="eyebrow" data-scene-reveal="true">
                {locationScene.content.eyebrow}
              </p>
              <h2 data-scene-reveal="true">{locationScene.content.heading}</h2>
              <p data-scene-reveal="true">{locationScene.content.copy}</p>
            </div>
            <div className="home-location__meta">
              <article data-scene-reveal="true">
                <p className="home-booking__label">Direccion</p>
                <strong>{businessContent.location.publicAddress.value}</strong>
                <p>Pineda de Mar, Barcelona.</p>
              </article>
              <article data-scene-reveal="true">
                <p className="home-booking__label">Contacto</p>
                <strong>{businessContent.contact.phone.value}</strong>
                <p>{businessContent.contact.email.value}</p>
              </article>
              <article data-scene-reveal="true">
                <p className="home-booking__label">Canales</p>
                <strong>
                  {socialLinks.map((link) => link.label).join(" y ")}
                </strong>
                <p>
                  Siguen disponibles como apoyo rapido para resolver dudas o
                  cerrar una visita.
                </p>
              </article>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
