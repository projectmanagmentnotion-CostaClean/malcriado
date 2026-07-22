import { Container } from "@/components/layout/Container";
import { PageSeo } from "@/components/seo/PageSeo";
import { LinkButton } from "@/components/ui/LinkButton";
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
            <h1 data-route-heading="true" id="page-heading-accesibilidad">
              Declaracion de accesibilidad
            </h1>
            <p>
              Esta declaracion describe el objetivo tecnico actual del proyecto,
              sus limitaciones conocidas y los puntos que siguen pendientes
              antes de una validacion manual final.
            </p>
          </header>
          <div className="legal-page__body">
            <p>
              La web se construye con objetivo tecnico minimo WCAG 2.2 AA,
              navegacion por teclado, foco visible, reflow a 200 %, reduced
              motion y HTML indexable sin depender de escenas inmersivas.
            </p>
            <p>
              Siguen pendientes la validacion final de contenidos legales,
              horarios, datos del titular y una revision manual definitiva
              previa a produccion.
            </p>
          </div>
          <section className="legal-page__section">
            <h2>Capacidades ya implementadas</h2>
            <ul>
              <li>Skip link y landmarks principales.</li>
              <li>
                Navegacion completa por teclado en menu movil, FAQ y
                formularios.
              </li>
              <li>
                Resumen de errores, foco al primer error y mensajes asociados en
                reserva.
              </li>
              <li>
                Respeto de reduced motion y reflow a 200 % en la matriz de QA
                del proyecto.
              </li>
            </ul>
          </section>
          <section className="legal-page__section">
            <h2>Limitaciones conocidas</h2>
            <ul>
              <li>Revision manual con lector de pantalla real pendiente.</li>
              <li>
                Datos legales y horarios definitivos pendientes del titular.
              </li>
              <li>
                Contenido externo como mapas embebidos sujeto a consentimiento y
                validacion.
              </li>
            </ul>
          </section>
          <section className="legal-page__actions">
            <LinkButton to="/contacto/" variant="editorial">
              Reportar una barrera
            </LinkButton>
          </section>
        </section>
      </Container>
    </>
  );
}
