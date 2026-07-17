import { PageSeo } from "@/components/seo/PageSeo";
import { buildPageSeoProps } from "@/lib/seo/pageSeoProps";
import { getLegalPageByPath, getSeoPageByPath } from "@/content";

interface LegalPageProps {
  readonly title: string;
  readonly path: string;
  readonly body: string;
}

export function LegalPage({ title, path, body }: LegalPageProps) {
  const seoPage = getSeoPageByPath(path);
  const legalPage = getLegalPageByPath(path);

  return (
    <>
      <PageSeo
        {...(seoPage
          ? buildPageSeoProps(seoPage)
          : {
              title: `${title} | Malcriado`,
              description: `${title} provisional en espera de validacion juridica final.`,
              path,
            })}
      />
      <section className="legal-page">
        <h1 data-route-heading="true" id="page-heading-legal">
          {title}
        </h1>
        <p>{body}</p>
        {legalPage?.summary ? <p>{legalPage.summary}</p> : null}
      </section>
    </>
  );
}
