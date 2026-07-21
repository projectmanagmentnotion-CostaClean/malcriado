import { useEffect, useId, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import type { ConsentPreferences } from "../domain/consentTypes";
import { useConsent } from "../context/useConsent";

export function ConsentDialog() {
  const {
    categories,
    closePreferences,
    isDialogOpen,
    preferences,
    saveCustomPreferences,
  } = useConsent();
  const headingId = useId();
  const descriptionId = useId();
  const panelRef = useRef<HTMLDivElement | null>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const [draft, setDraft] = useState<ConsentPreferences>(preferences);

  useEffect(() => {
    setDraft(preferences);
  }, [preferences]);

  useEffect(() => {
    if (!isDialogOpen) {
      return;
    }

    previousFocusRef.current = document.activeElement as HTMLElement | null;
    document.body.classList.add("has-consent-dialog");
    panelRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closePreferences();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.classList.remove("has-consent-dialog");
      window.removeEventListener("keydown", handleKeyDown);
      previousFocusRef.current?.focus();
    };
  }, [closePreferences, isDialogOpen]);

  if (!isDialogOpen) {
    return null;
  }

  return (
    <div
      aria-describedby={descriptionId}
      aria-labelledby={headingId}
      aria-modal="true"
      className="consent-dialog"
      role="dialog"
    >
      <div
        aria-hidden="true"
        className="consent-dialog__scrim"
        onClick={closePreferences}
      />
      <div className="consent-dialog__panel" ref={panelRef} tabIndex={-1}>
        <header className="consent-dialog__header">
          <p className="eyebrow">Preferencias de cookies</p>
          <h2 id={headingId}>Decide que contenido externo permites</h2>
          <p id={descriptionId}>
            El sitio funciona sin aceptar elementos no esenciales. Puedes
            cambiar esta decision mas tarde desde el footer o desde la politica
            de cookies.
          </p>
        </header>

        <div className="consent-dialog__groups">
          {categories.map((category) => {
            const checked =
              category.id === "necessary"
                ? true
                : category.id === "analytics"
                  ? draft.analytics
                  : category.id === "marketing"
                    ? draft.marketing
                    : draft.externalMedia;
            const inputId = `consent-${category.id}`;
            const labelId = `${inputId}-label`;

            return (
              <div className="consent-toggle" key={category.id}>
                <label
                  className="consent-toggle__copy"
                  htmlFor={inputId}
                  id={labelId}
                >
                  <strong>{category.label}</strong>
                  <span>{category.description}</span>
                </label>
                <input
                  aria-labelledby={labelId}
                  checked={checked}
                  disabled={category.required}
                  id={inputId}
                  onChange={(event) => {
                    const nextChecked = event.currentTarget.checked;
                    setDraft((current) => ({
                      ...current,
                      analytics:
                        category.id === "analytics"
                          ? nextChecked
                          : current.analytics,
                      marketing:
                        category.id === "marketing"
                          ? nextChecked
                          : current.marketing,
                      externalMedia:
                        category.id === "external_media"
                          ? nextChecked
                          : current.externalMedia,
                    }));
                  }}
                  type="checkbox"
                />
              </div>
            );
          })}
        </div>

        <div className="consent-dialog__actions">
          <Button onClick={closePreferences} type="button" variant="ghost">
            Cancelar
          </Button>
          <Button
            onClick={() => saveCustomPreferences(draft)}
            type="button"
            variant="editorial"
          >
            Guardar preferencias
          </Button>
        </div>
      </div>
    </div>
  );
}
