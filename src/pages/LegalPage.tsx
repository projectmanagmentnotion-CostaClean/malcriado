import { PageSeo } from "@/components/seo/PageSeo";
import {
  getLegalPageByPath,
  getRestaurantStructuredData,
  getSeoPageByPath,
} from "@/content";

interface LegalPageProps {
  readonly title: string;
  readonly path: string;
  readonly body: string;
}

export function LegalPage({ title, path, body }: LegalPageProps) {
  const seoPage = getSeoPageByPath(path);
  const legalPage = getLegalPageByPath(path);
  const structuredData = seoPage ? getRestaurantStructuredData(seoPage) : null;

  return (
    <>
      <PageSeo
        title={seoPage?.metadata.title ?? `${title} | Malcriado`}
        description={
          seoPage?.metadata.description ??
          `${title} provisional en espera de validacion juridica final.`
        }
        path={path}
        {...(seoPage?.metadata.robots
          ? { robots: seoPage.metadata.robots }
          : {})}
        {...(structuredData ? { structuredData } : {})}
      />
      <section className="legal-page">
        <h1>{title}</h1>
        <p>{body}</p>
        {legalPage?.summary ? <p>{legalPage.summary}</p> : null}
      </section>
    </>
  );
}
