import { useEffect, useMemo, useRef, useState } from "react";
import {
  NavigationType,
  ScrollRestoration,
  useLocation,
  useNavigationType,
} from "react-router-dom";
import { useActiveShellHandle } from "@/app/shell/useActiveShellHandle";

function getHashTarget(hash: string) {
  if (!hash) {
    return null;
  }

  const id = decodeURIComponent(hash.replace(/^#/, ""));
  return document.getElementById(id);
}

export function ShellRouteEffects() {
  const location = useLocation();
  const navigationType = useNavigationType();
  const activeHandle = useActiveShellHandle();
  const [announcement, setAnnouncement] = useState(activeHandle.pageTitle);
  const initialLocationKeyRef = useRef(location.key);
  const skippedInitialFocusRef = useRef(false);

  const scrollKey = useMemo(
    () => `${location.pathname}${location.search}${location.hash}`,
    [location.hash, location.pathname, location.search],
  );

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const hashTarget = getHashTarget(location.hash);

      if (hashTarget instanceof HTMLElement) {
        hashTarget.focus({ preventScroll: true });
        hashTarget.scrollIntoView({ block: "start" });
        return;
      }

      if (navigationType !== NavigationType.Pop) {
        window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      }

      if (
        !skippedInitialFocusRef.current &&
        location.key === initialLocationKeyRef.current
      ) {
        skippedInitialFocusRef.current = true;
        return;
      }

      const focusTargetId = activeHandle.focusTargetId ?? "main-content";
      const focusTarget =
        document.getElementById(focusTargetId) ??
        document.querySelector<HTMLElement>("[data-route-heading]") ??
        document.getElementById("main-content");

      if (focusTarget instanceof HTMLElement) {
        focusTarget.focus({ preventScroll: true });
      }
    });

    setAnnouncement(activeHandle.pageTitle);

    return () => window.cancelAnimationFrame(frame);
  }, [
    activeHandle.focusTargetId,
    activeHandle.pageTitle,
    location.hash,
    location.key,
    navigationType,
  ]);

  return (
    <>
      <ScrollRestoration getKey={() => scrollKey} />
      <div aria-atomic="true" aria-live="polite" className="sr-only">
        {announcement}
      </div>
    </>
  );
}
