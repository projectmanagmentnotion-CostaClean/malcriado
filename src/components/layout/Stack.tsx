import type { ComponentPropsWithoutRef, ElementType } from "react";
import { cn } from "@/lib/cn";

interface StackProps<T extends ElementType = "div"> {
  readonly as?: T;
  readonly gap?: "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
  readonly align?: "start" | "center" | "stretch";
  readonly className?: string;
}

type PolymorphicProps<T extends ElementType> = StackProps<T> &
  Omit<ComponentPropsWithoutRef<T>, keyof StackProps<T>>;

export function Stack<T extends ElementType = "div">({
  as,
  gap = "md",
  align = "start",
  className,
  ...props
}: PolymorphicProps<T>) {
  const Component = as ?? "div";

  return (
    <Component
      className={cn(
        "stack",
        `stack--${gap}`,
        `stack--align-${align}`,
        className,
      )}
      {...props}
    />
  );
}
