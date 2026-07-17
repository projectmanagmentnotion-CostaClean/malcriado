import { Outlet } from "react-router-dom";
import { ShellRouteEffects } from "@/app/shell/ShellRouteEffects";
import { useActiveShellHandle } from "@/app/shell/useActiveShellHandle";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { PersistentBookingCta } from "@/components/layout/PersistentBookingCta";
import { SkipLink } from "@/components/layout/SkipLink";

export function PublicLayout() {
  const activeHandle = useActiveShellHandle();

  return (
    <>
      <SkipLink />
      <ShellRouteEffects />
      <Header
        density={activeHandle.headerDensity ?? "default"}
        hideBookingCta={activeHandle.hideHeaderBookingCta ?? false}
        theme={activeHandle.headerTheme ?? "dark"}
      />
      <main id="main-content" tabIndex={-1}>
        <Outlet />
      </main>
      <Footer />
      {activeHandle.showPersistentBookingCta !== false ? (
        <PersistentBookingCta />
      ) : null}
    </>
  );
}
