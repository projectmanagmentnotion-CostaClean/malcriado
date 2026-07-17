import { BookingCta } from "@/components/common/BookingCta";
import { ResponsiveImage } from "@/components/media/ResponsiveImage";
import { PageSeo } from "@/components/seo/PageSeo";
import {
  businessContent,
  getAsset,
  getRestaurantStructuredData,
  getTelephoneHref,
  getWhatsappHref,
  homeScenes,
  seoPages,
} from "@/content";

const sceneThemeClassNames: Record<string, string> = {
  hero: "scene-card--terracotta",
  fusion: "scene-card--sand",
  coast: "scene-card--sea",
  night: "scene-card--night",
};

export function HomePage() {
  const seoPage = seoPages.home!;
  const heroAsset = getAsset("asset-019");
  const signatureAsset = getAsset("asset-017");
  const heroScene =
    homeScenes.find((scene) => scene.slug === "hero") ?? homeScenes[0]!;
  const address =
    businessContent.location.publicAddress.value ?? "Direccion pendiente";
  const phone = businessContent.contact.phone.value ?? "Telefono pendiente";

  return (
    <>
      <PageSeo
        title={seoPage.metadata.title}
        description={seoPage.metadata.description}
        path={seoPage.metadata.path}
        robots={seoPage.metadata.robots}
        structuredData={getRestaurantStructuredData(seoPage)}
      />
      <section className="hero">
        <div className="hero__backdrop" aria-hidden="true" />
        <div className="hero__content">
          <p className="eyebrow">
            {heroScene.content.eyebrow ?? "Pineda de Mar"}
          </p>
          <h1>{heroScene.content.heading}</h1>
          <p>{heroScene.content.copy}</p>
          <div className="actions">
            <a className="button button--primary" href="/reservar/">
              Reservar
            </a>
            <a
              className="button button--secondary"
              href={getWhatsappHref() ?? getTelephoneHref() ?? "/contacto/"}
            >
              WhatsApp
            </a>
          </div>
          <dl className="hero__details">
            <div>
              <dt>Direccion</dt>
              <dd>{address}</dd>
            </div>
            <div>
              <dt>Telefono</dt>
              <dd>{phone}</dd>
            </div>
            <div>
              <dt>Horario</dt>
              <dd>{businessContent.hours.summary.value ?? "Pendiente"}</dd>
            </div>
          </dl>
        </div>
        <figure className="hero__media">
          <ResponsiveImage
            asset={heroAsset}
            crop="landscape"
            sizes="(max-width: 900px) 100vw, 42vw"
            eager
          />
          <figcaption>
            Escena hero basada en asset aceptado y contenido verificado.
          </figcaption>
        </figure>
      </section>
      <section
        className="scene-strip"
        aria-label="Storyboard editorial de la home"
      >
        {homeScenes.slice(2, 10).map((scene, index) => (
          <article
            className={`scene-card ${sceneThemeClassNames[scene.theme] ?? "scene-card--sand"}`}
            key={scene.id}
          >
            <p className="eyebrow">{scene.content.eyebrow}</p>
            <h2>
              <span>{String(index + 1).padStart(2, "0")}</span>{" "}
              {scene.content.heading}
            </h2>
            <p>{scene.content.copy}</p>
          </article>
        ))}
      </section>
      <section className="cards-grid" aria-label="Platos destacados">
        <article className="panel">
          <p className="eyebrow">Plato destacado</p>
          <h2>Nachos Malcriados</h2>
          <ResponsiveImage
            asset={signatureAsset}
            crop="editorial"
            sizes="(max-width: 900px) 100vw, 30vw"
          />
        </article>
        <article className="panel">
          <p className="eyebrow">Estado editorial</p>
          <h2>Contenido verificado sin inventar precios ni promociones.</h2>
          <p>
            La home ya sale del modelo tipado: escenas, contacto, horarios y CTA
            quedan centralizados para el siguiente sprint visual con GSAP.
          </p>
        </article>
      </section>
      <BookingCta />
    </>
  );
}
