import { BookingCta } from "@/components/common/BookingCta";
import { SectionIntro } from "@/components/common/SectionIntro";
import { PageSeo } from "@/components/seo/PageSeo";
import { menuCategories } from "@/content/siteContent";
import { getRestaurantStructuredData } from "@/content/structuredData";

export function MenuPage() {
  return (
    <>
      <PageSeo
        title="Carta | Malcriado"
        description="Categorias verificadas desde la auditoria base; precios y alergenos siguen pendientes."
        path="/menu/"
        structuredData={getRestaurantStructuredData("/menu/")}
      />
      <SectionIntro
        eyebrow="Carta"
        title="Carta HTML provisional"
        body="Las categorias estan preparadas para indexacion. Precios, alergenos y descripciones finales siguen pendientes de validacion."
      />
      <section className="cards-grid">
        {menuCategories.map((category) => (
          <article className="panel" key={category.slug}>
            <h2>{category.label}</h2>
            <p>{category.description}</p>
          </article>
        ))}
      </section>
      <BookingCta />
    </>
  );
}
