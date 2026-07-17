import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";
import { cn } from "@/lib/cn";

type ContainerWidth = "base" | "editorial" | "reading" | "wide";

interface ContainerProps<T extends ElementType = "div"> {
  readonly as?: T;
  readonly width?: ContainerWidth;
  readonly bleedOnMobile?: boolean;
  readonly className?: string;
  readonly children?: ReactNode;
}

type PolymorphicProps<T extends ElementType> = ContainerProps<T> &
  Omit<ComponentPropsWithoutRef<T>, keyof ContainerProps<T>>;

export function Container<T extends ElementType = "div">({
  as,
  width = "base",
  bleedOnMobile = false,
  className,
  children,
  ...props
}: PolymorphicProps<T>) {
  const Component = as ?? "div";

  return (
    <Component
      className={cn(
        "container",
        `container--${width}`,
        bleedOnMobile && "container--bleed-mobile",
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
