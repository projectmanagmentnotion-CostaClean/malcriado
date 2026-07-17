import { RefObject, useEffect } from "react";
import { loadGsapRuntime } from "@/motion/config/gsap";

interface UseMenuPageMotionOptions {
  readonly rootRef: RefObject<HTMLElement>;
  readonly reducedMotion: boolean;
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

    void loadGsapRuntime().then(({ gsap, ScrollTrigger }) => {
      if (cancelled) {
        return;
      }

      ctx = gsap.context(() => {
        const heroTimeline = gsap.timeline({
          defaults: { ease: "power3.out" },
        });

        heroTimeline
          .from(".menu-hero__content [data-menu-reveal='true']", {
            y: reducedMotion ? 0 : 38,
            opacity: 0,
            duration: reducedMotion ? 0.12 : 0.72,
            stagger: reducedMotion ? 0 : 0.08,
          })
          .from(
            ".menu-hero__summary",
            {
              y: reducedMotion ? 0 : 28,
              opacity: 0,
              duration: reducedMotion ? 0.12 : 0.6,
            },
            reducedMotion ? 0 : 0.14,
          )
          .from(
            ".menu-hero__media",
            {
              scale: reducedMotion ? 1 : 1.04,
              opacity: 0,
              duration: reducedMotion ? 0.12 : 0.9,
            },
            0,
          );

        if (reducedMotion) {
          return;
        }

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
              },
            });
          }

          const media = section.querySelector<HTMLElement>(
            ".menu-category__feature-media",
          );

          if (media) {
            gsap.fromTo(
              media,
              { yPercent: -3 },
              {
                yPercent: 3,
                ease: "none",
                scrollTrigger: {
                  trigger: section,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: 0.6,
                },
              },
            );
          }
        });

        const chips = root.querySelectorAll(".menu-navigation__chip");
        chips.forEach((chip) => {
          chip.addEventListener("focus", () =>
            chip.classList.add("is-emphasized"),
          );
          chip.addEventListener("blur", () =>
            chip.classList.remove("is-emphasized"),
          );
          chip.addEventListener("mouseenter", () =>
            chip.classList.add("is-emphasized"),
          );
          chip.addEventListener("mouseleave", () =>
            chip.classList.remove("is-emphasized"),
          );
        });

        ScrollTrigger.refresh();
      }, root);
    });

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, [reducedMotion, rootRef]);
}
