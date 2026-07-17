import { DevNavigation } from "@/components/layout/DevNavigation";
import { Container } from "@/components/layout/Container";
import { EditorialGrid } from "@/components/layout/EditorialGrid";
import { Frame } from "@/components/layout/Frame";
import { Section } from "@/components/layout/Section";
import { Cluster } from "@/components/layout/Cluster";
import { FormField } from "@/components/forms/FormField";
import { TextInput } from "@/components/forms/TextInput";
import { Select } from "@/components/forms/Select";
import { TextArea } from "@/components/forms/TextArea";
import { Checkbox } from "@/components/forms/Checkbox";
import { DateInput } from "@/components/forms/DateInput";
import { TimeInput } from "@/components/forms/TimeInput";
import { DishCard } from "@/components/food/DishCard";
import { DishFeature } from "@/components/food/DishFeature";
import { MenuCategoryLink } from "@/components/food/MenuCategoryLink";
import { EditorialImage } from "@/components/media/EditorialImage";
import { OfferFeature } from "@/components/offers/OfferFeature";
import { PageSeo } from "@/components/seo/PageSeo";
import { EmptyState } from "@/components/ui/EmptyState";
import { ErrorState } from "@/components/ui/ErrorState";
import { Icon } from "@/components/ui/Icon";
import { IconButton } from "@/components/ui/IconButton";
import { LinkButton } from "@/components/ui/LinkButton";
import { LoadingState } from "@/components/ui/LoadingState";
import { StatusMessage } from "@/components/ui/StatusMessage";
import { TextLink } from "@/components/ui/TextLink";
import {
  getAsset,
  getFeaturedMenuItems,
  getMenuItemsByCategory,
  menuContent,
  offerEditorialState,
  offers,
  seoPages,
} from "@/content";

const colorTokens = [
  "bg-base",
  "bg-elevated",
  "bg-editorial",
  "fg-base",
  "fg-muted",
  "accent-primary",
  "accent-secondary",
  "surface-warm",
  "surface-night",
  "surface-coast",
] as const;

