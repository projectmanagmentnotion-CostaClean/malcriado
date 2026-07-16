import { renderHook } from "@testing-library/react";
import { useReducedMotion } from "@/motion/hooks/useReducedMotion";

describe("useReducedMotion", () => {
  it("reads prefers-reduced-motion", () => {
    const listeners = new Set<() => void>();

    window.matchMedia = vi.fn().mockImplementation(() => ({
      matches: true,
      addEventListener: (_event: string, listener: () => void) =>
        listeners.add(listener),
      removeEventListener: (_event: string, listener: () => void) =>
        listeners.delete(listener),
    })) as typeof window.matchMedia;

    const { result } = renderHook(() => useReducedMotion());

    expect(result.current).toBe(true);
  });
});
