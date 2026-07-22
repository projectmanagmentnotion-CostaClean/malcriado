import { getAssetFallback } from "@/content/assets/assetSelectors";
import { businessContent } from "@/content/business/business";
import { faqEntries } from "@/content/faq/faq";
import { menuContent } from "@/content/menu/menu";
import { getActiveOffers } from "@/content/offers/offerSelectors";
import { offers } from "@/content/offers/offers";
import {
  buildMenuCategoryId,
  buildMenuItemId,
} from "@/lib/menu/menuPresentation";
import type { LocalSeoPage } from "@/types/content";
import { getCanonicalSiteUrl } from "../business/business";

function getCanonicalUrl(path: string) {
  return new URL(path, getCanonicalSiteUrl()).toString();
}

export function getSeoImageUrl(assetId: string | null) {
  if (!assetId) {
    return null;
  }

  const fallback = getAssetFallback(assetId, "landscape");
  if (!fallback) {
    return null;
  }

  return new URL(fallback.path, getCanonicalSiteUrl()).toString();
}

function getOrganizationBase() {
  return {
    name: businessContent.identity.commercialName.value,
    description: businessContent.identity.shortDescription.value,
    address: {
      "@type": "PostalAddress",
      streetAddress: businessContent.location.publicAddress.value,
      addressLocality: businessContent.location.locality.value,
      addressRegion: businessContent.location.province.value,
      postalCode: businessContent.location.postalCode.value,
      addressCountry: "ES",
    },
    telephone: businessContent.contact.phone.value,
    email: businessContent.contact.email.value,
    sameAs: businessContent.contact.socials
      .map((link) => link.href.value)
      .filter((href): href is string => Boolean(href)),
  };
}

export function getRestaurantStructuredData(page: LocalSeoPage) {
  return {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    ...getOrganizationBase(),
    url: getCanonicalUrl(page.metadata.canonicalPath),
  };
}

function getWebsiteStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: businessContent.identity.seoName.value,
    url: getCanonicalUrl("/"),
    inLanguage: "es",
  };
}

function getPageStructuredData(page: LocalSeoPage) {
  return {
    "@context": "https://schema.org",
    "@type": page.metadata.structuredData.type,
    name: page.metadata.title,
    description: page.metadata.description,
    url: getCanonicalUrl(page.metadata.canonicalPath),
    inLanguage: page.metadata.language ?? "es",
  };
}

function getBreadcrumbStructuredData(page: LocalSeoPage) {
  const itemListElement = [
    {
      "@type": "ListItem",
      position: 1,
      name: "Inicio",
      item: getCanonicalUrl("/"),
    },
  ];

  if (page.metadata.path !== "/") {
    itemListElement.push({
      "@type": "ListItem",
      position: 2,
      name: page.metadata.breadcrumbLabel ?? page.metadata.title,
      item: getCanonicalUrl(page.metadata.canonicalPath),
    });
  }

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement,
  };
}

function getMenuStructuredData() {
  const publicCategories = menuContent.categories.filter(
    (category) =>
      category.publicationStatus === "PUBLIC" &&
      menuContent.items.some((item) => item.categoryId === category.id),
  );

  return {
    "@context": "https://schema.org",
    "@type": "Menu",
    name: menuContent.title,
    inLanguage: "es",
    url: getCanonicalUrl("/menu/"),
    hasMenuSection: publicCategories.map((category) => ({
      "@type": "MenuSection",
      name: category.label,
      url: getCanonicalUrl(`/menu/#${buildMenuCategoryId(category.slug)}`),
      hasMenuItem: menuContent.items
        .filter((item) => item.categoryId === category.id)
        .filter((item) => item.publicationStatus !== "UNAVAILABLE")
        .map((item) => {
          const image = item.media?.assetId
            ? getSeoImageUrl(item.media.assetId)
            : null;

          return {
            "@type": "MenuItem",
            name: item.name,
            description:
              item.description ??
              "Entrada auditada de la carta actual con precio o alergenos pendientes de validacion.",
            url: getCanonicalUrl(`/menu/#${buildMenuItemId(item.id)}`),
            ...(image ? { image } : {}),
          };
        }),
    })),
  };
}

function getOfferStructuredData(now = new Date()) {
  return getActiveOffers(offers, now).map((offer) => {
    const image = offer.assetId ? getSeoImageUrl(offer.assetId) : null;
    return {
      "@context": "https://schema.org",
      "@type": "Offer",
      name: offer.title,
      description: offer.description ?? offer.fallbackContent ?? offer.title,
      url: getCanonicalUrl("/especiales/"),
      ...(offer.validity.startsAt
        ? { availabilityStarts: offer.validity.startsAt }
        : {}),
      ...(offer.validity.endsAt
        ? { availabilityEnds: offer.validity.endsAt }
        : {}),
      ...(image ? { image } : {}),
    };
  });
}

function getFaqStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqEntries.map((entry) => ({
      "@type": "Question",
      name: entry.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: entry.answer,
      },
    })),
  };
}

export function getStructuredDataForPage(page: LocalSeoPage) {
  const entries: object[] = [getPageStructuredData(page)];

  if (page.metadata.path === "/") {
    entries.unshift(
      getWebsiteStructuredData(),
      getRestaurantStructuredData(page),
    );
  }

  if (
    page.metadata.structuredData.type === "ContactPage" ||
    page.metadata.structuredData.type === "AboutPage"
  ) {
    entries.unshift(getRestaurantStructuredData(page));
  }

  if (page.metadata.structuredData.includeBreadcrumbs !== false) {
    entries.push(getBreadcrumbStructuredData(page));
  }

  if (page.metadata.structuredData.includeMenu) {
    entries.push(getMenuStructuredData());
  }

  if (page.metadata.structuredData.includeOffers) {
    entries.push(...getOfferStructuredData());
  }

  if (page.metadata.structuredData.includeFaq) {
    entries.push(getFaqStructuredData());
  }

  return entries;
}
