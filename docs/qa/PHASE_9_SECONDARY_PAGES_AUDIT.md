# Fase 9 Secondary Pages Audit

Fecha: 2026-07-22
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

## Revision independiente 2026-07-22

- Se detecto una regresion de CI en E2E: el smoke de `/reservar/` dependia de una fecha fija ya pasada (`2026-07-21`).
- Se corrigio el smoke usando fecha futura relativa para evitar falsos negativos ligados al calendario.
- Se detecto una brecha de accesibilidad en el gestor de consentimiento: el dialogo gestionaba foco al abrir y cerrar, pero no atrapaba la tabulacion dentro del modal.
- Se corrigio el dialogo con ciclo de foco hacia delante y hacia atras, y se cubrio con test unitario de regresion.
- Resultado local tras la correccion:
  - `npm run qa`: verde
  - unitarios: `66 passed`
  - E2E: `45 passed / 5 skipped`
  - Lighthouse preview de produccion:
    - `/contacto/`: `86 / 100 / 100 / 100`
    - `/faq/`: `86 / 100 / 100 / 100`

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
- Los JSON de Lighthouse ya versionados pesan aproximadamente `0.71` a `0.75 MB` por ruta; se aceptan como deuda `P3` documental y no se anaden nuevos artefactos JSON en esta revision.
