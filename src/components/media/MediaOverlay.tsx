import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface MediaOverlayProps {
  readonly align?: "start" | "end";
  readonly className?: string;
  readonly children: ReactNode;
}

export function MediaOverlay({
  align = "end",
  className,
  children,
}: MediaOverlayProps) {
  return (
    <div className={cn("media-overlay", `media-overlay--${align}`, className)}>
      {children}
    </div>
  );
}
