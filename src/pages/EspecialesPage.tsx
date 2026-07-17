import { SectionIntro } from "@/components/common/SectionIntro";
import { Container } from "@/components/layout/Container";
import { OfferFeature } from "@/components/offers/OfferFeature";
import { PageSeo } from "@/components/seo/PageSeo";
import { buildPageSeoProps } from "@/lib/seo/pageSeoProps";
import {
  getActiveOffers,
  offerEditorialState,
  offers,
  seoPages,
} from "@/content";

export function EspecialesPage() {
  const seoPage = seoPages.offers!;
  const activeOffers = getActiveOffers(offers);

  return (
    <>
      <PageSeo {...buildPageSeoProps(seoPage)} />
      <SectionIntro
        body="La capa editorial ya distingue entre contenido activo y contenido pendiente."
        eyebrow="Especiales"
        headingId="page-heading-especiales"
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
