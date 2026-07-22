import { Container } from "@/components/layout/Container";
import { PageSeo } from "@/components/seo/PageSeo";
import { Button } from "@/components/ui/Button";
import { buildPageSeoProps } from "@/lib/seo/pageSeoProps";
import {
  getLegalPageByPath,
  getPublicLegalIdentity,
  getSeoPageByPath,
} from "@/content";
import { useConsent } from "@/features/consent";

interface LegalPageProps {
  readonly title: string;
  readonly path: string;
  readonly body: string;
}

export function LegalPage({ title, path, body }: LegalPageProps) {
  const seoPage = getSeoPageByPath(path);
  const legalPage = getLegalPageByPath(path);
  const { openPreferences } = useConsent();
  const identity = getPublicLegalIdentity();

  return (
    <>
      <PageSeo
        {...(seoPage
          ? buildPageSeoProps(seoPage)
          : {
              title: `${title} | Malcriado`,
              description: `${title} informativo de Malcriado.`,
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
            <p>{legalPage?.intro ?? body}</p>
          </header>
          <div className="legal-page__body">
            <p>{body}</p>
            <p>Nombre comercial: {identity.tradeName}</p>
            {identity.contactEmail ? (
              <p>Contacto: {identity.contactEmail}</p>
            ) : null}
            {identity.contactPhone ? (
              <p>Telefono: {identity.contactPhone}</p>
            ) : null}
          </div>
          {legalPage?.sections?.map((section) => (
            <section className="legal-page__section" key={section.id}>
              <h2>{section.title}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              {section.items?.length ? (
                <ul>
                  {section.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}
          {path === "/cookies/" ? (
            <div className="legal-page__actions">
              <Button
                onClick={openPreferences}
                type="button"
                variant="editorial"
              >
                Cambiar preferencias de cookies
              </Button>
            </div>
          ) : null}
          {legalPage?.disclaimer ? (
            <p className="legal-page__disclaimer">{legalPage.disclaimer}</p>
          ) : null}
        </section>
      </Container>
    </>
  );
}
