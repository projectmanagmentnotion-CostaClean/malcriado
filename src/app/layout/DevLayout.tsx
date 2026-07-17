import { Outlet } from "react-router-dom";
import { ShellRouteEffects } from "@/app/shell/ShellRouteEffects";
import { Header } from "@/components/layout/Header";

export function DevLayout() {
  return (
    <>
      <ShellRouteEffects />
      <Header density="compact" hideBookingCta theme="light" />
      <main id="main-content" tabIndex={-1}>
        <Outlet />
      </main>
    </>
  );
}
