import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
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
import { useReducedMotion } from "@/motion/hooks/useReducedMotion";
import { loadGsapRuntime } from "@/motion/config/gsap";

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
  const [mobileMounted, setMobileMounted] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const logoAsset = getAsset("asset-002");
  const whatsappHref = getWhatsappHref();
  const phoneHref = getTelephoneHref();
  const reducedMotion = useReducedMotion();
  const canUsePortal = typeof document !== "undefined";

  useEffect(() => {
    if (!mobileMounted) {
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
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [mobileMounted]);

  useEffect(() => {
    if (!mobileMounted) {
      document.body.classList.remove("has-mobile-nav");
      buttonRef.current?.focus();
      return;
    }

    document.body.classList.add("has-mobile-nav");
  }, [mobileMounted]);

  useEffect(() => {
    if (!mobileOpen) {
      return;
    }

    setMobileMounted(true);
  }, [mobileOpen]);

  useEffect(() => {
    if (!mobileMounted) {
      return;
    }

    const panel = dialogRef.current;
    const overlay = overlayRef.current;

    if (!panel || !overlay || import.meta.env.MODE === "test") {
      if (!mobileOpen) {
        setMobileMounted(false);
      }
      return;
    }

    let cancelled = false;
    let ctx: { revert: () => void } | null = null;

    void loadGsapRuntime()
      .then(({ gsap }) => {
        if (cancelled) {
          return;
        }

        ctx = gsap.context(() => {
          const navLinks = panel.querySelectorAll(".mobile-nav-panel nav li");
          const meta = panel.querySelector(".mobile-nav-panel__meta");
          const ctas = panel.querySelector(".mobile-nav-panel__actions");

          if (mobileOpen) {
            gsap.set(overlay, { autoAlpha: 0 });
            gsap.set(panel, { xPercent: 12, autoAlpha: 0 });
            gsap.set([navLinks, ctas, meta], {
              y: reducedMotion ? 0 : 20,
              autoAlpha: reducedMotion ? 1 : 0,
            });

            const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
            tl.to(overlay, {
              autoAlpha: 1,
              duration: reducedMotion ? 0.12 : 0.2,
            })
              .to(
                panel,
                {
                  xPercent: 0,
                  autoAlpha: 1,
                  duration: reducedMotion ? 0.12 : 0.28,
                },
                0,
              )
              .to(
                navLinks,
                {
                  y: 0,
                  autoAlpha: 1,
                  duration: reducedMotion ? 0.08 : 0.22,
                  stagger: reducedMotion ? 0 : 0.05,
                },
                reducedMotion ? 0 : 0.06,
              )
              .to(
                [ctas, meta],
                {
                  y: 0,
                  autoAlpha: 1,
                  duration: reducedMotion ? 0.08 : 0.18,
                },
                reducedMotion ? 0.02 : 0.12,
              );
          } else {
            const tl = gsap.timeline({
              defaults: { ease: "power2.inOut" },
              onComplete: () => {
                setMobileMounted(false);
              },
            });

            tl.to([ctas, meta], {
              y: reducedMotion ? 0 : 10,
              autoAlpha: 0,
              duration: reducedMotion ? 0.06 : 0.12,
            })
              .to(
                navLinks,
                {
                  y: reducedMotion ? 0 : 12,
                  autoAlpha: 0,
                  duration: reducedMotion ? 0.06 : 0.12,
                  stagger: reducedMotion ? 0 : 0.03,
                },
                0,
              )
              .to(
                panel,
                {
                  xPercent: 10,
                  autoAlpha: 0,
                  duration: reducedMotion ? 0.08 : 0.18,
                },
                reducedMotion ? 0 : 0.04,
              )
              .to(
                overlay,
                {
                  autoAlpha: 0,
                  duration: reducedMotion ? 0.08 : 0.18,
                },
                0,
              );
          }
        });
      })
      .catch(() => {
        if (!mobileOpen) {
          setMobileMounted(false);
        }
      });

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, [mobileMounted, mobileOpen, reducedMotion]);

  const mobileNavigation = mobileMounted ? (
    <>
      <div
        aria-hidden="true"
        className="mobile-nav-overlay"
        onClick={() => setMobileOpen(false)}
        ref={overlayRef}
      />
      <div
        ref={dialogRef}
        aria-label="Menu movil"
        className="mobile-nav-panel"
        id="mobile-navigation"
        role="dialog"
        aria-modal="true"
      >
        <IconButton
          className="mobile-nav-panel__close"
          icon="close"
          label="Cerrar menu movil"
          onClick={() => setMobileOpen(false)}
          variant="inverse"
        />
        <nav aria-label="Menu movil" className="mobile-nav-panel__landmark">
          <ul>
            {siteRoutes.map((route) => (
              <li key={route.path}>
                <NavLink to={route.path} onClick={() => setMobileOpen(false)}>
                  {route.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <Cluster className="mobile-nav-panel__actions" gap="sm">
            <LinkButton
              iconEnd="arrow-right"
              to={buildBookingIntentHref({ context: "mobile-nav" })}
              variant="editorial"
              onClick={() => setMobileOpen(false)}
            >
              Reservar mesa
            </LinkButton>
            {whatsappHref ? (
              <LinkButton
                href={whatsappHref}
                onClick={() => setMobileOpen(false)}
                rel="noreferrer"
                target="_blank"
                variant="secondary"
              >
                WhatsApp
              </LinkButton>
            ) : null}
          </Cluster>
          <div className="mobile-nav-panel__meta">
            <p>{businessContent.hours.summary.value ?? "Horario pendiente"}</p>
            <Cluster gap="sm">
              {phoneHref ? (
                <TextLink href={phoneHref} icon="phone">
                  {businessContent.contact.phone.value ?? "Telefono pendiente"}
                </TextLink>
              ) : null}
              <TextLink icon="location" to="/contacto/">
                Contacto
              </TextLink>
            </Cluster>
          </div>
        </nav>
      </div>
    </>
  ) : null;

  return (
    <>
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
      </header>
      {mobileNavigation && canUsePortal
        ? createPortal(mobileNavigation, document.body)
        : mobileNavigation}
    </>
  );
}
