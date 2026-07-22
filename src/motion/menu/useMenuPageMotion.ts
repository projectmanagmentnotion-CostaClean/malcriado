import { RefObject, useEffect } from "react";
import { loadGsapRuntime } from "@/motion/config/gsap";
import { createScrollTriggerLifecycle } from "@/motion/utilities/scrollTriggerLifecycle";

interface UseMenuPageMotionOptions {
  readonly rootRef: RefObject<HTMLElement>;
  readonly reducedMotion: boolean;
}

interface GsapMatchMediaController {
  add: (query: string, callback: () => void) => void;
  revert: () => void;
}

export function useMenuPageMotion({
  rootRef,
  reducedMotion,
}: UseMenuPageMotionOptions) {
  useEffect(() => {
    if (import.meta.env.MODE === "test") {
      return;
    }

    const root = rootRef.current;

    if (!root) {
      return;
    }

    let cancelled = false;
    let ctx: { revert: () => void } | null = null;
    let mm: GsapMatchMediaController | null = null;
    let disposeScrollLifecycle: (() => void) | null = null;

    void loadGsapRuntime().then(({ gsap, ScrollTrigger }) => {
      if (cancelled) {
        return;
      }

      if (reducedMotion) {
        return;
      }

      mm = gsap.matchMedia();
      disposeScrollLifecycle = createScrollTriggerLifecycle(ScrollTrigger);
      ctx = gsap.context(() => {
        const heroTimeline = gsap.timeline({
          defaults: { ease: "power3.out" },
        });

        heroTimeline
          .from(".menu-hero__content [data-menu-reveal='true']", {
            y: 38,
            opacity: 0,
            duration: 0.72,
            stagger: 0.08,
          })
          .from(
            ".menu-hero__summary",
            {
              y: 28,
              opacity: 0,
              duration: 0.6,
            },
            0.14,
          )
          .from(
            ".menu-hero__media",
            {
              scale: 1.04,
              opacity: 0,
              duration: 0.9,
            },
            0,
          );

        const sections = gsap.utils.toArray<HTMLElement>(
          "[data-menu-motion='nav'], [data-menu-motion='category'], [data-menu-motion='notes']",
          root,
        );

        sections.forEach((section) => {
          const revealTargets = section.querySelectorAll(
            "[data-menu-reveal='true']",
          );

          if (revealTargets.length > 0) {
            gsap.from(revealTargets, {
              y: 42,
              opacity: 0,
              duration: 0.76,
              ease: "power3.out",
              stagger: 0.08,
              scrollTrigger: {
                trigger: section,
                start: "top 76%",
                once: true,
                invalidateOnRefresh: true,
              },
            });
          }
        });

        mm?.add("(min-width: 901px)", () => {
          sections.forEach((section) => {
            const media = section.querySelector<HTMLElement>(
              ".menu-category__feature-media",
            );

            if (!media) {
              return;
            }

            gsap.fromTo(
              media,
              { yPercent: -2 },
              {
                yPercent: 2,
                ease: "none",
                scrollTrigger: {
                  trigger: section,
                  start: "top bottom",
                  end: "bottom top",
                  invalidateOnRefresh: true,
                  scrub: 0.45,
                },
              },
            );
          });
        });
      }, root);
    });

    return () => {
      cancelled = true;
      disposeScrollLifecycle?.();
      mm?.revert();
      ctx?.revert();
    };
  }, [reducedMotion, rootRef]);
}
