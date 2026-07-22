import { EditorialImage } from "@/components/media/EditorialImage";
import { PageSeo } from "@/components/seo/PageSeo";
import { LinkButton } from "@/components/ui/LinkButton";
import {
  getAsset,
  homeStoryContent,
  peopleProfiles,
  seoPages,
  timelineItems,
} from "@/content";
import { buildPageSeoProps } from "@/lib/seo/pageSeoProps";

export function NosotrosPage() {
  const seoPage = seoPages.story!;
  const person = peopleProfiles[0] ?? null;
  const originBlock = homeStoryContent[0] ?? null;
  const conceptBlock = homeStoryContent[1] ?? null;
  const coastBlock = homeStoryContent[2] ?? null;

  return (
    <>
      <PageSeo {...buildPageSeoProps(seoPage)} />
      <div className="story-page">
        <section className="story-hero">
          <div className="story-hero__media">
            <EditorialImage
              alt="Escena gastronomica de Malcriado como apertura narrativa."
              asset={getAsset("asset-026")}
              crop="portrait"
              eager
              ratio="cinema"
              sizes="100vw"
            />
          </div>
          <div aria-hidden="true" className="story-hero__veil" />
          <div className="container container--wide">
            <div className="story-hero__grid">
              <header className="story-hero__content">
                <p className="eyebrow">Nosotros</p>
                <h1 data-route-heading="true" id="page-heading-nosotros">
                  Cocina de fusion, mar y una propuesta con sello propio
                </h1>
                <p className="story-hero__lede">
                  Malcriado reune cocina fusion latinoamericana y mediterranea,
                  una ubicacion frente al mar y una propuesta pensada para
                  compartir, reservar y volver.
                </p>
              </header>
              <div className="story-hero__aside">
                {person ? (
                  <div>
                    <p className="eyebrow">{person.role}</p>
                    <strong>{person.name}</strong>
                    <span>{person.biography}</span>
                  </div>
                ) : null}
                <div>
                  <p className="eyebrow">La propuesta</p>
                  <strong>
                    Una experiencia para comer, brindar y reservar
                  </strong>
                  <span>
                    La experiencia tiene que sentirse cercana y apetecible, con
                    una salida clara hacia la carta, el contacto o la reserva.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="story-statement">
          <div className="container container--wide">
            <div className="story-statement__grid">
              <div className="story-statement__lead">
                <p className="eyebrow">{originBlock?.eyebrow ?? "Origen"}</p>
                <h2>
                  {originBlock?.heading ??
                    "Malcriado nace de una pasion por la gastronomia y la fusion de culturas."}
                </h2>
              </div>
              <div className="story-statement__copy">
                <p>
                  {conceptBlock?.body ??
                    conceptBlock?.heading ??
                    "La propuesta publica ya deja clara la cocina visible del proyecto y seguira ampliandose cuando el equipo cierre la version final."}
                </p>
                <div className="story-statement__actions">
                  <LinkButton to="/menu/" variant="secondary">
                    Ver carta
                  </LinkButton>
                  <LinkButton to="/reservar/" variant="ghost">
                    Ir a reserva
                  </LinkButton>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="story-columns">
          <div className="container container--wide">
            <div className="story-columns__grid">
              <article className="story-column">
                <p className="eyebrow">{conceptBlock?.eyebrow ?? "Concepto"}</p>
                <h2>
                  {conceptBlock?.heading ??
                    "Fusion culinaria como lenguaje central."}
                </h2>
                <p>
                  {conceptBlock?.body ??
                    "La historia publica ya presenta la cocina, la mezcla de sabores y la personalidad del proyecto sin prometer datos que aun no esten cerrados."}
                </p>
              </article>
              <article className="story-column story-column--media">
                <EditorialImage
                  alt="Escena costera y gastronomica asociada al universo de Malcriado."
                  asset={getAsset("asset-019")}
                  crop="landscape"
                  ratio="cinema"
                  sizes="(max-width: 900px) 100vw, 46vw"
                />
              </article>
              <article className="story-column">
                <p className="eyebrow">{coastBlock?.eyebrow ?? "Costa"}</p>
                <h2>
                  {coastBlock?.heading ??
                    "La experiencia junto al mar sigue siendo un rasgo visible."}
                </h2>
                <p>
                  {coastBlock?.body ??
                    "El mar, el paseo y la ubicacion forman parte de la experiencia desde que llegas hasta que reservas."}
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="story-proof">
          <div className="container container--wide">
            <div className="story-proof__grid">
              <article className="story-proof__card">
                <p className="eyebrow">Lo que define a Malcriado</p>
                <h2>Fusion, costa y una cocina con identidad propia</h2>
                <p>
                  La marca se reconoce por su mezcla de sabores, la ubicacion
                  frente al mar y una propuesta pensada para reservar con
                  facilidad.
                </p>
              </article>
              <article className="story-proof__card">
                <p className="eyebrow">En desarrollo</p>
                <h2>La biografia ampliada del chef sigue en revision</h2>
                <p>
                  No se publican premios, cargos ampliados, citas ni trayectoria
                  detallada mientras no exista confirmacion directa del titular.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="story-timeline">
          <div className="container container--wide">
            <p className="eyebrow">Senales de marca</p>
            <h2>Lo que hoy ya forma parte de la experiencia</h2>
            <div className="story-timeline__list">
              {timelineItems.map((item) => (
                <article className="story-timeline__item" key={item.id}>
                  <strong>{item.label}</strong>
                  <p>{item.description}</p>
                </article>
              ))}
            </div>
            <div className="story-timeline__actions">
              <LinkButton to="/contacto/" variant="secondary">
                Ver contacto
              </LinkButton>
              <LinkButton to="/faq/" variant="ghost">
                Resolver dudas frecuentes
              </LinkButton>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
