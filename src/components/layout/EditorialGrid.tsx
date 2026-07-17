import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/cn";

interface EditorialGridProps extends ComponentPropsWithoutRef<"div"> {
  readonly columns?: 2 | 3 | 4;
  readonly emphasis?: "none" | "lead-left" | "lead-right";
  readonly children?: ReactNode;
}

export function EditorialGrid({
  className,
  columns = 3,
  emphasis = "none",
  children,
  ...props
}: EditorialGridProps) {
  return (
    <div
      className={cn(
        "editorial-grid",
        `editorial-grid--${columns}`,
        `editorial-grid--${emphasis}`,
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
