import type { ComponentPropsWithoutRef, ElementType } from "react";
import { cn } from "@/lib/cn";

interface ClusterProps<T extends ElementType = "div"> {
  readonly as?: T;
  readonly gap?: "2xs" | "xs" | "sm" | "md" | "lg";
  readonly justify?: "start" | "center" | "between";
  readonly align?: "start" | "center" | "end";
  readonly className?: string;
}

type PolymorphicProps<T extends ElementType> = ClusterProps<T> &
  Omit<ComponentPropsWithoutRef<T>, keyof ClusterProps<T>>;

export function Cluster<T extends ElementType = "div">({
  as,
  gap = "sm",
  justify = "start",
  align = "center",
  className,
  ...props
}: PolymorphicProps<T>) {
  const Component = as ?? "div";

  return (
    <Component
      className={cn(
        "cluster",
        `cluster--${gap}`,
        `cluster--justify-${justify}`,
        `cluster--align-${align}`,
        className,
      )}
      {...props}
    />
  );
}
