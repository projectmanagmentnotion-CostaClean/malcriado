import { BookingCta } from "@/components/common/BookingCta";
import { PageSeo } from "@/components/seo/PageSeo";
import { homeScenes } from "@/content/homeScenes";
import { businessIdentity, temporaryHeroAsset } from "@/content/siteContent";
import { getRestaurantStructuredData } from "@/content/structuredData";

export function HomePage() {
  return (
    <>
      <PageSeo
        title="Malcriado | Cocina fusion frente al mar en Pineda de Mar"
        description="Bootstrap tecnico provisional de la nueva web oficial de Malcriado."
        path="/"
        structuredData={getRestaurantStructuredData("/")}
      />
      <section className="hero">
        <div className="hero__backdrop" aria-hidden="true" />
        <div className="hero__content">
          <p className="eyebrow">Pineda de Mar · Costa · Noche</p>
          <h1>
            Cocina fusion frente al mar con deseo, textura y una narrativa
            visual por escenas.
          </h1>
          <p>
            Esta home provisional ya se organiza como secuencia cinematografica:
            hero, especial, fusion, mar, noche y reserva. La implementacion
            completa de GSAP queda documentada para evolucionar sin perder
            accesibilidad ni rendimiento.
          </p>
          <div className="actions">
            <a className="button button--primary" href="/reservar/">
              Reservar
            </a>
            <a className="button button--secondary" href="/menu/">
              Ver carta provisional
            </a>
          </div>
          <dl className="hero__details">
            <div>
              <dt>Direccion</dt>
              <dd>{businessIdentity.address}</dd>
            </div>
            <div>
              <dt>Telefono</dt>
              <dd>{businessIdentity.phone}</dd>
            </div>
          </dl>
        </div>
        <figure className="hero__media">
          <img
            src={temporaryHeroAsset.src}
            alt={temporaryHeroAsset.alt}
            width={temporaryHeroAsset.width}
            height={temporaryHeroAsset.height}
          />
          <figcaption>Asset provisional verificado de Fase 0.</figcaption>
        </figure>
      </section>
      <section
        className="scene-strip"
        aria-label="Storyboard provisional de la home"
      >
        {homeScenes.map((scene, index) => (
          <article
            className={`scene-card scene-card--${scene.accent}`}
            key={scene.id}
          >
            <p className="eyebrow">{scene.eyebrow}</p>
            <h2>
              <span>{String(index + 3).padStart(2, "0")}</span> {scene.title}
            </h2>
            <p>{scene.body}</p>
          </article>
        ))}
      </section>
      <BookingCta />
    </>
  );
}
