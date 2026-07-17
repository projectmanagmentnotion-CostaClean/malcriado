import { Container } from "@/components/layout/Container";
import { Link } from "react-router-dom";
import { PageSeo } from "@/components/seo/PageSeo";
import { LinkButton } from "@/components/ui/LinkButton";
import { seoPages } from "@/content";
import { buildPageSeoProps } from "@/lib/seo/pageSeoProps";

export function NotFoundPage() {
  const seoPage = seoPages.notFound!;

  return (
    <>
      <PageSeo {...buildPageSeoProps(seoPage)} />
      <Container width="wide">
        <section className="legal-page legal-page--editorial">
          <header className="editorial-intro">
            <p className="eyebrow">Ruta no encontrada</p>
            <h1 data-route-heading="true" id="page-heading-404">
              404
            </h1>
            <p>
              La ruta solicitada no existe dentro del recorrido publico de
              Malcriado.
            </p>
          </header>
          <div className="legal-page__body legal-page__body--actions">
            <LinkButton to="/" variant="editorial">
              Volver al inicio
            </LinkButton>
            <Link className="text-link" to="/menu/">
              Abrir carta
            </Link>
          </div>
        </section>
      </Container>
    </>
  );
}
