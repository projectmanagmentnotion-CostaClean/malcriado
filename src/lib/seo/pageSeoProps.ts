import type { LocalSeoPage } from "@/types/content";
import {
  getSeoImageUrl,
  getStructuredDataForPage,
} from "@/content/seo/structuredData";

export function buildPageSeoProps(page: LocalSeoPage) {
  return {
    title: page.metadata.title,
    description: page.metadata.description,
    path: page.metadata.path,
    robots: page.metadata.robots,
    language: page.metadata.language ?? "es",
    openGraph: {
      title: page.metadata.openGraph.title,
      description: page.metadata.openGraph.description,
      type: page.metadata.openGraph.type,
      image: getSeoImageUrl(page.metadata.openGraph.imageAssetId),
    },
    structuredData: getStructuredDataForPage(page),
    ...(page.metadata.twitter
      ? {
          twitter: {
            card: page.metadata.twitter.card,
            title: page.metadata.twitter.title,
            description: page.metadata.twitter.description,
            image: getSeoImageUrl(page.metadata.twitter.imageAssetId),
          },
        }
      : {}),
  } as const;
}
