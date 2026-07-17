import { createBrowserRouter } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { legalPages } from "@/content";
import { ContactoPage } from "@/pages/ContactoPage";
import { DevAssetsPage } from "@/pages/DevAssetsPage";
import { DevContentPage } from "@/pages/DevContentPage";
import { EspecialesPage } from "@/pages/EspecialesPage";
import { HomePage } from "@/pages/HomePage";
import { LegalPage } from "@/pages/LegalPage";
import { MenuPage } from "@/pages/MenuPage";
import { NosotrosPage } from "@/pages/NosotrosPage";
import { NotFoundPage } from "@/pages/NotFoundPage";
import { ReservarPage } from "@/pages/ReservarPage";

const avisoLegalPage = legalPages[0]!;
const privacidadPage = legalPages[1]!;
const cookiesPage = legalPages[2]!;

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <NotFoundPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "/dev/assets/", element: <DevAssetsPage /> },
      { path: "/dev/content/", element: <DevContentPage /> },
      { path: "/menu/", element: <MenuPage /> },
      { path: "/especiales/", element: <EspecialesPage /> },
      { path: "/nosotros/", element: <NosotrosPage /> },
      { path: "/contacto/", element: <ContactoPage /> },
      { path: "/reservar/", element: <ReservarPage /> },
      {
        path: "/aviso-legal/",
        element: (
          <LegalPage
            title={avisoLegalPage.title}
            path="/aviso-legal/"
            body={avisoLegalPage.body ?? avisoLegalPage.summary}
          />
        ),
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
      },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);
