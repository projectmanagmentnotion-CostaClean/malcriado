import { Container } from "@/components/layout/Container";
import { PageSeo } from "@/components/seo/PageSeo";
import { LinkButton } from "@/components/ui/LinkButton";
import { TextLink } from "@/components/ui/TextLink";
import { buildPageSeoProps } from "@/lib/seo/pageSeoProps";
import {
  businessContent,
  getEmailHref,
  getGoogleMapsHref,
  getReadableAddress,
  getTelephoneHref,
  getWhatsappHref,
  seoPages,
} from "@/content";

export function ContactoPage() {
  const seoPage = seoPages.contact!;

  return (
    <>
      <PageSeo {...buildPageSeoProps(seoPage)} />
      <div className="contact-page">
        <section className="contact-hero">
          <Container width="wide">
            <div className="contact-hero__grid">
              <header className="contact-hero__content">
                <p className="eyebrow">Contacto</p>
                <h1 data-route-heading="true" id="page-heading-contacto">
                  Direccion, canales y horario editorial
                </h1>
                <p>
                  Esta ruta publica solo datos verificados. Horario diario y
                  coordenadas siguen bloqueados hasta validacion del titular.
                </p>
                <p>
                  El enlace de mapa usa la direccion postal auditada y evita
                  fijar coordenadas no confirmadas.
                </p>
                <div className="contact-hero__actions">
                  <LinkButton to="/reservar/" variant="editorial">
                    Ir a reserva
                  </LinkButton>
                  <LinkButton to="/menu/" variant="secondary">
                    Ver carta HTML
                  </LinkButton>
                </div>
              </header>
              <div className="contact-hero__summary">
                <p className="eyebrow">Canal directo</p>
                <strong>
                  {businessContent.contact.phone.value ?? "Pendiente"}
                </strong>
                <span>
                  Telefono y WhatsApp siguen siendo la via operativa mas
                  inmediata para cerrar la visita.
                </span>
              </div>
            </div>
          </Container>
        </section>

        <section className="contact-details">
          <Container width="wide">
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
                <dt>Mapa</dt>
                <dd>
                  {getGoogleMapsHref() ? (
                    <TextLink
                      href={getGoogleMapsHref() ?? "#"}
                      icon="external-link"
                      rel="noreferrer"
                      target="_blank"
                    >
                      Abrir ubicacion verificada
                    </TextLink>
                  ) : (
                    "Pendiente"
                  )}
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
          </Container>
        </section>
      </div>
    </>
  );
}
