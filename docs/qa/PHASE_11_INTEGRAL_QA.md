# Fase 11 - QA integral

Fecha de cierre tecnico local: `2026-07-22`
Rama de trabajo: `codex/phase-11-integral-qa`

## Veredicto

La Fase 11 queda cerrada tecnicamente a nivel local para QA integral del frontend.

- No quedan hallazgos `P0`, `P1` o `P2` nuevos en codigo de producto tras esta pasada.
- Se corrige una incoherencia documental real en roadmap y workflow: se estaba marcando como completado `WebPageTest` y una cobertura de navegadores/dispositivos mas amplia de la realmente ejecutada.
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

- Documentacion de Fase 11 sobredeclaraba `WebPageTest` y la cobertura real de navegadores/dispositivos. Corregido en esta revision.

### P3

- Home en emulacion `320x568` reporto una discrepancia menor de ancho documental en una pasada anterior, pero sin scroll horizontal real confirmado. En la comprobacion viva posterior no se reprodujo overflow desplazable en portrait ni landscape.
- El CLI de Lighthouse en Windows sigue lanzando `EPERM` al limpiar su carpeta temporal despues de escribir los JSON. Es deuda de tooling no bloqueante.

## Correcciones aplicadas en esta fase

- Limpieza del copy publico para eliminar textos de estructura, auditoria y estados internos en Home, Carta, Especiales, Nosotros, Contacto, FAQ, Reservar y legales.
- Ajuste del alias de redirect:
  - `/declaracion-accesibilidad/` -> `/declaracion-de-accesibilidad/`
- Actualizacion de tests unitarios y E2E para validar el copy definitivo en lugar del copy interno anterior.
- Ajuste de la escena GSAP del hero para evitar escala agresiva en viewport compacto.
- Correccion documental del roadmap de Fase 11 y de la guia `CONTINUE_FROM_ANOTHER_PC` para reflejar el estado real del PR `#12`, del CI remoto y de la cobertura ejecutada.
- Repeticion independiente de Lighthouse sobre Home y Carta con resultados estables `99 / 100 / 100 / 100` en ambas rutas.

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
- Lighthouse repetido sobre preview actual:
  - `/`: `99 / 100 / 100 / 100`, `LCP 826.8-918.3 ms`, `CLS 0.0207`
  - `/menu/`: `99 / 100 / 100 / 100`, `LCP 854.3-907.8 ms`, `CLS 0.0139`

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
- Sigue pendiente una pasada humana con lector de pantalla real antes del lanzamiento.
