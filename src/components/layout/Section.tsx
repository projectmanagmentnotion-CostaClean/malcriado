import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { Container } from "@/components/layout/Container";
import { cn } from "@/lib/cn";

interface SectionProps extends ComponentPropsWithoutRef<"section"> {
  readonly containerWidth?: "base" | "editorial" | "reading" | "wide";
  readonly tone?: "default" | "editorial" | "night" | "coast" | "warm";
  readonly spacing?: "compact" | "base" | "spacious" | "scene";
  readonly contained?: boolean;
  readonly children?: ReactNode;
}

export function Section({
  className,
  containerWidth = "base",
  tone = "default",
  spacing = "base",
  contained = true,
  children,
  ...props
}: SectionProps) {
  const content = contained ? (
    <Container width={containerWidth}>{children}</Container>
  ) : (
    children
  );

  return (
    <section
      className={cn(
        "section",
        `section--${tone}`,
        `section--${spacing}`,
        className,
      )}
      {...props}
    >
      {content}
    </section>
  );
}
