import { businessContent } from "@/content/business/business";
import type { LocalSeoPage } from "@/types/content";

export function getRestaurantStructuredData(page: LocalSeoPage) {
  const canonicalBase = businessContent.contact.canonicalUrl.value ?? "https://malcriadobcn.com/";
  return {
    "@context": "https://schema.org",
    "@type": "Restaurant",
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
    url: new URL(page.metadata.canonicalPath, canonicalBase).toString(),
  };
}
