# Code Content Audit

## Objetivo

Eliminar duplicacion de contenido comercial en componentes, paginas y router.

## Resultado de Fase 3

- `siteContent.ts`, `homeScenes.ts` y `structuredData.ts` quedan retirados.
- `Header`, `Footer`, `BookingCta`, `HomePage`, `MenuPage`, `EspecialesPage`, `NosotrosPage`, `ReservarPage`, `LegalPage` y `router` consumen `src/content/`.
- SEO y JSON-LD quedan centralizados por pagina en `src/content/seo/`.
- Se anade `/dev/content/` para auditoria interna del modelo.

## Riesgo residual

El modelo ya es unico, pero sigue pendiente confirmacion de titular para precios, alergenos, horarios por dia y legales.
