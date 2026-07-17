import { BookingCta } from "@/components/common/BookingCta";
import { Cluster } from "@/components/layout/Cluster";
import { Container } from "@/components/layout/Container";
import { EditorialGrid } from "@/components/layout/EditorialGrid";
import { Frame } from "@/components/layout/Frame";
import { Section } from "@/components/layout/Section";
import { DishFeature } from "@/components/food/DishFeature";
import { MenuCategoryLink } from "@/components/food/MenuCategoryLink";
import { EditorialImage } from "@/components/media/EditorialImage";
import { PageSeo } from "@/components/seo/PageSeo";
import { LinkButton } from "@/components/ui/LinkButton";
import { FullBleedMediaSection } from "@/sections/shared/FullBleedMediaSection";
import { StatementSection } from "@/sections/shared/StatementSection";
import {
  businessContent,
  getAsset,
  getFeaturedMenuItems,
  getMenuItemsByCategory,
  getRestaurantStructuredData,
  getTelephoneHref,
  getWhatsappHref,
  homeScenes,
  menuContent,
  seoPages,
} from "@/content";

export function HomePage() {
  const seoPage = seoPages.home!;
  const heroAsset = getAsset("asset-019");
  const seaAsset = getAsset("asset-013");
  const heroScene =
    homeScenes.find((scene) => scene.slug === "hero") ?? homeScenes[0]!;
  const featuredDish = getFeaturedMenuItems()[0]!;
  const address =
    businessContent.location.publicAddress.value ?? "Direccion pendiente";
  const phone = businessContent.contact.phone.value ?? "Telefono pendiente";

  return (
    <>
      <PageSeo
        description={seoPage.metadata.description}
        path={seoPage.metadata.path}
        robots={seoPage.metadata.robots}
        structuredData={getRestaurantStructuredData(seoPage)}
        title={seoPage.metadata.title}
      />
      <Section spacing="scene">
        <Container width="wide">
          <div className="hero-shell">
            <div className="hero-shell__content">
              <p className="eyebrow">
                {heroScene.content.eyebrow ?? "Pineda de Mar"}
              </p>
              <h1>{heroScene.content.heading}</h1>
              <p className="hero-shell__lede">{heroScene.content.copy}</p>
              <Cluster gap="sm">
                <LinkButton
                  iconEnd="arrow-right"
                  to="/reservar/"
                  variant="editorial"
                >
                  Reservar
                </LinkButton>
                <LinkButton
                  href={getWhatsappHref() ?? getTelephoneHref() ?? "/contacto/"}
                  variant="secondary"
                >
                  WhatsApp
                </LinkButton>
              </Cluster>
              <dl className="hero-shell__meta">
                <div>
                  <dt>Direccion</dt>
                  <dd>{address}</dd>
                </div>
                <div>
                  <dt>Telefono</dt>
                  <dd>{phone}</dd>
                </div>
                <div>
                  <dt>Horario</dt>
                  <dd>{businessContent.hours.summary.value ?? "Pendiente"}</dd>
                </div>
              </dl>
            </div>
            <EditorialImage
              asset={heroAsset}
              caption="Hero editorial sobre asset validado."
              crop="landscape"
              eager
              ratio="cinema"
              sizes="(max-width: 900px) 100vw, 50vw"
            />
          </div>
        </Container>
      </Section>
      <StatementSection
        eyebrow="Fusion"
        statement="La cocina y la noche deben sentirse intensas sin dejar de ser legibles, accesibles y utiles para reservar."
      />
      <Section>
        <Container width="wide">
          <EditorialGrid
            aria-label="Storyboard editorial de la home"
            columns={4}
          >
            {homeScenes.slice(2, 10).map((scene, index) => (
              <Frame
                key={scene.id}
                tone={
                  index % 3 === 0 ? "warm" : index % 3 === 1 ? "coast" : "night"
                }
              >
                <p className="eyebrow">{scene.content.eyebrow}</p>
                <h2>{scene.content.heading}</h2>
                <p>{scene.content.copy}</p>
              </Frame>
            ))}
          </EditorialGrid>
        </Container>
      </Section>
      <Section>
        <Container width="wide">
          <EditorialGrid columns={2}>
            <DishFeature item={featuredDish} />
            <Frame>
              <p className="eyebrow">Carta visual</p>
              <h2>
                Categorias preparadas para una navegacion gastronomica real.
              </h2>
              <p>
                Los estados pendientes siguen visibles y el sistema evita
                ocultar deuda editorial bajo componentes genericos.
              </p>
              <Cluster gap="sm">
                {menuContent.categories.slice(0, 4).map((category) => (
                  <MenuCategoryLink
                    category={category}
                    count={getMenuItemsByCategory(category.id).length}
                    key={category.id}
                  />
                ))}
              </Cluster>
            </Frame>
          </EditorialGrid>
        </Container>
      </Section>
      <FullBleedMediaSection
        body="La Fase 4 no desarrolla aun escenas GSAP complejas, pero ya deja preparados los bloques, ritmos y superficies de media que la home inmersiva utilizara despues."
        eyebrow="Costa"
        media={
          <EditorialImage
            asset={seaAsset}
            caption="Asset costero/nocturno para composicion de seccion."
            crop="landscape"
            ratio="cinema"
            sizes="100vw"
          />
        }
        title="Una respiracion costera entre producto, fuego y conversacion."
      />
      <BookingCta />
    </>
  );
}
