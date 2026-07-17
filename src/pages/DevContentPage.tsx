import { DevNavigation } from "@/components/layout/DevNavigation";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { PageSeo } from "@/components/seo/PageSeo";
import {
  businessContent,
  contentSourceList,
  homeScenes,
  legalPages,
  menuContent,
  offers,
  peopleProfiles,
  seoPages,
} from "@/content";

function countPendingStatuses() {
  return [
    businessContent.hours.summary.status,
    businessContent.location.coordinates.status,
    ...homeScenes.map((scene) => scene.editorialStatus),
    ...menuContent.categories.map((category) => category.publicationStatus),
    ...menuContent.items.map((item) => item.publicationStatus),
    ...legalPages.map((page) => page.status),
  ].filter((status) => status !== "VERIFIED").length;
}

export function DevContentPage() {
  const seoPage = seoPages.devContent!;

  return (
    <>
      <PageSeo
        description={seoPage.metadata.description}
        path={seoPage.metadata.path}
        robots={seoPage.metadata.robots}
        title={seoPage.metadata.title}
      />
      <Section spacing="compact">
        <Container width="wide">
          <DevNavigation />
        </Container>
      </Section>
      <section className="container container--editorial editorial-intro">
        <p className="eyebrow">Dev only</p>
        <h1>Auditoria editorial</h1>
        <p>
          Resumen operativo del modelo de contenido: fuentes, estados pendientes
          y superficies publicas ya conectadas al dominio tipado.
        </p>
      </section>
      <section className="asset-summary-grid container container--wide">
        <article className="panel">
          <h2>Fuentes</h2>
          <p>{contentSourceList.length}</p>
        </article>
        <article className="panel">
          <h2>Escenas home</h2>
          <p>{homeScenes.length}</p>
        </article>
        <article className="panel">
          <h2>Items de carta</h2>
          <p>{menuContent.items.length}</p>
        </article>
        <article className="panel">
          <h2>Estados pendientes</h2>
          <p>{countPendingStatuses()}</p>
        </article>
      </section>
      <section className="cards-grid container container--wide">
        <article className="panel">
          <p className="eyebrow">Negocio</p>
          <h2>{businessContent.identity.commercialName.value}</h2>
          <p>{businessContent.identity.shortDescription.value}</p>
        </article>
        <article className="panel">
          <p className="eyebrow">Personas</p>
          <h2>{peopleProfiles.length} perfil editorial</h2>
          <p>{peopleProfiles.map((person) => person.name).join(", ")}</p>
        </article>
        <article className="panel">
          <p className="eyebrow">Especiales</p>
          <h2>{offers.length} ofertas publicadas</h2>
          <p>No se publican especiales sin vigencia verificable.</p>
        </article>
        <article className="panel">
          <p className="eyebrow">Legal</p>
          <h2>{legalPages.length} rutas legales</h2>
          <p>{legalPages.map((page) => page.status).join(" · ")}</p>
        </article>
      </section>
    </>
  );
}
