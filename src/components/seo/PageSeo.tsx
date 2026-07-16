import { Helmet } from "react-helmet-async";
import { env } from "@/lib/env";

interface PageSeoProps {
  readonly title: string;
  readonly description: string;
  readonly path: string;
  readonly structuredData?: object;
}

export function PageSeo({
  title,
  description,
  path,
  structuredData,
}: PageSeoProps) {
  const canonicalUrl = new URL(path, env.VITE_PUBLIC_SITE_URL).toString();

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content="website" />
      {structuredData ? (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      ) : null}
    </Helmet>
  );
}
