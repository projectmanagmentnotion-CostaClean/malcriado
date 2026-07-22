import { lazy, Suspense } from "react";
import { DevLayout } from "@/app/layout/DevLayout";
import type { ShellRouteHandle } from "@/app/shell/routeHandles";
import { NotFoundPage } from "@/pages/NotFoundPage";

const DevAssetsPage = lazy(() =>
  import("@/pages/DevAssetsPage").then((module) => ({
    default: module.DevAssetsPage,
  })),
);
const DevContentPage = lazy(() =>
  import("@/pages/DevContentPage").then((module) => ({
    default: module.DevContentPage,
  })),
);
const DevDesignSystemPage = lazy(() =>
  import("@/pages/DevDesignSystemPage").then((module) => ({
    default: module.DevDesignSystemPage,
  })),
);

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

function withSuspense(element: React.ReactNode) {
  return (
    <Suspense
      fallback={
        <div aria-live="polite" className="sr-only">
          Cargando página
        </div>
      }
    >
      {element}
    </Suspense>
  );
}

export const devRoute = {
  path: "/dev/",
  element: <DevLayout />,
  errorElement: <NotFoundPage />,
  children: [
    {
      path: "assets/",
      element: withSuspense(<DevAssetsPage />),
      handle: devHandle("Dev assets"),
    },
    {
      path: "content/",
      element: withSuspense(<DevContentPage />),
      handle: devHandle("Dev content"),
    },
    {
      path: "design-system/",
      element: withSuspense(<DevDesignSystemPage />),
      handle: devHandle("Dev design system"),
    },
  ],
};
