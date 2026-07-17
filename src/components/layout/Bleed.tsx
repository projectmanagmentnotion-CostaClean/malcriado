import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

interface BleedProps extends ComponentPropsWithoutRef<"div"> {
  readonly soft?: boolean;
}

export function Bleed({ className, soft = false, ...props }: BleedProps) {
  return (
    <div className={cn("bleed", soft && "bleed--soft", className)} {...props} />
  );
}
