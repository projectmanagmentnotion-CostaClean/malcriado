import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface FormSectionProps {
  readonly title: string;
  readonly body?: string;
  readonly className?: string;
  readonly children: ReactNode;
}

export function FormSection({
  title,
  body,
  className,
  children,
}: FormSectionProps) {
  return (
    <section className={cn("form-section", className)}>
      <header className="form-section__header">
        <h2>{title}</h2>
        {body ? <p>{body}</p> : null}
      </header>
      <div className="form-section__body">{children}</div>
    </section>
  );
}
