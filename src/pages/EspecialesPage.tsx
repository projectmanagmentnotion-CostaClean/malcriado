import { SectionIntro } from "@/components/common/SectionIntro";
import { PageSeo } from "@/components/seo/PageSeo";
import { offerStatus } from "@/content/siteContent";
import { getRestaurantStructuredData } from "@/content/structuredData";

export function EspecialesPage() {
  return (
    <>
      <PageSeo
        title="Especiales | Malcriado"
        description="Estado provisional de especiales; no se muestran promociones no verificadas."
        path="/especiales/"
        structuredData={getRestaurantStructuredData("/especiales/")}
      />
      <SectionIntro
        eyebrow="Especiales"
        title="Especiales pendientes de validacion"
        body="La capa editorial ya distingue entre contenido activo y contenido pendiente."
      />
      <section className="panel">
        <h2>Estado actual</h2>
        <p data-offer-type={offerStatus.type}>{offerStatus.message}</p>
      </section>
    </>
  );
}
