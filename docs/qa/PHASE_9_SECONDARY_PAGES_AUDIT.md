# Fase 9 Secondary Pages Audit

Fecha: 2026-07-21
Branch: `codex/phase-9-secondary-legal-pages`
Base auditada:

- desarrollo: `http://127.0.0.1:5173/`
- preview de produccion: `http://127.0.0.1:4173/`

## Alcance auditado

- `/nosotros/`
- `/contacto/`
- `/faq/`
- `/aviso-legal/`
- `/privacidad/`
- `/cookies/`
- `/declaracion-de-accesibilidad/`

## Resultado ejecutivo

- `/nosotros/` se reconstruyo como relato editorial a pantalla amplia con hero visual, copy verificado y deudas biograficas explicitadas.
- `/contacto/` ya no es una pagina minima: incorpora bloque de llegada, mapa condicionado por consentimiento y CTA a FAQ/reserva.
- `/faq/` queda publicada como HTML indexable con acordeones accesibles y `FAQPage` visible en JSON-LD.
- Las paginas legales siguen en `PENDING_VALIDATION`, pero ahora exponen alcance real, limites y checklist pendiente del titular en vez de placeholders vacios.
- La declaracion de accesibilidad ya comunica capacidades, limites conocidos y canal de reporte.
- Canonical y `og:url` quedaron estabilizados contra `https://malcriadobcn.com/` tambien en preview de produccion.

## Hallazgos cerrados durante la fase

1. Faltaba una FAQ publica e indexable. Se resolvio creando `/faq/`, contenido tipado y schema `FAQPage`.
2. Contacto no controlaba terceros. Se resolvio con mapa embebido bloqueado hasta consentimiento.
3. Legales y accesibilidad estaban infraespecificadas. Se resolvio con contenido estructurado, disclaimers y estados visibles.
4. Las canonicals de runtime dependian del host local. Se resolvio unificando la fuente de verdad con `businessContent.contact.canonicalUrl`.

## Responsive y layout

Verificacion automatizada en preview de produccion:

- viewports: `320`, `390`, `768`, `1440`
- rutas: todas las de Fase 9 listadas arriba
- resultado: `0` overflows horizontales detectados
- `h1` unico presente en todas las rutas
- canonical presente en todas las rutas auditadas

## SEO tecnico

- `title`, `description`, `canonical` y `og:url` presentes.
- `FAQPage` solo se publica en `/faq/` y con preguntas visibles.
- legales permanecen con `noindex, follow`.
- preview de produccion validada con canonicals publicos:
  - `https://malcriadobcn.com/contacto/`
  - `https://malcriadobcn.com/faq/`
  - `https://malcriadobcn.com/nosotros/`
  - `https://malcriadobcn.com/cookies/`

## Riesgos remanentes

- Los textos legales siguen pendientes de validacion juridica final.
- La identidad juridica, NIF/CIF, domicilio legal, correo juridico, proveedores definitivos y plazos de conservacion siguen sin confirmacion del titular.
- La puntuacion Lighthouse de rendimiento en las rutas auditadas es aceptable pero no excelente: `86`.
