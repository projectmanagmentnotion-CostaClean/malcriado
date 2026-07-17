import { Link } from "react-router-dom";
import { PageSeo } from "@/components/seo/PageSeo";
import { getRestaurantStructuredData, seoPages } from "@/content";

export function NotFoundPage() {
  const seoPage = seoPages.notFound!;

  return (
    <>
      <PageSeo
        title={seoPage.metadata.title}
        description={seoPage.metadata.description}
        path={seoPage.metadata.path}
        robots={seoPage.metadata.robots}
        structuredData={getRestaurantStructuredData(seoPage)}
      />
      <section className="legal-page">
        <h1>404</h1>
        <p>La ruta solicitada no existe.</p>
        <Link className="button button--primary" to="/">
          Volver al inicio
        </Link>
      </section>
    </>
  );
}
