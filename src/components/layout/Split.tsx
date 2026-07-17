import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/cn";

interface SplitProps extends ComponentPropsWithoutRef<"div"> {
  readonly ratio?: "balanced" | "content-first" | "media-first";
  readonly reverseOnMobile?: boolean;
  readonly align?: "start" | "center" | "end";
  readonly children?: ReactNode;
}

export function Split({
  className,
  ratio = "balanced",
  reverseOnMobile = false,
  align = "center",
  children,
  ...props
}: SplitProps) {
  return (
    <div
      className={cn(
        "split",
        `split--${ratio}`,
        `split--align-${align}`,
        reverseOnMobile && "split--reverse-mobile",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
