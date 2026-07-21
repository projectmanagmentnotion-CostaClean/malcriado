import { Button } from "@/components/ui/Button";
import { useConsent } from "../context/useConsent";
import { ConsentDialog } from "./ConsentDialog";

export function ConsentBanner() {
  const { acceptAll, hasDecision, openPreferences, rejectAll } = useConsent();

  return (
    <>
      {!hasDecision ? (
        <aside
          aria-label="Consentimiento de cookies"
          className="consent-banner"
        >
          <div className="consent-banner__content">
            <p className="eyebrow">Privacidad y cookies</p>
            <h2>Sin contenido externo no esencial hasta que decidas</h2>
            <p>
              Puedes aceptar, rechazar o personalizar. El rechazo es tan visible
              como la aceptacion y no bloquea la experiencia basica del sitio.
            </p>
          </div>
          <div className="consent-banner__actions">
            <Button onClick={rejectAll} type="button" variant="secondary">
              Rechazar
            </Button>
            <Button onClick={openPreferences} type="button" variant="ghost">
              Personalizar
            </Button>
            <Button onClick={acceptAll} type="button" variant="editorial">
              Aceptar
            </Button>
          </div>
        </aside>
      ) : null}
      <ConsentDialog />
    </>
  );
}
