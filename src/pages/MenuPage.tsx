import { useMemo, useRef } from "react";
import { BookingCta } from "@/components/common/BookingCta";
import { AllergenStatus } from "@/components/food/AllergenStatus";
import { DietaryTags } from "@/components/food/DietaryTags";
import { PriceDisplay } from "@/components/food/PriceDisplay";
import { EditorialImage } from "@/components/media/EditorialImage";
import { PageSeo } from "@/components/seo/PageSeo";
import { LinkButton } from "@/components/ui/LinkButton";
import { getAsset, menuContent, seoPages } from "@/content";
import { buildBookingIntentHref } from "@/lib/booking/buildBookingIntentHref";
import {
  buildMenuCategoryId,
  buildMenuItemId,
  getMenuFeaturedItem,
  getPublicMenuCategories,
  getPublicMenuItemsForCategory,
  getRemainingMenuItems,
} from "@/lib/menu/menuPresentation";
import { buildPageSeoProps } from "@/lib/seo/pageSeoProps";
import { useReducedMotion } from "@/motion/hooks/useReducedMotion";
import { useMenuPageMotion } from "@/motion/menu/useMenuPageMotion";

const menuFallbackDescription =
  "Disponible en la carta de Malcriado. Consulta al equipo por ingredientes, precio y disponibilidad del momento.";