export function DevDesignSystemPage() {
  const seoPage = seoPages.devDesignSystem!;
  const featuredItems = getFeaturedMenuItems();
  const firstCategory = menuContent.categories[0]!;
  const firstDish = featuredItems[0]!;
  const secondDish = featuredItems[1] ?? featuredItems[0]!;
  const heroAsset = getAsset("asset-019");

  return (
    <>
      <PageSeo
        title={seoPage.metadata.title}
        description={seoPage.metadata.description}
        path={seoPage.metadata.path}
        robots={seoPage.metadata.robots}
      />
      <Section spacing="compact">
        <Container width="wide">
          <DevNavigation />
        </Container>
      </Section>
      <Section spacing="spacious" tone="editorial">
        <Container width="editorial">
          <div className="editorial-intro">
            <p className="eyebrow">Dev only</p>
            <h1>Catalogo interno del sistema de diseno</h1>
            <p>
              Ruta interna para revisar tokens, componentes, contraste,
              tipografia, estados pending y comportamiento responsive sin usar
              contenido publico inventado.
            </p>
          </div>
        </Container>
      </Section>
      <Section>
        <Container width="wide">
          <h2>Paleta</h2>
          <EditorialGrid columns={4}>
            {colorTokens.map((token) => (
              <Frame className="token-swatch" key={token}>
                <div
                  className="token-swatch__chip"
                  style={{ background: `var(--color-${token})` }}
                />
                <p>{token}</p>
              </Frame>
            ))}
          </EditorialGrid>
        </Container>
      </Section>
      <Section>
        <Container width="wide">
          <h2>Tipografia y acciones</h2>
          <EditorialGrid columns={2}>
            <Frame>
              <p className="eyebrow">Display</p>
              <h1 className="display-sample">
                Costa, fuego y deseo gastronomico.
              </h1>
              <p className="type-note">
                Bodoni Moda Variable para display editorial.
              </p>
            </Frame>
            <Frame>
              <p className="eyebrow">Body</p>
              <p className="body-sample">
                Manrope Variable para navegacion, lectura, formularios y
                estados.
              </p>
              <Cluster gap="sm">
                <LinkButton
                  to="/reservar/"
                  variant="primary"
                  iconEnd="arrow-right"
                >
                  CTA principal
                </LinkButton>
                <LinkButton to="/menu/" variant="secondary">
                  CTA secundario
                </LinkButton>
                <IconButton icon="menu" label="Abrir menu" />
                <TextLink icon="external-link" href="/contacto/">
                  Enlace textual
                </TextLink>
              </Cluster>
            </Frame>
          </EditorialGrid>
        </Container>
      </Section>
      <Section>
        <Container width="wide">
          <h2>Media y comida</h2>
          <EditorialGrid columns={2}>
            <EditorialImage
              asset={heroAsset}
              crop="landscape"
              ratio="cinema"
              sizes="(max-width: 1024px) 100vw, 50vw"
              caption="Hero editorial derivado del asset auditado."
            />
            <DishFeature item={firstDish} />
          </EditorialGrid>
          <EditorialGrid columns={3}>
            <DishCard item={firstDish} />
            <DishCard item={secondDish} />
            <Frame>
              <p className="eyebrow">Categoria</p>
              <MenuCategoryLink
                category={firstCategory}
                count={getMenuItemsByCategory(firstCategory.id).length}
              />
            </Frame>
          </EditorialGrid>
        </Container>
      </Section>
      <Section>
        <Container width="wide">
          <h2>Ofertas y estados</h2>
          <EditorialGrid columns={2}>
            <OfferFeature
              offer={offers[0] ?? null}
              pendingMessage={offerEditorialState.message}
            />
            <Frame>
              <StatusMessage title="Contenido pendiente" tone="pending">
                <p>
                  Precios, alergenos y legales siguen visibles como deuda real.
                </p>
              </StatusMessage>
              <LoadingState />
              <EmptyState
                title="Sin oferta activa"
                body="No se renderiza ninguna promocion sin vigencia verificada."
              />
              <ErrorState body="Ejemplo de feedback de error para QA visual." />
            </Frame>
          </EditorialGrid>
        </Container>
      </Section>
      <Section>
        <Container width="wide">
          <h2>Formulario base</h2>
          <Frame className="form-demo">
            <FormField
              label="Nombre"
              htmlFor="dev-name"
              description="Campo base con label visible y descripcion asociada."
              required
            >
              <TextInput
                id="dev-name"
                name="name"
                placeholder="Nombre y apellidos"
                required
              />
            </FormField>
            <FormField label="Fecha" htmlFor="dev-date" required>
              <DateInput id="dev-date" name="date" required />
            </FormField>
            <FormField label="Hora" htmlFor="dev-time" required>
              <TimeInput id="dev-time" name="time" required />
            </FormField>
            <FormField
              label="Comensales"
              htmlFor="dev-guests"
              description="Select base preparado para touch y teclado."
            >
              <Select id="dev-guests" name="guests" defaultValue="2">
                <option value="2">2 personas</option>
                <option value="4">4 personas</option>
                <option value="6">6 personas</option>
              </Select>
            </FormField>
            <FormField label="Notas" htmlFor="dev-notes">
              <TextArea id="dev-notes" name="notes" rows={4} />
            </FormField>
            <Checkbox
              label="He leido la informacion de privacidad de desarrollo."
              name="privacy"
            />
          </Frame>
        </Container>
      </Section>
      <Section>
        <Container width="wide">
          <h2>Iconos y contraste</h2>
          <Frame>
            <Cluster gap="md">
              {(
                [
                  "menu",
                  "close",
                  "phone",
                  "email",
                  "location",
                  "instagram",
                  "whatsapp",
                  "calendar",
                  "guests",
                  "clock",
                  "accessibility",
                ] as const
              ).map((icon) => (
                <span className="icon-sample" key={icon}>
                  <Icon
                    aria-hidden="true"
                    className="icon-sample__svg"
                    name={icon}
                  />
                  <span>{icon}</span>
                </span>
              ))}
            </Cluster>
          </Frame>
        </Container>
      </Section>
    </>
  );
}
