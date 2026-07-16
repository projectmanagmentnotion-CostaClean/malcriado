import { RefObject } from "react";
import { useGSAP } from "@gsap/react";
import { ensureGsapRegistration } from "@/motion/config/gsap";

export function useGsapContext(
  scope: RefObject<HTMLElement | null>,
  callback: Parameters<typeof useGSAP>[0],
) {
  ensureGsapRegistration();

  return useGSAP(callback, { scope });
}
