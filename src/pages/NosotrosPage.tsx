import { SectionIntro } from "@/components/common/SectionIntro";
import { PageSeo } from "@/components/seo/PageSeo";
import { getRestaurantStructuredData } from "@/content/structuredData";

export function NosotrosPage() {
  return (
    <>
      <PageSeo
        title="Nosotros | Malcriado"
        description="Ruta provisional para la historia del restaurante, preparada para contenido validado."
        path="/nosotros/"
        structuredData={getRestaurantStructuredData("/nosotros/")}
      />
      <SectionIntro
        eyebrow="Nosotros"
        title="Historia y propuesta en preparacion"
        body="La arquitectura ya separa datos, layout y motion para introducir narrativa real sin mezclar contenido con estructura."
      />
      <section className="panel">
        <p>PENDING_CONTENT</p>
      </section>
    </>
  );
}
