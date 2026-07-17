import { SectionIntro } from "@/components/common/SectionIntro";
import { Container } from "@/components/layout/Container";
import { OfferFeature } from "@/components/offers/OfferFeature";
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
        description={seoPage.metadata.description}
        path={seoPage.metadata.path}
        robots={seoPage.metadata.robots}
        structuredData={getRestaurantStructuredData(seoPage)}
        title={seoPage.metadata.title}
      />
      <SectionIntro
        body="La capa editorial ya distingue entre contenido activo y contenido pendiente."
        eyebrow="Especiales"
        title="Especiales pendientes de validacion"
      />
      <Container width="reading">
        <OfferFeature
          offer={activeOffers[0] ?? null}
          pendingMessage={`${offerEditorialState.message} Activos publicados: ${activeOffers.length}.`}
        />
      </Container>
    </>
  );
}
