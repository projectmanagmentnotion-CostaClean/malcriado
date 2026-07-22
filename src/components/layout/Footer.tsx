import { Link } from "react-router-dom";
import { Container } from "@/components/layout/Container";
import { OpeningHours } from "@/components/business/OpeningHours";
import { Button } from "@/components/ui/Button";
import { LinkButton } from "@/components/ui/LinkButton";
import { TextLink } from "@/components/ui/TextLink";
import {
  businessContent,
  footerNavigation,
  getEmailHref,
  getGoogleMapsHref,
  getFooterBusinessData,
  getReadableAddress,
  getTelephoneHref,
  getWhatsappHref,
  legalNavigation,
} from "@/content";
import { useConsent } from "@/features/consent";
import { buildBookingIntentHref } from "@/lib/booking/buildBookingIntentHref";

export function Footer() {
  const { openPreferences } = useConsent();
  const footerBusiness = getFooterBusinessData();
  const instagram = businessContent.contact.socials.find(
    (social) => social.platform === "instagram",
  );

  return (
    <Container as="footer" className="site-footer" width="wide">
      <div className="site-footer__grid">
        <div>
          <p className="eyebrow">{footerBusiness.name}</p>
          <p>{getReadableAddress()}</p>
          <OpeningHours compact />
          <p className="site-footer__note">
            Las solicitudes de mesa quedan sujetas a confirmacion del equipo.
          </p>
        </div>
        <div>
          {footerBusiness.phone ? (
            <a href={getTelephoneHref() ?? "#"}>{footerBusiness.phone}</a>
          ) : null}
          {footerBusiness.email ? (
            <a href={getEmailHref() ?? "#"}>{footerBusiness.email}</a>
          ) : null}
          {instagram?.href.value ? (
            <a href={instagram.href.value} rel="noreferrer" target="_blank">
              {instagram.label}
            </a>
          ) : null}
          {getWhatsappHref() ? (
            <a href={getWhatsappHref() ?? "#"} rel="noreferrer" target="_blank">
              WhatsApp
            </a>
          ) : null}
          {getGoogleMapsHref() ? (
            <a
              href={getGoogleMapsHref() ?? "#"}
              rel="noreferrer"
              target="_blank"
            >
              Ver en el mapa
            </a>
          ) : null}
        </div>
        <div>
          {footerNavigation.map((route) => (
            <Link key={route.id} to={route.path}>
              {route.label}
            </Link>
          ))}
        </div>
        <div>
          {legalNavigation.map((route) => (
            <Link key={route.id} to={route.path}>
              {route.label}
            </Link>
          ))}
        </div>
        <div className="site-footer__actions">
          <LinkButton
            size="sm"
            to={buildBookingIntentHref({ context: "footer" })}
            variant="primary"
          >
            Reservar
          </LinkButton>
          <TextLink to="/contacto/">Canales alternativos</TextLink>
          <TextLink to="/menu/#informacion-alergenos">Alérgenos</TextLink>
          <Button onClick={openPreferences} type="button" variant="ghost">
            Preferencias de cookies
          </Button>
        </div>
      </div>
    </Container>
  );
}
