import { Link } from "react-router-dom";
import { PageSeo } from "@/components/seo/PageSeo";

export function NotFoundPage() {
  return (
    <>
      <PageSeo
        title="404 | Malcriado"
        description="La ruta solicitada no existe en esta version provisional."
        path="/404"
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
