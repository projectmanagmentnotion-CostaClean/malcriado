import { useEffect, useState } from "react";

export function useReducedMotion() {
  const getMatches = () =>
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const [reducedMotion, setReducedMotion] = useState(getMatches);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const listener = () => setReducedMotion(mediaQuery.matches);
    listener();
    mediaQuery.addEventListener("change", listener);

    return () => mediaQuery.removeEventListener("change", listener);
  }, []);

  return reducedMotion;
}
