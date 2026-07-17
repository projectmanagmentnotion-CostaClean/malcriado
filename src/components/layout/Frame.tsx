import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/cn";

interface FrameProps extends ComponentPropsWithoutRef<"article"> {
  readonly tone?: "default" | "night" | "warm" | "coast";
  readonly padding?: "sm" | "md" | "lg";
  readonly children?: ReactNode;
}

export function Frame({
  className,
  tone = "default",
  padding = "md",
  children,
  ...props
}: FrameProps) {
  return (
    <article
      className={cn("frame", `frame--${tone}`, `frame--${padding}`, className)}
      {...props}
    >
      {children}
    </article>
  );
}
