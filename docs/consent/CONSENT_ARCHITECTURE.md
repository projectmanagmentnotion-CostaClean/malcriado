# Consent Architecture

Fecha: 2026-07-21

## Objetivo

Implementar un gestor de consentimiento real, reversible y sin dark patterns para bloquear terceros no esenciales antes de una decision valida.

## Estructura

Ruta de codigo: `src/features/consent/`

- `config/consentConfig.ts`
  - version de consentimiento
  - claves de storage
  - categorias
  - inventario de terceros
- `context/ConsentProvider.tsx`
  - estado global
  - `acceptAll`
  - `rejectAll`
  - `saveCustomPreferences`
  - `openPreferences`
  - `allows`
- `context/useConsent.ts`
  - acceso tipado al contexto
- `storage/consentStorage.ts`
  - persistencia versionada
  - lectura y escritura segura
- `ui/ConsentBanner.tsx`
  - banner inicial con aceptar, rechazar y personalizar al mismo nivel visual
- `ui/ConsentDialog.tsx`
  - dialogo accesible para personalizacion
- `ui/ConsentManagedMap.tsx`
  - ejemplo real de tercero bloqueado hasta consentimiento

## Categorias

- `necessary`
- `external_media`
- `analytics`
- `marketing`

## Reglas de producto

- `necessary` siempre activa
- sin casillas premarcadas para categorias opcionales
- rechazo tan visible como aceptacion
- personalizacion reversible desde footer y `/cookies/`
- sin terceros no esenciales antes del consentimiento
- sin PII en analytics ni logs de cliente en esta fase

## Integracion real activa en Fase 9

- tercero activo y bloqueado por consentimiento: `Google Maps embed`
- proveedores de analitica: no configurados
- proveedores de marketing: no configurados

## Accesibilidad

- dialogo con `role="dialog"` y `aria-modal`
- foco dirigido al panel al abrir
- cierre con `Escape`
- restauracion de foco al cerrar
- botones y toggles operables por teclado
