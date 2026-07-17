import { useMatches } from "react-router-dom";
import {
  isShellRouteHandle,
  type ShellRouteHandle,
} from "@/app/shell/routeHandles";

const defaultHandle: ShellRouteHandle = {
  shell: "public",
  pageTitle: "Malcriado",
  headerTheme: "dark",
  headerDensity: "default",
  showPersistentBookingCta: true,
  hideHeaderBookingCta: false,
  focusTargetId: "main-content",
  hasHero: false,
};

export function useActiveShellHandle() {
  const matches = useMatches();

  const active = [...matches]
    .reverse()
    .map((match) => match.handle)
    .find(isShellRouteHandle);

  return active ?? defaultHandle;
}
