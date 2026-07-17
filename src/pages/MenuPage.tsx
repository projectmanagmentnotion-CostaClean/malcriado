import { BookingCta } from "@/components/common/BookingCta";
import { SectionIntro } from "@/components/common/SectionIntro";
import { PageSeo } from "@/components/seo/PageSeo";
import {
  getMenuItemsByCategory,
  getRestaurantStructuredData,
  menuContent,
  seoPages,
} from "@/content";

export function MenuPage() {
  const seoPage = seoPages.menu!;

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
        eyebrow="Carta"
        title={menuContent.title}
        body="Las categorias se publican desde el modelo editorial tipado. Precios, alergenos y descripciones finales siguen pendientes de validacion."
      />
      <section className="cards-grid">
        {menuContent.categories.map((category) => (
          <article className="panel" key={category.slug}>
            <h2>{category.label}</h2>
            <p>{category.note ?? "Categoria activa en el modelo editorial."}</p>
            <p>
              {getMenuItemsByCategory(category.id).length} items auditados
              {category.publicationStatus !== "PUBLIC"
                ? ` · ${category.publicationStatus}`
                : ""}
            </p>
          </article>
        ))}
      </section>
      <BookingCta />
    </>
  );
}
