import { createMemoryRouter, Navigate } from "react-router-dom";
import { render } from "@testing-library/react";
import { HelmetProvider } from "react-helmet-async";
import { RouterProvider } from "react-router-dom";
import { DevLayout } from "@/app/layout/DevLayout";
import { PublicLayout } from "@/app/layout/PublicLayout";
import type { ShellRouteHandle } from "@/app/shell/routeHandles";
import { legalPages } from "@/content";
import { ContactoPage } from "@/pages/ContactoPage";
import { DeclaracionAccesibilidadPage } from "@/pages/DeclaracionAccesibilidadPage";
import { DevAssetsPage } from "@/pages/DevAssetsPage";
import { DevContentPage } from "@/pages/DevContentPage";
import { DevDesignSystemPage } from "@/pages/DevDesignSystemPage";
import { EspecialesPage } from "@/pages/EspecialesPage";
import { FaqPage } from "@/pages/FaqPage";
import { HomePage } from "@/pages/HomePage";
import { LegalPage } from "@/pages/LegalPage";
import { MenuPage } from "@/pages/MenuPage";
import { NosotrosPage } from "@/pages/NosotrosPage";
import { NotFoundPage } from "@/pages/NotFoundPage";
import { ReservarPage } from "@/pages/ReservarPage";

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

function devHandle(pageTitle: string): ShellRouteHandle {
  return {
    shell: "dev",
    pageTitle,
    headerTheme: "light",
    headerDensity: "compact",
    showPersistentBookingCta: false,
    hideHeaderBookingCta: true,
    focusTargetId: "main-content",
  };
}

export function renderApp(initialEntries: string[]) {
  const router = createMemoryRouter(
    [
      {
        path: "/",
        element: <PublicLayout />,
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
            element: <MenuPage />,
            handle: publicHandle("Carta", {
              focusTargetId: "page-heading-menu",
            }),
          },
          {
            path: "/especiales/",
            element: <EspecialesPage />,
            handle: publicHandle("Especiales", {
              focusTargetId: "page-heading-especiales",
            }),
          },
          {
            path: "/nosotros/",
            element: <NosotrosPage />,
            handle: publicHandle("Nosotros", {
              focusTargetId: "page-heading-nosotros",
            }),
          },
          {
            path: "/contacto/",
            element: <ContactoPage />,
            handle: publicHandle("Contacto", {
              focusTargetId: "page-heading-contacto",
            }),
          },
          {
            path: "/faq/",
            element: <FaqPage />,
            handle: publicHandle("FAQ", {
              focusTargetId: "page-heading-faq",
            }),
          },
          {
            path: "/reservar/",
            element: <ReservarPage />,
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
            element: <DeclaracionAccesibilidadPage />,
            handle: publicHandle("Declaracion de accesibilidad", {
              focusTargetId: "page-heading-accesibilidad",
            }),
          },
          {
            path: "/declaracion-de-privacidad/",
            element: <Navigate replace to="/privacidad/" />,
          },
          {
            path: "/politica-de-cookies/",
            element: <Navigate replace to="/cookies/" />,
          },
          {
            path: "/descargo-de-responsabilidad/",
            element: <Navigate replace to="/aviso-legal/" />,
          },
          {
            path: "/404",
            element: <NotFoundPage />,
            handle: publicHandle("404", {
              showPersistentBookingCta: false,
              focusTargetId: "page-heading-404",
            }),
          },
          { path: "*", element: <NotFoundPage />, handle: publicHandle("404") },
        ],
      },
      {
        path: "/dev/",
        element: <DevLayout />,
        children: [
          {
            path: "assets/",
            element: <DevAssetsPage />,
            handle: devHandle("Dev assets"),
          },
          {
            path: "content/",
            element: <DevContentPage />,
            handle: devHandle("Dev content"),
          },
          {
            path: "design-system/",
            element: <DevDesignSystemPage />,
            handle: devHandle("Dev design system"),
          },
        ],
      },
    ],
    { initialEntries },
  );

  return render(
    <HelmetProvider>
      <RouterProvider router={router} />
    </HelmetProvider>,
  );
}
