import { Link } from "react-router-dom";
import type { AnchorHTMLAttributes, ReactNode } from "react";
import { Icon, type IconName } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";

interface BaseLinkButtonProps {
  readonly variant?:
    "primary" | "secondary" | "ghost" | "inverse" | "editorial";
  readonly size?: "sm" | "md" | "lg";
  readonly iconStart?: IconName;
  readonly iconEnd?: IconName;
  readonly className?: string;
  readonly children: ReactNode;
  readonly ariaHidden?: boolean | undefined;
  readonly tabIndex?: number | undefined;
}

type InternalLinkProps = BaseLinkButtonProps & {
  readonly to: string;
  readonly href?: never;
} & Pick<AnchorHTMLAttributes<HTMLAnchorElement>, "aria-label" | "onClick">;

type ExternalLinkProps = BaseLinkButtonProps & {
  readonly href: string;
  readonly to?: never;
  readonly target?: string;
  readonly rel?: string;
} & Pick<AnchorHTMLAttributes<HTMLAnchorElement>, "aria-label" | "onClick">;

type LinkButtonProps = InternalLinkProps | ExternalLinkProps;

export function LinkButton(props: LinkButtonProps) {
  const {
    variant = "primary",
    size = "md",
    iconStart,
    iconEnd,
    className,
    children,
  } = props;

  const classes = cn(
    "ui-button",
    `ui-button--${variant}`,
    `ui-button--${size}`,
    className,
  );

  const content = (
    <>
      {iconStart ? (
        <Icon aria-hidden="true" className="ui-button__icon" name={iconStart} />
      ) : null}
      <span>{children}</span>
      {iconEnd ? (
        <Icon aria-hidden="true" className="ui-button__icon" name={iconEnd} />
      ) : null}
    </>
  );

  if ("to" in props) {
    return (
      <Link
        aria-hidden={props.ariaHidden}
        className={classes}
        onClick={props.onClick}
        tabIndex={props.tabIndex}
        to={props.to}
      >
        {content}
      </Link>
    );
  }

  return (
    <a
      className={classes}
      href={props.href}
      target={props.target}
      rel={props.rel}
      onClick={props.onClick}
      aria-hidden={props.ariaHidden}
      tabIndex={props.tabIndex}
      aria-label={props["aria-label"]}
    >
      {content}
    </a>
  );
}
