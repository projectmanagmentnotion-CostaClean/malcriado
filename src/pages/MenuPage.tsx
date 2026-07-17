import { BookingCta } from "@/components/common/BookingCta";
import { SectionIntro } from "@/components/common/SectionIntro";
import { DishCard } from "@/components/food/DishCard";
import { MenuCategoryLink } from "@/components/food/MenuCategoryLink";
import { Container } from "@/components/layout/Container";
import { EditorialGrid } from "@/components/layout/EditorialGrid";
import { Frame } from "@/components/layout/Frame";
import { PageSeo } from "@/components/seo/PageSeo";
import {
  getFeaturedMenuItems,
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
        description={seoPage.metadata.description}
        path={seoPage.metadata.path}
        robots={seoPage.metadata.robots}
        structuredData={getRestaurantStructuredData(seoPage)}
        title={seoPage.metadata.title}
      />
      <SectionIntro
        body="Las categorias se publican desde el modelo editorial tipado. Precios, alergenos y descripciones finales siguen pendientes de validacion."
        eyebrow="Carta"
        title={menuContent.title}
      />
      <Container width="wide">
        <EditorialGrid columns={2}>
          <Frame tone="night">
            <p className="eyebrow">Categorias</p>
            {menuContent.categories.map((category) => (
              <MenuCategoryLink
                category={category}
                count={getMenuItemsByCategory(category.id).length}
                key={category.id}
              />
            ))}
          </Frame>
          <EditorialGrid columns={2}>
            {getFeaturedMenuItems()
              .slice(0, 2)
              .map((item) => (
                <DishCard item={item} key={item.id} />
              ))}
          </EditorialGrid>
        </EditorialGrid>
      </Container>
      <BookingCta />
    </>
  );
}
