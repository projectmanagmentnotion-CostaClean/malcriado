import { SectionIntro } from "@/components/common/SectionIntro";
import { PageSeo } from "@/components/seo/PageSeo";
import {
  getActiveOffers,
  getRestaurantStructuredData,
  offerEditorialState,
  offers,
  seoPages,
} from "@/content";

export function EspecialesPage() {
  const seoPage = seoPages.offers!;
  const activeOffers = getActiveOffers(offers);

  return (
    <>
      <PageSeo
        title={seoPage.metadata.title}
        description={seoPage.metadata.description}
        path={seoPage.metadata.path}
        robots={seoPage.metadata.robots}
        structuredData={getRestaurantStructuredData(seoPage)}
      />
      <SectionIntro
        eyebrow="Especiales"
        title="Especiales pendientes de validacion"
        body="La capa editorial ya distingue entre contenido activo y contenido pendiente."
      />
      <section className="panel">
        <h2>Estado actual</h2>
        <p data-offer-type={offerEditorialState.status}>{offerEditorialState.message}</p>
        <p>{activeOffers.length} especiales activos publicados.</p>
      </section>
    </>
  );
}
