import { Helmet } from "react-helmet-async";
import { env } from "@/lib/env";

interface PageSeoProps {
  readonly title: string;
  readonly description: string;
  readonly path: string;
  readonly robots?: string;
  readonly language?: string;
  readonly openGraph?: {
    readonly title: string;
    readonly description: string;
    readonly type: "website";
    readonly image?: string | null;
  };
  readonly twitter?: {
    readonly card: "summary" | "summary_large_image";
    readonly title: string;
    readonly description: string;
    readonly image?: string | null;
  };
  readonly structuredData?: object | readonly object[];
}

export function PageSeo({
  title,
  description,
  path,
  robots,
  language = "es",
  openGraph,
  twitter,
  structuredData,
}: PageSeoProps) {
  const canonicalUrl = new URL(path, env.VITE_PUBLIC_SITE_URL).toString();
  const jsonLdEntries = structuredData
    ? Array.isArray(structuredData)
      ? structuredData
      : [structuredData]
    : [];

  return (
    <Helmet>
      <html lang={language} />
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />
      <meta property="og:title" content={openGraph?.title ?? title} />
      <meta
        property="og:description"
        content={openGraph?.description ?? description}
      />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content={openGraph?.type ?? "website"} />
      <meta property="og:locale" content="es_ES" />
      {openGraph?.image ? (
        <meta property="og:image" content={openGraph.image} />
      ) : null}
      <meta
        name="twitter:card"
        content={twitter?.card ?? "summary_large_image"}
      />
      <meta name="twitter:title" content={twitter?.title ?? title} />
      <meta
        name="twitter:description"
        content={twitter?.description ?? description}
      />
      {twitter?.image ? (
        <meta name="twitter:image" content={twitter.image} />
      ) : null}
      {robots ? <meta name="robots" content={robots} /> : null}
      {jsonLdEntries.map((entry, index) => (
        <script key={`${canonicalUrl}-${index}`} type="application/ld+json">
          {JSON.stringify(entry)}
        </script>
      ))}
    </Helmet>
  );
}