export function MenuPage() {
  const seoPage = seoPages.menu!;
  const rootRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const categories = useMemo(() => getPublicMenuCategories(), []);
  const totalItems = menuContent.items.length;
  const visualItems = menuContent.items.filter(
    (item) => item.media?.assetId,
  ).length;

  useMenuPageMotion({ reducedMotion, rootRef });

  return (
    <>
      <PageSeo {...buildPageSeoProps(seoPage)} />
      <div className="menu-page" ref={rootRef}>
        <section className="menu-hero" data-menu-motion="hero">
          <div className="menu-hero__media">
            <EditorialImage
              alt="Plato protagonista de la carta de Malcriado."
              asset={getAsset("asset-019")}
              crop="landscape"
              eager
              ratio="cinema"
              sizes="100vw"
            />
          </div>
          <div aria-hidden="true" className="menu-hero__veil" />
          <div className="container container--wide">
            <div className="menu-hero__grid">
              <header className="menu-hero__content">
                <p className="eyebrow" data-menu-reveal="true">
                  Carta
                </p>
                <h1
                  data-menu-reveal="true"
                  data-route-heading="true"
                  id="page-heading-menu"
                >
                  Carta Malcriado
                </h1>
                <p className="menu-hero__lede" data-menu-reveal="true">
                  Carta en HTML con platos, bebidas y postres para consultar
                  antes de reservar. Los importes mostrados incluyen IVA cuando
                  corresponda.
                </p>
                <div className="menu-hero__actions" data-menu-reveal="true">
                  <LinkButton
                    iconEnd="arrow-right"
                    to="#menu-navigation"
                    variant="editorial"
                  >
                    Explorar categorias
                  </LinkButton>
                  <LinkButton to="/contacto/" variant="secondary">
                    Consultar antes de venir
                  </LinkButton>
                </div>
              </header>
              <div className="menu-hero__summary" data-menu-reveal="true">
                <div>
                  <p className="eyebrow">Platos</p>
                  <strong>{totalItems}</strong>
                  <span>platos en la carta publica</span>
                </div>
                <div>
                  <p className="eyebrow">Categorias</p>
                  <strong>{categories.length}</strong>
                  <span>secciones para recorrer</span>
                </div>
                <div>
                  <p className="eyebrow">Visual</p>
                  <strong>{visualItems}</strong>
                  <span>platos con apoyo fotografico</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          className="menu-navigation"
          data-menu-motion="nav"
          id="menu-navigation"
        >
          <div className="container container--wide">
            <div className="menu-navigation__header" data-menu-reveal="true">
              <p className="eyebrow">Navegacion rapida</p>
              <p>
                La categoria Vermut volvera a mostrarse cuando tenga contenido
                util confirmado para la carta publica.
              </p>
            </div>
            <nav
              aria-label="Categorias de la carta"
              className="menu-navigation__rail"
            >
              {categories.map((category) => (
                <a
                  className="menu-navigation__chip"
                  data-menu-reveal="true"
                  href={`#${buildMenuCategoryId(category.slug)}`}
                  key={category.id}
                >
                  <span>{category.label}</span>
                  <small>
                    {getPublicMenuItemsForCategory(category.id).length} platos
                  </small>
                </a>
              ))}
            </nav>
          </div>
        </section>

        <div className="menu-sections">
          {categories.map((category, index) => {
            const items = getPublicMenuItemsForCategory(category.id);
            const featuredItem = getMenuFeaturedItem(items);
            const remainingItems = getRemainingMenuItems(items, featuredItem);
            const featuredAsset = featuredItem?.media?.assetId
              ? getAsset(featuredItem.media.assetId)
              : null;

            return (
              <section
                className={`menu-category${index % 2 === 1 ? " menu-category--reverse" : ""}`}
                data-menu-motion="category"
                id={buildMenuCategoryId(category.slug)}
                key={category.id}
              >
                <div className="container container--wide">
                  <div
                    className="menu-category__header"
                    data-menu-reveal="true"
                  >
                    <p className="eyebrow">
                      Capitulo {String(index + 1).padStart(2, "0")}
                    </p>
                    <h2>{category.label}</h2>
                    <p>
                      {category.description ??
                        "Platos y bebidas disponibles en la carta publica de Malcriado para consultar antes de reservar."}
                    </p>
                    <div className="menu-category__actions">
                      <LinkButton
                        to={buildBookingIntentHref({
                          context: "menu-category",
                          category: category.slug,
                        })}
                        variant="secondary"
                      >
                        Reservar con este contexto
                      </LinkButton>
                    </div>
                  </div>

                  <div className="menu-category__grid">
                    <article
                      className="menu-category__feature"
                      data-menu-reveal="true"
                    >
                      {featuredAsset ? (
                        <div className="menu-category__feature-media">
                          <EditorialImage
                            alt={
                              featuredItem?.media?.alt ??
                              featuredItem?.name ??
                              category.label
                            }
                            asset={featuredAsset}
                            crop={featuredItem?.media?.crop ?? "landscape"}
                            ratio="cinema"
                            sizes="(max-width: 900px) 100vw, 56vw"
                          />
                        </div>
                      ) : null}
                      {featuredItem ? (
                        <div
                          className="menu-category__feature-copy"
                          id={buildMenuItemId(featuredItem.id)}
                        >
                          <p className="eyebrow">Plato protagonista</p>
                          <h3>{featuredItem.name}</h3>
                          <p>
                            {featuredItem.description ??
                              menuFallbackDescription}
                          </p>
                          <div className="menu-category__feature-meta">
                            <PriceDisplay price={featuredItem.price} />
                            <DietaryTags tags={featuredItem.dietaryTags} />
                          </div>
                          <AllergenStatus
                            allergens={featuredItem.allergens}
                            status={featuredItem.allergenStatus}
                          />
                        </div>
                      ) : null}
                    </article>

                    <div
                      className="menu-category__list"
                      data-menu-reveal="true"
                    >
                      {remainingItems.map((item) => (
                        <article
                          className="menu-list-item"
                          id={buildMenuItemId(item.id)}
                          key={item.id}
                        >
                          <div className="menu-list-item__heading">
                            <h3>{item.name}</h3>
                            {item.subcategory ? (
                              <span>{item.subcategory}</span>
                            ) : null}
                          </div>
                          <p>{item.description ?? menuFallbackDescription}</p>
                          <div className="menu-list-item__meta">
                            <PriceDisplay price={item.price} />
                            <DietaryTags tags={item.dietaryTags} />
                          </div>
                          <AllergenStatus
                            allergens={item.allergens}
                            status={item.allergenStatus}
                          />
                        </article>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
            );
          })}
        </div>

        <section
          className="menu-notes"
          data-menu-motion="notes"
          id="informacion-alergenos"
        >
          <div className="container container--wide">
            <div className="menu-notes__grid">
              <div className="menu-note" data-menu-reveal="true">
                <p className="eyebrow">Precios</p>
                <h2>Precios claros en la carta</h2>
                <p>
                  Los importes se muestran en euros e incluyen IVA cuando
                  corresponda. Consulta al equipo ante cualquier duda.
                </p>
              </div>
              <div className="menu-note" data-menu-reveal="true">
                <p className="eyebrow">Alergenos</p>
                <h2>Informacion sobre alergenos</h2>
                <p>
                  ¿Tienes alguna alergia o intolerancia? Consulta con nuestro
                  equipo antes de realizar tu pedido.
                </p>
                <p>
                  Los 14 grupos son: gluten, crustaceos, huevos, pescado,
                  cacahuetes, soja, leche, frutos de cascara, apio, mostaza,
                  sesamo, sulfitos, altramuces y moluscos. No mostramos iconos
                  por plato hasta que la matriz haya sido validada.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
      <BookingCta />
    </>
  );
}
