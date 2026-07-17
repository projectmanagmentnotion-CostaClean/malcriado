import { forwardRef, type ButtonHTMLAttributes } from "react";
import { Icon, type IconName } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  readonly icon: IconName;
  readonly label: string;
  readonly variant?: "ghost" | "inverse" | "secondary";
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  function IconButton(
    { className, icon, label, variant = "ghost", ...props },
    ref,
  ) {
    return (
      <button
        className={cn("icon-button", `icon-button--${variant}`, className)}
        ref={ref}
        type="button"
        {...props}
      >
        <Icon aria-hidden="true" className="icon-button__icon" name={icon} />
        <span className="sr-only">{label}</span>
      </button>
    );
  },
);
