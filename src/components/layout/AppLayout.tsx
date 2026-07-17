import { Outlet, useLocation } from "react-router-dom";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { SkipLink } from "@/components/layout/SkipLink";

export function AppLayout() {
  const location = useLocation();
  const pathname = location.pathname;
  const headerState = pathname === "/" ? "overlay" : "solid";
  const headerTheme = pathname.startsWith("/dev/") ? "light" : "dark";

  return (
    <>
      <SkipLink />
      <Header state={headerState} theme={headerTheme} />
      <main id="main-content">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
