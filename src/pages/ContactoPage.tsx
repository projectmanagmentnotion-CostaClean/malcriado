import { Container } from "@/components/layout/Container";
import { Frame } from "@/components/layout/Frame";
import { PageSeo } from "@/components/seo/PageSeo";
import {
  businessContent,
  getEmailHref,
  getReadableAddress,
  getRestaurantStructuredData,
  getTelephoneHref,
  getWhatsappHref,
  seoPages,
} from "@/content";

export function ContactoPage() {
  const seoPage = seoPages.contact!;

  return (
    <>
      <PageSeo
        description={seoPage.metadata.description}
        path={seoPage.metadata.path}
        robots={seoPage.metadata.robots}
        structuredData={getRestaurantStructuredData(seoPage)}
        title={seoPage.metadata.title}
      />
      <Container width="wide">
        <section className="split split--content-first">
          <header className="editorial-intro">
            <p className="eyebrow">Contacto</p>
            <h1>Direccion, canales y horario editorial</h1>
            <p>
              Esta ruta publica solo datos verificados. Horario diario y
              coordenadas siguen bloqueados hasta validacion del titular.
            </p>
          </header>
          <Frame>
            <dl className="contact-grid">
              <div>
                <dt>Direccion</dt>
                <dd>{getReadableAddress()}</dd>
              </div>
              <div>
                <dt>Telefono</dt>
                <dd>
                  <a href={getTelephoneHref() ?? "#"}>
                    {businessContent.contact.phone.value ?? "Pendiente"}
                  </a>
                </dd>
              </div>
              <div>
                <dt>Email</dt>
                <dd>
                  <a href={getEmailHref() ?? "#"}>
                    {businessContent.contact.email.value ?? "Pendiente"}
                  </a>
                </dd>
              </div>
              <div>
                <dt>WhatsApp</dt>
                <dd>
                  <a
                    href={getWhatsappHref() ?? "#"}
                    rel="noreferrer"
                    target="_blank"
                  >
                    Solicitar mesa
                  </a>
                </dd>
              </div>
              <div>
                <dt>Horario visible</dt>
                <dd>{businessContent.hours.summary.value ?? "Pendiente"}</dd>
              </div>
              <div>
                <dt>Estado del horario</dt>
                <dd>{businessContent.hours.summary.status}</dd>
              </div>
            </dl>
          </Frame>
        </section>
      </Container>
    </>
  );
}
