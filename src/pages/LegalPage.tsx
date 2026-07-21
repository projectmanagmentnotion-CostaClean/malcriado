import { Container } from "@/components/layout/Container";
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
      <Container width="wide">
        <section className="legal-page legal-page--editorial">
          <header className="editorial-intro">
            <p className="eyebrow">Legal</p>
            <h1 data-route-heading="true" id="page-heading-legal">
              {title}
            </h1>
            <p>{body}</p>
          </header>
          {legalPage?.summary ? (
            <div className="legal-page__body">
              <p>{legalPage.summary}</p>
            </div>
          ) : null}
        </section>
      </Container>
    </>
  );
}
