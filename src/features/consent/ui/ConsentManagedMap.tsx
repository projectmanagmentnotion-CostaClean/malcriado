import { Button } from "@/components/ui/Button";
import { LinkButton } from "@/components/ui/LinkButton";
import { TextLink } from "@/components/ui/TextLink";
import { getGoogleMapsEmbedHref, getGoogleMapsHref } from "@/content";
import { useConsent } from "../context/useConsent";

export function ConsentManagedMap() {
  const { allows, openPreferences } = useConsent();
  const directionsHref = getGoogleMapsHref();
  const embedHref = getGoogleMapsEmbedHref();
  const canRenderMap = allows("external_media") && Boolean(embedHref);

  return (
    <div className="consent-map">
      {canRenderMap && embedHref ? (
        <iframe
          className="consent-map__frame"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          src={embedHref}
          title="Mapa interactivo de Malcriado"
        />
      ) : (
        <div className="consent-map__placeholder">
          <p className="eyebrow">Mapa bloqueado</p>
          <h3>El mapa interactivo no se carga antes del consentimiento</h3>
          <p>
            Puedes abrir rutas externas bajo accion tuya o permitir contenido
            externo para mostrar el mapa embebido en esta pagina.
          </p>
          <div className="consent-map__actions">
            <Button onClick={openPreferences} type="button" variant="secondary">
              Ajustar preferencias
            </Button>
            {directionsHref ? (
              <LinkButton
                href={directionsHref}
                rel="noreferrer"
                target="_blank"
                variant="editorial"
              >
                Abrir Google Maps
              </LinkButton>
            ) : null}
          </div>
          <TextLink to="/cookies/">Ver politica de cookies</TextLink>
        </div>
      )}
    </div>
  );
}
