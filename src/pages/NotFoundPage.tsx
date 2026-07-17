import { Link } from "react-router-dom";
import { PageSeo } from "@/components/seo/PageSeo";
import { seoPages } from "@/content";
import { buildPageSeoProps } from "@/lib/seo/pageSeoProps";

export function NotFoundPage() {
  const seoPage = seoPages.notFound!;

  return (
    <>
      <PageSeo {...buildPageSeoProps(seoPage)} />
      <section className="legal-page">
        <h1 data-route-heading="true" id="page-heading-404">
          404
        </h1>
        <p>La ruta solicitada no existe.</p>
        <Link className="button button--primary" to="/">
          Volver al inicio
        </Link>
      </section>
    </>
  );
}
