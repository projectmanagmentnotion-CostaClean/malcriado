import { describe, expect, it, vi } from "vitest";
import { createScrollTriggerLifecycle } from "@/motion/utilities/scrollTriggerLifecycle";

describe("createScrollTriggerLifecycle", () => {
  it("refreshes on resize, orientation changes and persisted page restores", () => {
    vi.useFakeTimers();

    const refresh = vi.fn();
    const cleanup = createScrollTriggerLifecycle({ refresh });

    window.dispatchEvent(new Event("resize"));
    vi.runOnlyPendingTimers();

    window.dispatchEvent(new Event("orientationchange"));
    vi.runOnlyPendingTimers();

    const pageShowEvent = new Event("pageshow") as PageTransitionEvent;
    Object.defineProperty(pageShowEvent, "persisted", {
      configurable: true,
      value: true,
    });

    window.dispatchEvent(pageShowEvent);
    vi.runOnlyPendingTimers();

    cleanup();
    vi.useRealTimers();

    expect(refresh).toHaveBeenCalled();
    expect(refresh.mock.calls.length).toBeGreaterThanOrEqual(3);
  });

  it("does not refresh on non-persisted pageshow events", () => {
    vi.useFakeTimers();

    const refresh = vi.fn();
    const cleanup = createScrollTriggerLifecycle({ refresh });

    const pageShowEvent = new Event("pageshow") as PageTransitionEvent;
    Object.defineProperty(pageShowEvent, "persisted", {
      configurable: true,
      value: false,
    });

    window.dispatchEvent(pageShowEvent);
    vi.runOnlyPendingTimers();
    cleanup();
    vi.useRealTimers();

    expect(refresh).not.toHaveBeenCalled();
  });
});
