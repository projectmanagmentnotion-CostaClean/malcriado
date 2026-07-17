type GsapRuntime = {
  readonly gsap: typeof import("gsap").default;
  readonly ScrollTrigger: typeof import("gsap/ScrollTrigger").ScrollTrigger;
};

let runtimePromise: Promise<GsapRuntime> | null = null;

export function loadGsapRuntime(): Promise<GsapRuntime> {
  if (!runtimePromise) {
    runtimePromise = Promise.all([
      import("gsap"),
      import("gsap/ScrollTrigger"),
    ]).then(([gsapModule, scrollTriggerModule]) => {
      const gsap = gsapModule.default;
      const { ScrollTrigger } = scrollTriggerModule;

      gsap.registerPlugin(ScrollTrigger);

      return { gsap, ScrollTrigger };
    });
  }

  return runtimePromise;
}
