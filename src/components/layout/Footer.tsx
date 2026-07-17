import { Link } from "react-router-dom";
import {
  businessContent,
  footerNavigation,
  getEmailHref,
  getFooterBusinessData,
  getReadableAddress,
  getTelephoneHref,
  legalNavigation,
} from "@/content";

export function Footer() {
  const footerBusiness = getFooterBusinessData();
  const instagram = businessContent.contact.socials.find(
    (social) => social.platform === "instagram",
  );

  return (
    <footer className="site-footer">
      <div>
        <p className="eyebrow">{footerBusiness.name}</p>
        <p>{getReadableAddress()}</p>
        <p>{businessContent.hours.summary.value ?? "Horario pendiente"}</p>
      </div>
      <div>
        {footerBusiness.phone ? (
          <a href={getTelephoneHref() ?? "#"}>{footerBusiness.phone}</a>
        ) : null}
        {footerBusiness.email ? (
          <a href={getEmailHref() ?? "#"}>{footerBusiness.email}</a>
        ) : null}
        {instagram?.href.value ? (
          <a href={instagram.href.value} target="_blank" rel="noreferrer">
            {instagram.label}
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
    </footer>
  );
}
