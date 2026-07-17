import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface FormMessageProps {
  readonly tone?: "info" | "success" | "error" | "pending";
  readonly children: ReactNode;
  readonly className?: string;
}

export function FormMessage({
  tone = "info",
  children,
  className,
}: FormMessageProps) {
  return (
    <p
      className={cn("form-message", `form-message--${tone}`, className)}
      role="status"
    >
      {children}
    </p>
  );
}
