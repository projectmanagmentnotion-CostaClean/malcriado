import { businessIdentity } from "@/content/siteContent";

export function BookingCta() {
  return (
    <section className="panel">
      <p className="eyebrow">Reserva</p>
      <h2>Reserva provisionalmente por WhatsApp o con el formulario base.</h2>
      <p>
        La disponibilidad todavia no se valida en tiempo real. Cada solicitud
        requiere confirmacion manual del equipo.
      </p>
      <div className="actions">
        <a
          className="button button--primary"
          href={businessIdentity.whatsappReservationUrl}
          target="_blank"
          rel="noreferrer"
        >
          WhatsApp
        </a>
        <a className="button button--secondary" href="/reservar/">
          Ir al formulario
        </a>
      </div>
    </section>
  );
}
