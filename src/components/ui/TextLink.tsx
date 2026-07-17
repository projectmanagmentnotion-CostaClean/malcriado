import { Link } from "react-router-dom";
import type { ReactNode } from "react";
import { Icon, type IconName } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";

interface BaseTextLinkProps {
  readonly children: ReactNode;
  readonly icon?: IconName;
  readonly className?: string;
}

type InternalTextLinkProps = BaseTextLinkProps & {
  readonly to: string;
  readonly href?: never;
};

type ExternalTextLinkProps = BaseTextLinkProps & {
  readonly href: string;
  readonly to?: never;
  readonly target?: string;
  readonly rel?: string;
};

type TextLinkProps = InternalTextLinkProps | ExternalTextLinkProps;

export function TextLink(props: TextLinkProps) {
  const className = cn("text-link", props.className);
  const content = (
    <>
      <span>{props.children}</span>
      {props.icon ? (
        <Icon
          aria-hidden="true"
          className="text-link__icon"
          name={props.icon}
        />
      ) : null}
    </>
  );

  if ("to" in props) {
    return (
      <Link className={className} to={props.to}>
        {content}
      </Link>
    );
  }

  return (
    <a
      className={className}
      href={props.href}
      target={props.target}
      rel={props.rel}
    >
      {content}
    </a>
  );
}
