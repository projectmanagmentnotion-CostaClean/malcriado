interface ScrollTriggerLike {
  refresh: () => void;
}

export function createScrollTriggerLifecycle(scrollTrigger: ScrollTriggerLike) {
  let frameId: number | null = null;
  let timeoutId: number | null = null;

  const scheduleRefresh = () => {
    if (frameId !== null) {
      window.cancelAnimationFrame(frameId);
    }

    if (timeoutId !== null) {
      window.clearTimeout(timeoutId);
    }

    frameId = window.requestAnimationFrame(() => {
      frameId = null;
      scrollTrigger.refresh();
    });

    timeoutId = window.setTimeout(() => {
      timeoutId = null;
      scrollTrigger.refresh();
    }, 180);
  };

  const handlePageShow = (event: PageTransitionEvent) => {
    if (event.persisted) {
      scheduleRefresh();
    }
  };

  window.addEventListener("resize", scheduleRefresh);
  window.addEventListener("orientationchange", scheduleRefresh);
  window.addEventListener("pageshow", handlePageShow);

  return () => {
    window.removeEventListener("resize", scheduleRefresh);
    window.removeEventListener("orientationchange", scheduleRefresh);
    window.removeEventListener("pageshow", handlePageShow);

    if (frameId !== null) {
      window.cancelAnimationFrame(frameId);
    }

    if (timeoutId !== null) {
      window.clearTimeout(timeoutId);
    }
  };
}
