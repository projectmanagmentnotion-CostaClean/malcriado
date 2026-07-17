import { Cluster } from "@/components/layout/Cluster";
import { Section } from "@/components/layout/Section";
import { LinkButton } from "@/components/ui/LinkButton";
import { getTelephoneHref, getWhatsappHref } from "@/content";

export function BookingCallout() {
  return (
    <Section spacing="spacious" tone="warm">
      <div className="booking-callout">
        <p className="eyebrow">Reserva</p>
        <h2>Solicitud clara, sin prometer disponibilidad no verificada.</h2>
        <p>
          La reserva sigue siendo una solicitud pendiente de confirmacion manual
          del equipo de Malcriado.
        </p>
        <Cluster gap="sm">
          <LinkButton to="/reservar/" variant="primary">
            Ir al formulario
          </LinkButton>
          <LinkButton
            {...(getWhatsappHref()
              ? {
                  href: getWhatsappHref()!,
                  rel: "noreferrer",
                  target: "_blank",
                }
              : { href: getTelephoneHref() ?? "/contacto/" })}
            variant="secondary"
          >
            WhatsApp
          </LinkButton>
        </Cluster>
      </div>
    </Section>
  );
}
