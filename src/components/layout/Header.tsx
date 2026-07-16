import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { siteRoutes } from "@/lib/routes";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mobileOpen) {
      return;
    }

    const focusable =
      dialogRef.current?.querySelector<HTMLAnchorElement>("a[href]");
    focusable?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileOpen(false);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [mobileOpen]);

  useEffect(() => {
    if (!mobileOpen) {
      buttonRef.current?.focus();
    }
  }, [mobileOpen]);

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <NavLink className="brand-mark" to="/">
          <img
            src="/assets/source/brand/cropped-logo-malcriado-pineda-de-mar.png"
            alt="Malcriado"
            width={2559}
            height={568}
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
        <NavLink className="button button--primary desktop-cta" to="/reservar/">
          Reservar mesa
        </NavLink>
        <button
          ref={buttonRef}
          className="mobile-nav-toggle"
          type="button"
          aria-expanded={mobileOpen}
          aria-controls="mobile-navigation"
          aria-label={mobileOpen ? "Cerrar menu" : "Abrir menu"}
          onClick={() => setMobileOpen((value) => !value)}
        >
          Menu
        </button>
      </div>
      {mobileOpen ? (
        <div
          ref={dialogRef}
          className="mobile-nav-panel"
          id="mobile-navigation"
        >
          <nav aria-label="Principal movil">
            <ul>
              {siteRoutes.map((route) => (
                <li key={route.path}>
                  <NavLink to={route.path} onClick={() => setMobileOpen(false)}>
                    {route.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
          <NavLink
            className="button button--primary"
            to="/reservar/"
            onClick={() => setMobileOpen(false)}
          >
            Reservar mesa
          </NavLink>
        </div>
      ) : null}
    </header>
  );
}
