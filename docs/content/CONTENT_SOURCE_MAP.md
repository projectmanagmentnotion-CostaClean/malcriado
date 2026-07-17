# Content Source Map

Mapa rapido entre dominios tipados y sus fuentes trazables.

## Dominios

- `business/`
  - origen: auditoria del sitio publico y datos comerciales visibles.
- `menu/`
  - origen: carta publica auditada e inventario editorial de Fase 0.
- `offers/`
  - origen: auditoria actual del sitio y validacion de vigencia.
- `home/`
  - origen: direccion artistica aprobada y contenido publico auditado.
- `people/` y `venue/`
  - origen: paginas publicas de narrativa y contexto del restaurante.
- `legal/`
  - origen: textos publicos existentes, todavia pendientes de validacion juridica.
- `seo/`
  - origen: rutas publicas reales y criterios del roadmap.

## Regla de uso

- Todo componente visual nuevo debe consumir estos dominios o un fixture marcado como desarrollo.
- No se introducen strings comerciales duplicados en componentes publicos.
- Los estados `PENDING_VALIDATION` y `PENDING_CONTENT` deben seguir siendo visibles cuando correspondan.
