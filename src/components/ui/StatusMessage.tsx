import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export type StatusTone =
  "info" | "success" | "warning" | "danger" | "pending" | "muted";

interface StatusMessageProps {
  readonly title: string;
  readonly tone?: StatusTone;
  readonly children?: ReactNode;
  readonly className?: string;
}

export function StatusMessage({
  title,
  tone = "info",
  children,
  className,
}: StatusMessageProps) {
  return (
    <div className={cn("status-message", `status-message--${tone}`, className)}>
      <p className="status-message__title">{title}</p>
      {children ? <div className="status-message__body">{children}</div> : null}
    </div>
  );
}
