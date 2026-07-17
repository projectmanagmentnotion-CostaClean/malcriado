import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface MediaFrameProps {
  readonly ratio?: "landscape" | "portrait" | "square" | "cinema" | "free";
  readonly tone?: "default" | "night" | "warm";
  readonly bleed?: boolean;
  readonly caption?: string;
  readonly credit?: string;
  readonly className?: string;
  readonly children: ReactNode;
}

export function MediaFrame({
  ratio = "landscape",
  tone = "default",
  bleed = false,
  caption,
  credit,
  className,
  children,
}: MediaFrameProps) {
  return (
    <figure
      className={cn(
        "media-frame",
        `media-frame--${ratio}`,
        `media-frame--${tone}`,
        bleed && "media-frame--bleed",
        className,
      )}
    >
      <div className="media-frame__media">{children}</div>
      {caption || credit ? (
        <figcaption className="media-frame__caption">
          {caption ? <span>{caption}</span> : null}
          {credit ? <span>{credit}</span> : null}
        </figcaption>
      ) : null}
    </figure>
  );
}
