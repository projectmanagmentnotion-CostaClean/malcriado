# Content Model

La Fase 3 mueve el contenido comercial y editorial a `src/content/` como fuente unica tipada.

## Modulos principales

- `business/`: identidad, NAP, horarios, canales y helpers (`tel:`, `mailto:`, `WhatsApp`).
- `menu/`: categorias, items, estados de publicacion y normalizacion parcial del menu auditado.
- `offers/`: estado editorial de especiales y selectores por vigencia.
- `people/` y `venue/`: narrativa publica, bloques de historia y timeline.
- `home/`: escenas editoriales para home y futura capa GSAP.
- `seo/`: metadatos por ruta y JSON-LD centralizado.
- `legal/`: rutas legales con estado `PENDING_VALIDATION`.
- `shared/`: fuentes trazables y utilidades de referencia.

## Principios

- No se inventan precios, alergenos, horarios ni ofertas.
- Todo dato visible debe salir de una fuente trazable.
- Los estados `PENDING_VALIDATION` y `PENDING_CONTENT` son parte del modelo, no una excepcion.
- Las rutas publicas consumen el dominio tipado; no deben volver a hardcodear contenido comercial.

## Rutas conectadas

- `/`
- `/menu/`
- `/especiales/`
- `/nosotros/`
- `/contacto/`
- `/reservar/`
- `/aviso-legal/`
- `/privacidad/`
- `/cookies/`
- `/dev/assets/`
- `/dev/content/`
