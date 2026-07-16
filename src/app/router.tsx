import { createBrowserRouter } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { legalPages } from "@/content/siteContent";
import { EspecialesPage } from "@/pages/EspecialesPage";
import { HomePage } from "@/pages/HomePage";
import { LegalPage } from "@/pages/LegalPage";
import { MenuPage } from "@/pages/MenuPage";
import { NosotrosPage } from "@/pages/NosotrosPage";
import { NotFoundPage } from "@/pages/NotFoundPage";
import { ReservarPage } from "@/pages/ReservarPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <NotFoundPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "/menu/", element: <MenuPage /> },
      { path: "/especiales/", element: <EspecialesPage /> },
      { path: "/nosotros/", element: <NosotrosPage /> },
      { path: "/reservar/", element: <ReservarPage /> },
      {
        path: "/aviso-legal/",
        element: (
          <LegalPage
            title={legalPages.avisoLegal.title}
            path="/aviso-legal/"
            body={legalPages.avisoLegal.body}
          />
        ),
      },
      {
        path: "/privacidad/",
        element: (
          <LegalPage
            title={legalPages.privacidad.title}
            path="/privacidad/"
            body={legalPages.privacidad.body}
          />
        ),
      },
      {
        path: "/cookies/",
        element: (
          <LegalPage
            title={legalPages.cookies.title}
            path="/cookies/"
            body={legalPages.cookies.body}
          />
        ),
      },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);
