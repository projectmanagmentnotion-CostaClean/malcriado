import { PageSeo } from "@/components/seo/PageSeo";
import { LinkButton } from "@/components/ui/LinkButton";
import { TextLink } from "@/components/ui/TextLink";
import { ConsentManagedMap } from "@/features/consent";
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
  const googleMapsHref = getGoogleMapsHref();

  return (
    <>
      <PageSeo {...buildPageSeoProps(seoPage)} />
      <div className="contact-page">
        <section className="contact-hero">
          <div className="container container--wide">
            <div className="contact-hero__grid">
              <header className="contact-hero__content">
                <p className="eyebrow">Contacto</p>
                <h1 data-route-heading="true" id="page-heading-contacto">
                  Contacto, ubicacion y llegada
                </h1>
                <p>
                  Esta ruta publica solo datos verificados y mantiene visibles
                  las deudas reales: horario diario, coordenadas exactas y
                  cualquier detalle operativo que todavia necesite validacion
                  del titular.
                </p>
                <div className="contact-hero__actions">
                  <LinkButton to="/reservar/" variant="editorial">
                    Ir a reserva
                  </LinkButton>
                  <LinkButton to="/faq/" variant="secondary">
                    Ver FAQ
                  </LinkButton>
                </div>
              </header>
              <div className="contact-hero__summary">
                <p className="eyebrow">Canal directo</p>
                <strong>
                  {businessContent.contact.phone.value ?? "Pendiente"}
                </strong>
                <span>
                  Telefono y WhatsApp siguen siendo la via mas inmediata para
                  cerrar una visita mientras la confirmacion de reservas sigue
                  siendo manual.
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="contact-details">
          <div className="container container--wide">
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
                  {googleMapsHref ? (
                    <TextLink
                      href={googleMapsHref}
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
          </div>
        </section>

        <section className="contact-directions">
          <div className="container container--wide">
            <div className="contact-directions__grid">
              <div className="contact-directions__copy">
                <p className="eyebrow">Como llegar</p>
                <h2>Ubicacion publica con mapa bajo consentimiento</h2>
                <p>
                  La direccion postal si esta verificada. En cambio, las
                  coordenadas exactas y cualquier proveedor embebido siguen
                  sujetos a validacion y consentimiento.
                </p>
                <ul className="contact-directions__list">
                  <li>Direccion visible: {getReadableAddress()}</li>
                  <li>Coordenadas exactas: PENDING_VALIDATION.</li>
                  <li>
                    Mapa interactivo: bloqueado hasta consentimiento para
                    contenido externo.
                  </li>
                </ul>
                <div className="contact-directions__actions">
                  {googleMapsHref ? (
                    <LinkButton
                      href={googleMapsHref}
                      rel="noreferrer"
                      target="_blank"
                      variant="editorial"
                    >
                      Abrir ruta externa
                    </LinkButton>
                  ) : null}
                  <LinkButton to="/cookies/" variant="ghost">
                    Ver cookies
                  </LinkButton>
                </div>
              </div>
              <ConsentManagedMap />
            </div>
          </div>
        </section>

        <section className="contact-editorial-note">
          <div className="container container--wide">
            <div className="contact-editorial-note__grid">
              <div>
                <p className="eyebrow">Dato pendiente</p>
                <h2>Horario diario y accesos finos siguen fuera de cierre</h2>
              </div>
              <p>
                Mientras el titular no confirme horario por dia, accesibilidad
                fisica del local y otros detalles operativos, esta web no los
                presenta como hechos cerrados. La ruta mantiene la llamada a la
                accion sin ocultar esa deuda.
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
