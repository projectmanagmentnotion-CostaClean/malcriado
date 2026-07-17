import { useEffect, useState } from "react";
import { LinkButton } from "@/components/ui/LinkButton";
import { buildBookingIntentHref } from "@/lib/booking/buildBookingIntentHref";

export function PersistentBookingCta() {
  const [hiddenByFooter, setHiddenByFooter] = useState(false);

  useEffect(() => {
    const footer = document.querySelector(".site-footer");

    if (
      !(footer instanceof HTMLElement) ||
      typeof IntersectionObserver === "undefined"
    ) {
      setHiddenByFooter(false);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setHiddenByFooter(entry?.isIntersecting ?? false);
      },
      {
        root: null,
        threshold: 0.12,
      },
    );

    observer.observe(footer);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      aria-hidden={hiddenByFooter}
      className="persistent-booking-cta"
      data-hidden={hiddenByFooter ? "true" : "false"}
      data-nosnippet="true"
    >
      <LinkButton
        ariaHidden={hiddenByFooter}
        className="persistent-booking-cta__link"
        iconEnd="arrow-right"
        tabIndex={hiddenByFooter ? -1 : undefined}
        to={buildBookingIntentHref({ context: "shell" })}
        variant="editorial"
      >
        Reservar mesa
      </LinkButton>
    </div>
  );
}
