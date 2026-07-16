import { businessIdentity } from "@/content/siteContent";
import { env } from "@/lib/env";

export function getRestaurantStructuredData(pagePath: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: businessIdentity.name,
    address: {
      "@type": "PostalAddress",
      streetAddress: businessIdentity.address,
      addressLocality: "Pineda de Mar",
      addressRegion: "Barcelona",
      postalCode: "08397",
      addressCountry: "ES",
    },
    telephone: businessIdentity.phone,
    email: businessIdentity.email,
    sameAs: [businessIdentity.instagramUrl],
    url: new URL(pagePath, env.VITE_PUBLIC_SITE_URL).toString(),
  };
}
