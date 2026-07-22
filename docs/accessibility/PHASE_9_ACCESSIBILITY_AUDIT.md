# Fase 9 Accessibility Audit

Fecha: 2026-07-22

## Cobertura automatizada

- Vitest + `axe-core`
- Playwright E2E
- revisiones de responsive y zoom

## Resultado

- `0` violaciones Axe serias o criticas en:
  - `/`
  - `/reservar/`
  - `/contacto/`
  - `/nosotros/`
  - `/faq/`
  - `/dev/design-system/`
- FAQ operable por teclado con botones expandibles y paneles asociados.
- Dialogo de consentimiento operable por teclado, con foco gestionado al abrir y cerrar y tabulacion atrapada dentro del modal.
- CTA y enlaces legales visibles tanto en desktop como en movil.

## Evidencia automatizada

- `src/test/accessibility.test.tsx`: `6` tests verdes
- `src/test/app.test.tsx`: regresion cubierta para foco atrapado en el dialogo de consentimiento
- `tests/e2e/phase9-secondary.spec.ts`: FAQ y mapa bajo consentimiento verdes en `chromium` y `mobile-chrome`
- `tests/e2e/reservation-flow.spec.ts`: reduced motion y zoom `200%` siguen verdes

## Limitaciones conocidas

- `color-contrast` sigue excluido del smoke de `axe-core` y requiere comprobacion manual/visual adicional.
- Falta pasada humana con lector de pantalla real antes de considerar el bloque totalmente auditado a nivel AA institucional.
- La declaracion de accesibilidad no debe presentarse como certificacion externa.
