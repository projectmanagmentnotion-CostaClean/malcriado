import { lazy, Suspense } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import { PublicLayout } from "@/app/layout/PublicLayout";
import type { ShellRouteHandle } from "@/app/shell/routeHandles";
import { legacyRedirects, legalPages } from "@/content";
import { HomePage } from "@/pages/HomePage";
import { LegalPage } from "@/pages/LegalPage";
import { NotFoundPage } from "@/pages/NotFoundPage";
import { env } from "@/lib/env";
const initialPath =
  typeof window !== "undefined" ? window.location.pathname : "";

const preloadedContactoPage = initialPath.startsWith("/contacto/")
  ? await import("@/pages/ContactoPage")
  : null;
const preloadedDeclaracionAccesibilidadPage = initialPath.startsWith(
  "/declaracion-de-accesibilidad/",
)
  ? await import("@/pages/DeclaracionAccesibilidadPage")
  : null;
const preloadedEspecialesPage = initialPath.startsWith("/especiales/")
  ? await import("@/pages/EspecialesPage")
  : null;
const preloadedFaqPage = initialPath.startsWith("/faq/")
  ? await import("@/pages/FaqPage")
  : null;
const preloadedMenuPage = initialPath.startsWith("/menu/")
  ? await import("@/pages/MenuPage")
  : null;
const preloadedNosotrosPage = initialPath.startsWith("/nosotros/")
  ? await import("@/pages/NosotrosPage")
  : null;
const preloadedReservarPage = initialPath.startsWith("/reservar/")
  ? await import("@/pages/ReservarPage")
  : null;

const ContactoPage =
  preloadedContactoPage?.ContactoPage ??
  lazy(() =>
    import("@/pages/ContactoPage").then((module) => ({
      default: module.ContactoPage,
    })),
  );
const DeclaracionAccesibilidadPage =
  preloadedDeclaracionAccesibilidadPage?.DeclaracionAccesibilidadPage ??
  lazy(() =>
    import("@/pages/DeclaracionAccesibilidadPage").then((module) => ({
      default: module.DeclaracionAccesibilidadPage,
    })),
  );
const EspecialesPage =
  preloadedEspecialesPage?.EspecialesPage ??
  lazy(() =>
    import("@/pages/EspecialesPage").then((module) => ({
      default: module.EspecialesPage,
    })),
  );
const FaqPage =
  preloadedFaqPage?.FaqPage ??
  lazy(() =>
    import("@/pages/FaqPage").then((module) => ({
      default: module.FaqPage,
    })),
  );
const MenuPage =
  preloadedMenuPage?.MenuPage ??
  lazy(() =>
    import("@/pages/MenuPage").then((module) => ({
      default: module.MenuPage,
    })),
  );
const NosotrosPage =
  preloadedNosotrosPage?.NosotrosPage ??
  lazy(() =>
    import("@/pages/NosotrosPage").then((module) => ({
      default: module.NosotrosPage,
    })),
  );
const ReservarPage =
  preloadedReservarPage?.ReservarPage ??
  lazy(() =>
    import("@/pages/ReservarPage").then((module) => ({
      default: module.ReservarPage,
    })),
  );

const avisoLegalPage = legalPages[0]!;
const privacidadPage = legalPages[1]!;
const cookiesPage = legalPages[2]!;

function publicHandle(
  pageTitle: string,
  overrides: Omit<ShellRouteHandle, "shell" | "pageTitle"> = {},
): ShellRouteHandle {
  return {
    shell: "public",
    pageTitle,
    headerTheme: "dark",
    headerDensity: "default",
    showPersistentBookingCta: true,
    hideHeaderBookingCta: false,
    focusTargetId: "main-content",
    ...overrides,
  };
}

function withSuspense(element: React.ReactNode) {
  return (
    <Suspense
      fallback={
        <div aria-live="polite" className="sr-only">
          Cargando pagina
        </div>
      }
    >
      {element}
    </Suspense>
  );
}

const devRoute =
  import.meta.env.DEV && env.VITE_ENABLE_DEV_ROUTES === "true"
    ? (await import("@/app/devRoute")).devRoute
    : { path: "/dev/*", element: <NotFoundPage /> };

export const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
        handle: publicHandle("Inicio", {
          headerTheme: "overlay",
          focusTargetId: "page-heading-home",
          hasHero: true,
        }),
      },
      {
        path: "/menu/",
        element: withSuspense(<MenuPage />),
        handle: publicHandle("Carta", {
          focusTargetId: "page-heading-menu",
        }),
      },
      {
        path: "/especiales/",
        element: withSuspense(<EspecialesPage />),
        handle: publicHandle("Especiales", {
          focusTargetId: "page-heading-especiales",
        }),
      },
      {
        path: "/nosotros/",
        element: withSuspense(<NosotrosPage />),
        handle: publicHandle("Nosotros", {
          focusTargetId: "page-heading-nosotros",
        }),
      },
      {
        path: "/contacto/",
        element: withSuspense(<ContactoPage />),
        handle: publicHandle("Contacto", {
          focusTargetId: "page-heading-contacto",
        }),
      },
      {
        path: "/faq/",
        element: withSuspense(<FaqPage />),
        handle: publicHandle("FAQ", {
          focusTargetId: "page-heading-faq",
        }),
      },
      {
        path: "/reservar/",
        element: withSuspense(<ReservarPage />),
        handle: publicHandle("Reservar", {
          showPersistentBookingCta: false,
          hideHeaderBookingCta: true,
          focusTargetId: "page-heading-reservar",
        }),
      },
      {
        path: "/aviso-legal/",
        element: (
          <LegalPage
            title={avisoLegalPage.title}
            path="/aviso-legal/"
            body={avisoLegalPage.body ?? avisoLegalPage.summary}
          />
        ),
        handle: publicHandle("Aviso legal", {
          focusTargetId: "page-heading-legal",
        }),
      },
      {
        path: "/privacidad/",
        element: (
          <LegalPage
            title={privacidadPage.title}
            path="/privacidad/"
            body={privacidadPage.body ?? privacidadPage.summary}
          />
        ),
        handle: publicHandle("Privacidad", {
          focusTargetId: "page-heading-legal",
        }),
      },
      {
        path: "/cookies/",
        element: (
          <LegalPage
            title={cookiesPage.title}
            path="/cookies/"
            body={cookiesPage.body ?? cookiesPage.summary}
          />
        ),
        handle: publicHandle("Cookies", {
          focusTargetId: "page-heading-legal",
        }),
      },
      {
        path: "/declaracion-de-accesibilidad/",
        element: withSuspense(<DeclaracionAccesibilidadPage />),
        handle: publicHandle("Declaracion de accesibilidad", {
          focusTargetId: "page-heading-accesibilidad",
        }),
      },
      ...legacyRedirects.map((redirect) => ({
        path: redirect.from,
        element: <Navigate replace to={redirect.to} />,
      })),
      {
        path: "/404",
        element: <NotFoundPage />,
        handle: publicHandle("404", {
          showPersistentBookingCta: false,
          focusTargetId: "page-heading-404",
        }),
      },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
  devRoute,
]);
