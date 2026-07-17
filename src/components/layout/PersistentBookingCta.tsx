import { LinkButton } from "@/components/ui/LinkButton";
import { buildBookingIntentHref } from "@/lib/booking/buildBookingIntentHref";

export function PersistentBookingCta() {
  return (
    <div className="persistent-booking-cta" data-nosnippet="true">
      <LinkButton
        className="persistent-booking-cta__link"
        iconEnd="arrow-right"
        to={buildBookingIntentHref({ context: "shell" })}
        variant="editorial"
      >
        Reservar mesa
      </LinkButton>
    </div>
  );
}
