import { PageSeo } from "@/components/seo/PageSeo";
import { Container } from "@/components/layout/Container";
import { seoPages } from "@/content";
import { buildPageSeoProps } from "@/lib/seo/pageSeoProps";

export function DeclaracionAccesibilidadPage() {
  const seoPage = seoPages.accessibility!;

  return (
    <>
      <PageSeo {...buildPageSeoProps(seoPage)} />
      <Container width="wide">
        <section className="legal-page legal-page--editorial">
          <header className="editorial-intro">
            <p className="eyebrow">Accesibilidad</p>
            <h1 data-route-heading id="page-heading-accesibilidad">
              Declaracion de accesibilidad provisional
            </h1>
            <p>
              Esta declaracion describe el objetivo tecnico actual del proyecto
              y las limitaciones conocidas. No afirma una auditoria legal final
              cerrada.
            </p>
          </header>
          <div className="legal-page__body">
            <p>
              La web se esta construyendo con objetivo minimo WCAG 2.2 AA,
              navegacion por teclado, foco visible, reflow a 200 %, reduced
              motion y HTML indexable sin depender de escenas inmersivas.
            </p>
            <p>
              Siguen pendientes la validacion final de contenidos legales,
              horarios, datos del titular y una revision manual definitiva
              previa a produccion.
            </p>
            <p>
              Si detectas una barrera de acceso, utiliza los canales publicados
              en la ruta de contacto para reportarla.
            </p>
          </div>
        </section>
      </Container>
    </>
  );
}
