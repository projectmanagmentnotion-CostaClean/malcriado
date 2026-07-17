import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Icon, type IconName } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  readonly variant?:
    "primary" | "secondary" | "ghost" | "inverse" | "editorial" | "danger";
  readonly size?: "sm" | "md" | "lg";
  readonly iconStart?: IconName;
  readonly iconEnd?: IconName;
  readonly loading?: boolean;
  readonly children: ReactNode;
}

export function Button({
  className,
  variant = "primary",
  size = "md",
  iconStart,
  iconEnd,
  loading = false,
  disabled,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "ui-button",
        `ui-button--${variant}`,
        `ui-button--${size}`,
        loading && "is-loading",
        className,
      )}
      disabled={disabled || loading}
      {...props}
    >
      {iconStart ? (
        <Icon aria-hidden="true" className="ui-button__icon" name={iconStart} />
      ) : null}
      <span>{children}</span>
      {loading ? (
        <span className="ui-button__spinner" aria-hidden="true" />
      ) : null}
      {!loading && iconEnd ? (
        <Icon aria-hidden="true" className="ui-button__icon" name={iconEnd} />
      ) : null}
      {loading ? <span className="sr-only">Cargando</span> : null}
    </button>
  );
}
