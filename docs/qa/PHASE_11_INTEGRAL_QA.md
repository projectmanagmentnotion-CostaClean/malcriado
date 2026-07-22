# Fase 11 - QA integral

Fecha de cierre tecnico local: `2026-07-22`
Rama de trabajo: `codex/phase-11-integral-qa`

## Veredicto

La Fase 11 queda cerrada tecnicamente a nivel local para QA integral del frontend.

- No quedan hallazgos `P0`, `P1` o `P2` nuevos en codigo de producto tras esta pasada.
- El copy publico visible se naturalizo y dejo de exponer lenguaje interno de auditoria en rutas de produccion.
- Los quality gates del repositorio quedan verdes.
- La web sigue sin estar lista para lanzamiento por bloqueos ya conocidos del titular: datos legales, horarios, precios, alergenos y proveedor real de reservas.

## Rutas auditadas

- `/`
- `/menu/`
- `/especiales/`
- `/nosotros/`
- `/contacto/`
- `/faq/`
- `/reservar/`
- `/aviso-legal/`
- `/privacidad/`
- `/cookies/`
- `/declaracion-de-accesibilidad/`
- `404`

## Hallazgos

### P0

- Ninguno nuevo en producto.

### P1

- Ninguno nuevo en producto.

### P2

- Ninguno nuevo en producto.

### P3

- Home en emulacion `320x568` reporta `scrollWidth 326` frente a `clientWidth 320`, pero sin scroll horizontal real (`scrollX` permanece en `0` incluso forzando desplazamiento lateral). Se documenta como deuda de emulacion menor, no como overflow visible confirmado.
- Lighthouse local sobre preview de produccion en Windows sigue penalizando Home y Menu en `performance` por imagenes hero/LCP de laboratorio. No bloquea el cierre tecnico de QA, pero si la readiness final de lanzamiento.

## Correcciones aplicadas en esta fase

- Limpieza del copy publico para eliminar textos de estructura, auditoria y estados internos en Home, Carta, Especiales, Nosotros, Contacto, FAQ, Reservar y legales.
- Ajuste del alias de redirect:
  - `/declaracion-accesibilidad/` -> `/declaracion-de-accesibilidad/`
- Actualizacion de tests unitarios y E2E para validar el copy definitivo en lugar del copy interno anterior.
- Ajuste de la escena GSAP del hero para evitar escala agresiva en viewport compacto.

## Quality gates

Comandos ejecutados y verdes:

- `npm run format:check`
- `npm run lint`
- `npm run typecheck`
- `npm run content:validate`
- `npm run content:report`
- `npm run assets:verify`
- `npm run routes:validate`
- `npm run seo:validate`
- `npm run bundle:budget`
- `npm run test:run`
- `npm run build`
- `npm run test:e2e`
- `npm run qa`
- `git diff --check`

Resultados clave:

- Unitarios e integracion: `68/68`
- E2E: `47 passed / 5 skipped`
- `content:validate`: `0` errores, `130` warnings ya conocidos
- Build de produccion: verde
- Bundle budget: `pass`

## Copy publico

Validacion adicional sobre preview viva y preview de produccion:

- Sin coincidencias visibles de:
  - `PENDING_VALIDATION`
  - `PENDING_CONTENT`
  - `fuente auditada`
  - `claims verificados`
  - `copy de estructura`
  - `estado editorial`

## Deuda aceptada

- Datos comerciales y legales del titular siguen pendientes de validacion directa.
- `44` precios siguen a consultar.
- `44` estados de alergenos siguen pendientes de validacion operativa.
- `38` descripciones de carta siguen pendientes de ampliacion editorial real.
- No existe proveedor real de reservas ni confirmacion automatica de disponibilidad.
- No se ejecuto WebPageTest en esta fase por no disponer de integracion operativa en el entorno local.
