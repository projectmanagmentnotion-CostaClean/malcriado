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
                  Contacto y como llegar a Malcriado en Pineda de Mar
                </h1>
                <p>
                  Reserva por formulario, telefono o WhatsApp y encuentra la
                  direccion para llegar frente al mar sin perder tiempo.
                </p>
                <div className="contact-hero__actions">
                  <LinkButton to="/reservar/" variant="editorial">
                    Reservar ahora
                  </LinkButton>
                  <LinkButton to="/faq/" variant="secondary">
                    Ver FAQ
                  </LinkButton>
                </div>
              </header>
              <div className="contact-hero__summary">
                <p className="eyebrow">Canal directo</p>
                <strong>
                  {businessContent.contact.phone.value ?? "Llamanos"}
                </strong>
                <span>
                  Telefono y WhatsApp siguen siendo la via mas rapida para una
                  reserva del dia o una consulta rapida.
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
                    {businessContent.contact.phone.value ?? "Llamanos"}
                  </a>
                </dd>
              </div>
              <div>
                <dt>Email</dt>
                <dd>
                  <a href={getEmailHref() ?? "#"}>
                    {businessContent.contact.email.value ?? "Escribenos"}
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
                    Abrir WhatsApp
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
                      Abrir ubicacion en Google Maps
                    </TextLink>
                  ) : (
                    "Disponible en breve"
                  )}
                </dd>
              </div>
              <div>
                <dt>Horario visible</dt>
                <dd>{businessContent.hours.summary.value ?? "Consultar"}</dd>
              </div>
            </dl>
          </div>
        </section>

        <section className="contact-directions">
          <div className="container container--wide">
            <div className="contact-directions__grid">
              <div className="contact-directions__copy">
                <p className="eyebrow">Como llegar</p>
                <h2>Llega desde el paseo maritimo o abre la ruta en el mapa</h2>
                <p>
                  La direccion publica ya esta disponible. Si prefieres ver la
                  ruta en Google Maps, puedes abrirla directamente o activar el
                  mapa interactivo cuando aceptes contenido externo.
                </p>
                <ul className="contact-directions__list">
                  <li>Direccion visible: {getReadableAddress()}</li>
                  <li>Ruta externa disponible en Google Maps.</li>
                  <li>
                    El mapa interactivo solo se carga si aceptas contenido
                    externo.
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
                    Ver preferencias de cookies
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
                <p className="eyebrow">Antes de venir</p>
                <h2>El horario diario se esta terminando de confirmar</h2>
              </div>
              <p>
                Publicamos el horario general ya visible y mantenemos abiertos
                telefono, email y WhatsApp para confirmar dudas antes de tu
                visita.
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
