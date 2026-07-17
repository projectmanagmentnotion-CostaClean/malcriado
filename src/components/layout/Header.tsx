import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import type { HeaderDensity, HeaderTheme } from "@/app/shell/routeHandles";
import { Cluster } from "@/components/layout/Cluster";
import { Container } from "@/components/layout/Container";
import { ResponsiveImage } from "@/components/media/ResponsiveImage";
import { IconButton } from "@/components/ui/IconButton";
import { LinkButton } from "@/components/ui/LinkButton";
import { TextLink } from "@/components/ui/TextLink";
import {
  businessContent,
  getAsset,
  getTelephoneHref,
  getWhatsappHref,
} from "@/content";
import { buildBookingIntentHref } from "@/lib/booking/buildBookingIntentHref";
import { siteRoutes } from "@/lib/routes";

interface HeaderProps {
  readonly theme?: HeaderTheme;
  readonly density?: HeaderDensity;
  readonly hideBookingCta?: boolean;
}

export function Header({
  theme = "dark",
  density = "default",
  hideBookingCta = false,
}: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const logoAsset = getAsset("asset-002");
  const whatsappHref = getWhatsappHref();
  const phoneHref = getTelephoneHref();

  useEffect(() => {
    if (!mobileOpen) {
      return;
    }

    const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
      "a[href], button:not([disabled])",
    );
    focusable?.[0]?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileOpen(false);
        return;
      }

      if (event.key !== "Tab" || !focusable || focusable.length === 0) {
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };

    document.body.classList.add("has-mobile-nav");
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.classList.remove("has-mobile-nav");
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [mobileOpen]);

  useEffect(() => {
    if (!mobileOpen) {
      buttonRef.current?.focus();
    }
  }, [mobileOpen]);

  return (
    <header
      className="site-header"
      data-density={mobileOpen ? "default" : density}
      data-menu-open={mobileOpen ? "true" : "false"}
      data-theme={theme}
    >
      <Container width="wide">
        <div className="site-header__shell">
          <div className="site-header__inner">
            <NavLink aria-label="Malcriado BCN" className="brand-mark" to="/">
              <ResponsiveImage
                alt="Malcriado"
                asset={logoAsset}
                crop="original"
                eager
                sizes="220px"
              />
            </NavLink>
            <nav className="desktop-nav" aria-label="Principal">
              <ul>
                {siteRoutes.map((route) => (
                  <li key={route.path}>
                    <NavLink to={route.path}>{route.label}</NavLink>
                  </li>
                ))}
              </ul>
            </nav>
            {hideBookingCta ? null : (
              <LinkButton
                className="desktop-cta"
                iconEnd="arrow-right"
                to={buildBookingIntentHref({ context: "header" })}
                variant="editorial"
              >
                Reservar mesa
              </LinkButton>
            )}
            <IconButton
              ref={buttonRef}
              aria-controls="mobile-navigation"
              aria-expanded={mobileOpen}
              className="mobile-nav-toggle"
              icon={mobileOpen ? "close" : "menu"}
              label={mobileOpen ? "Cerrar menu" : "Abrir menu"}
              onClick={() => setMobileOpen((value) => !value)}
            />
          </div>
        </div>
      </Container>
      {mobileOpen ? (
        <Container width="wide">
          <div
            ref={dialogRef}
            aria-label="Menu movil"
            className="mobile-nav-panel"
            id="mobile-navigation"
            role="dialog"
          >
            <nav aria-label="Principal movil">
              <ul>
                {siteRoutes.map((route) => (
                  <li key={route.path}>
                    <NavLink
                      to={route.path}
                      onClick={() => setMobileOpen(false)}
                    >
                      {route.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>
            <Cluster gap="sm">
              <LinkButton
                iconEnd="arrow-right"
                to={buildBookingIntentHref({ context: "mobile-nav" })}
                variant="editorial"
              >
                Reservar mesa
              </LinkButton>
              {whatsappHref ? (
                <LinkButton
                  href={whatsappHref}
                  rel="noreferrer"
                  target="_blank"
                  variant="secondary"
                >
                  WhatsApp
                </LinkButton>
              ) : null}
            </Cluster>
            <div className="mobile-nav-panel__meta">
              <p>
                {businessContent.hours.summary.value ?? "Horario pendiente"}
              </p>
              <Cluster gap="sm">
                {phoneHref ? (
                  <TextLink href={phoneHref} icon="phone">
                    {businessContent.contact.phone.value ??
                      "Telefono pendiente"}
                  </TextLink>
                ) : null}
                <TextLink icon="location" to="/contacto/">
                  Contacto
                </TextLink>
              </Cluster>
            </div>
          </div>
        </Container>
      ) : null}
    </header>
  );
}
