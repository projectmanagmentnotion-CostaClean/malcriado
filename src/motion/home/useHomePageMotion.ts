import { RefObject, useEffect } from "react";
import { loadGsapRuntime } from "@/motion/config/gsap";
import { createScrollTriggerLifecycle } from "@/motion/utilities/scrollTriggerLifecycle";

interface UseHomePageMotionOptions {
  readonly rootRef: RefObject<HTMLElement>;
  readonly reducedMotion: boolean;
  readonly showPreloader: boolean;
  readonly onPreloaderComplete: () => void;
}

interface GsapMatchMediaController {
  add: (query: string, callback: () => void) => void;
  revert: () => void;
}

interface Phase6GsapDebugTrigger {
  readonly scene: string;
  readonly start: number | string | undefined;
  readonly end: number | string | undefined;
  readonly pin: boolean;
}

interface Phase6GsapDebugSummary {
  readonly totalTriggers: number;
  readonly totalPins: number;
  readonly activeTimelines: number;
  readonly triggersByScene: Record<string, number>;
  readonly triggerDetails: Phase6GsapDebugTrigger[];
}

declare global {
  interface Window {
    __phase6GsapDebug?: Phase6GsapDebugSummary;
  }
}

export function useHomePageMotion({
  rootRef,
  reducedMotion,
  showPreloader,
  onPreloaderComplete,
}: UseHomePageMotionOptions) {
  useEffect(() => {
    if (import.meta.env.MODE === "test") {
      onPreloaderComplete();
      return;
    }

    const root = rootRef.current;

    if (!root) {
      return;
    }

    const header = document.querySelector<HTMLElement>(".site-header");
    const defaultHeaderTheme = header?.dataset.theme ?? "overlay";
    let cancelled = false;
    let mm: GsapMatchMediaController | null = null;
    let ctx: { revert: () => void } | null = null;
    let disposeScrollLifecycle: (() => void) | null = null;

    void loadGsapRuntime()
      .then(({ gsap, ScrollTrigger }) => {
        if (cancelled) {
          return;
        }

        mm = gsap.matchMedia();
        disposeScrollLifecycle = reducedMotion
          ? null
          : createScrollTriggerLifecycle(ScrollTrigger);
        ctx = gsap.context(() => {
          const debugTimelines: Array<{ isActive: () => boolean }> = [];
          const setHeaderTheme = (theme: string) => {
            header?.setAttribute("data-theme", theme);
          };

          const updateDebugSummary = () => {
            if (!import.meta.env.DEV) {
              return;
            }

            const triggers = ScrollTrigger.getAll();
            const triggerDetails = triggers.map((trigger) => {
              const triggerElement = trigger.vars.trigger;
              const sceneElement =
                triggerElement instanceof Element
                  ? triggerElement.closest<HTMLElement>(".home-scene")
                  : null;

              return {
                scene:
                  sceneElement?.id ??
                  sceneElement?.dataset.motion ??
                  "global-home-context",
                start:
                  typeof trigger.vars.start === "function"
                    ? "function"
                    : trigger.vars.start,
                end:
                  typeof trigger.vars.end === "function"
                    ? "function"
                    : trigger.vars.end,
                pin: Boolean(trigger.vars.pin),
              };
            });

            const triggersByScene = triggerDetails.reduce<
              Record<string, number>
            >((accumulator, detail) => {
              accumulator[detail.scene] = (accumulator[detail.scene] ?? 0) + 1;
              return accumulator;
            }, {});

            window.__phase6GsapDebug = {
              totalTriggers: triggerDetails.length,
              totalPins: triggerDetails.filter((detail) => detail.pin).length,
              activeTimelines: debugTimelines.filter((timeline) =>
                timeline.isActive(),
              ).length,
              triggersByScene,
              triggerDetails,
            };
          };

          const createHeaderTriggers = () => {
            const sceneElements = gsap.utils.toArray<HTMLElement>(
              ".home-scene[data-header-theme]",
              root,
            );

            sceneElements.forEach((scene) => {
              const theme = scene.dataset.headerTheme ?? defaultHeaderTheme;

              ScrollTrigger.create({
                trigger: scene,
                start: "top 48%",
                end: "bottom 48%",
                invalidateOnRefresh: true,
                onEnter: () => setHeaderTheme(theme),
                onEnterBack: () => setHeaderTheme(theme),
              });
            });
          };

          if (reducedMotion) {
            setHeaderTheme(defaultHeaderTheme);

            if (showPreloader) {
              onPreloaderComplete();
            }

            return;
          }

          const heroTimeline = gsap.timeline({
            defaults: { duration: 0.9, ease: "power3.out" },
          });
          debugTimelines.push(heroTimeline);

          const heroLead = root.querySelectorAll(
            ".home-hero__eyebrow, .home-hero__title-line, .home-hero__lede, .home-hero__actions, .home-hero__details",
          );
          const heroMedia = root.querySelector(".home-hero__media");
          const compactHeroViewport = window.matchMedia(
            "(max-width: 22.5rem)",
          ).matches;

          heroTimeline.from(heroLead, { yPercent: 24, stagger: 0.08 }, 0).from(
            heroMedia,
            {
              scale: compactHeroViewport ? 1 : 1.08,
              duration: 1.2,
              ease: "power3.out",
            },
            0.08,
          );

          mm?.add("(min-width: 901px)", () => {
            const featuredRail = root.querySelector(".home-featured__rail");

            if (featuredRail instanceof HTMLElement) {
              gsap.to(featuredRail, {
                yPercent: -10,
                ease: "none",
                scrollTrigger: {
                  trigger: featuredRail,
                  start: "top bottom",
                  end: "bottom top",
                  invalidateOnRefresh: true,
                  scrub: 0.8,
                },
              });
            }
          });

          const revealScenes = gsap.utils
            .toArray<HTMLElement>(
              ".home-scene[data-motion='reveal'], .home-scene[data-motion='layered'], .home-scene[data-motion='quiet-reading'], .home-scene[data-motion='booking-focus'], .home-scene[data-motion='horizontal-gallery']",
              root,
            )
            .filter((scene) => scene.id !== "home-hero");

          revealScenes.forEach((scene) => {
            const revealTargets = scene.querySelectorAll("[data-scene-reveal]");

            if (revealTargets.length > 0) {
              gsap.from(revealTargets, {
                y: 48,
                opacity: 0,
                duration: 0.9,
                ease: "power3.out",
                stagger: 0.08,
                scrollTrigger: {
                  trigger: scene,
                  start: "top 76%",
                  once: true,
                  invalidateOnRefresh: true,
                },
              });
            }

            const media =
              scene.querySelector<HTMLElement>("[data-scene-media]");

            if (media) {
              gsap.fromTo(
                media,
                { yPercent: -4 },
                {
                  yPercent: 4,
                  ease: "none",
                  scrollTrigger: {
                    trigger: scene,
                    start: "top bottom",
                    end: "bottom top",
                    invalidateOnRefresh: true,
                    scrub: 0.7,
                  },
                },
              );
            }
          });

          createHeaderTriggers();
          updateDebugSummary();

          if (showPreloader) {
            const preloader = root.querySelector(".home-preloader");
            const preloaderInner = root.querySelector(".home-preloader__inner");
            const preloaderText = root.querySelectorAll(
              ".home-preloader__eyebrow, .home-preloader__wordmark, .home-preloader__note",
            );

            if (preloader instanceof HTMLElement) {
              const preloaderTimeline = gsap.timeline({
                defaults: { ease: "power3.out" },
                onComplete: onPreloaderComplete,
              });
              debugTimelines.push(preloaderTimeline);

              preloaderTimeline
                .fromTo(
                  preloaderText,
                  { y: 28 },
                  { y: 0, duration: 0.55, stagger: 0.08 },
                )
                .to(preloaderInner, { yPercent: -8, duration: 0.45 }, "+=0.15")
                .to(
                  preloader,
                  {
                    opacity: 0,
                    duration: 0.45,
                    pointerEvents: "none",
                  },
                  "-=0.2",
                );
            } else {
              onPreloaderComplete();
            }
          }

          updateDebugSummary();
        }, root);
      })
      .catch(() => {
        if (!cancelled && showPreloader) {
          onPreloaderComplete();
        }
      });

    return () => {
      cancelled = true;
      header?.setAttribute("data-theme", defaultHeaderTheme);
      disposeScrollLifecycle?.();
      mm?.revert();
      ctx?.revert();

      if (import.meta.env.DEV && typeof window !== "undefined") {
        window.__phase6GsapDebug = {
          totalTriggers: 0,
          totalPins: 0,
          activeTimelines: 0,
          triggersByScene: {},
          triggerDetails: [],
        };
      }
    };
  }, [onPreloaderComplete, reducedMotion, rootRef, showPreloader]);
}
