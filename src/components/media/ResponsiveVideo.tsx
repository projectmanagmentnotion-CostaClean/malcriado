/* eslint-disable jsx-a11y/media-has-caption */
import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/motion/hooks/useReducedMotion";

interface ResponsiveVideoProps {
  readonly sources: readonly { src: string; type: string }[];
  readonly poster?: string;
  readonly className?: string;
  readonly muted?: boolean;
  readonly autoPlay?: boolean;
  readonly loop?: boolean;
  readonly preload?: "none" | "metadata" | "auto";
  readonly controls?: boolean;
}

export function ResponsiveVideo({
  sources,
  poster,
  className,
  muted = true,
  autoPlay = false,
  loop = false,
  preload = "metadata",
  controls = false,
}: ResponsiveVideoProps) {
  const reducedMotion = useReducedMotion();
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;

    if (!video || reducedMotion || !autoPlay) {
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting) {
        void video.play();
      } else {
        video.pause();
      }
    });

    observer.observe(video);

    return () => observer.disconnect();
  }, [autoPlay, reducedMotion]);

  return (
    <video
      ref={ref}
      className={className}
      poster={poster}
      muted={muted}
      playsInline
      autoPlay={autoPlay && !reducedMotion}
      loop={loop}
      preload={preload}
      controls={controls}
    >
      {sources.map((source) => (
        <source key={source.src} src={source.src} type={source.type} />
      ))}
      Tu navegador no soporta video HTML5.
    </video>
  );
}
