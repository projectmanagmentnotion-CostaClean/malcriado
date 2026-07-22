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
              Esta declaracion resume el estado tecnico actual de la web y las
              mejoras que siguen en curso antes de la revision manual final.
            </p>
          </header>
          <div className="legal-page__body">
            <p>
              La web se construye con objetivo minimo WCAG 2.2 AA, navegacion
              por teclado, foco visible, reflow a 200 %, reduced motion y HTML
              indexable.
            </p>
            <p>
              Seguimos revisando algunos contenidos legales y una pasada manual
              final con lector de pantalla para cerrar la validacion completa.
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
                Reduced motion y reflow a 200 % dentro de la matriz de QA.
              </li>
            </ul>
          </section>
          <section className="legal-page__section">
            <h2>Limitaciones conocidas</h2>
            <ul>
              <li>Revision manual con lector de pantalla real en curso.</li>
              <li>Algunos datos legales y horarios siguen en validacion.</li>
              <li>
                El mapa embebido depende del consentimiento para contenido
                externo.
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
