# Fase 10 Motion QA

Fecha: 2026-07-22
Rama: `codex/phase-10-motion-polish`
Base: `6933edba2b86523496f11a9ceee3bef57d884c0e`

## Alcance validado

- lifecycle de `ScrollTrigger`
- reduced motion sin escenas activas en Home
- Carta sin listeners manuales huerfanos
- navegacion rapida entre rutas
- back/forward
- shell estable en Home, Carta, Contacto, FAQ y Reservar
- bundle y Lighthouse sin regresion bloqueante

## Comandos ejecutados

- `npm run format:check`
- `npm run lint`
- `npm run typecheck`
- `npm run test:run`
- `npm run qa`
- `npm run test:e2e`
- `npm run bundle:budget`
- `git diff --check`
- Lighthouse desktop sobre preview de produccion:
  - `http://127.0.0.1:4173/`
  - `http://127.0.0.1:4173/menu/`

## Resultados

### Unitarios e integracion

- `68 passed`

Incluyen:

- helper `createScrollTriggerLifecycle`
- reduced motion
- accesibilidad automatizada con Axe en rutas cubiertas por Testing Library

### E2E completo

- `47 passed`
- `5 skipped`

Incluye:

- navegacion rapida sin errores de consola
- hero Home -> Reservar -> reload -> history
- menu movil
- overflow checks
- reduced motion
- zoom 200 %
- flujo de reserva
- FAQ, Contacto, legales y rutas dev

### Bundle

- estado: `pass`
- presupuesto: `500 kB`
- chunk inicial: `169.26 kB`
- chunks GSAP: `2`

### Lighthouse de produccion

| Ruta     | Performance | Accessibility | Best Practices | SEO   | LCP      | TBT     | CLS     |
| -------- | ----------- | ------------- | -------------- | ----- | -------- | ------- | ------- |
| `/`      | `97`        | `100`         | `100`          | `100` | `745 ms` | `17 ms` | `0.093` |
| `/menu/` | `99`        | `100`         | `100`          | `100` | `897 ms` | `0 ms`  | `0.014` |

Nota:

- para evitar un fallo `EPERM` del `chrome-launcher` de Lighthouse al limpiar carpetas temporales en Windows, la medicion valida se hizo conectando Lighthouse a una sesion de Chrome headless iniciada manualmente por puerto `9222`.

## Validacion viva

Revisado en `http://127.0.0.1:5173/` con navegador limpio:

- Home carga como Malcriado BCN
- Carta carga con `data-route-heading="true"` = `Carta Malcriado`
- Reservar carga con `data-route-heading="true"` = `Solicitud de reserva`
- `back` y `forward` mantienen estado de ruta correcto
- sin errores ni warnings relevantes de consola en la pasada auditada
- sin overflow horizontal en la comprobacion realizada

## Hallazgos P0/P1/P2

- P0: ninguno
- P1: ninguno
- P2: ninguno
- P3: deuda visual no bloqueante en vivo
  - `/contacto/` mantiene `border-left` y padding editorial en `.contact-hero__summary`, lo que reduce la sensacion de amplitud frente a Home.
  - No se observan cajas opacas, sombras pesadas ni overflow horizontal nuevos en Home, Nosotros, FAQ o las rutas legales auditadas.
  - La deuda visual se documenta, pero no bloquea la Fase 10 porque el objetivo de este PR es lifecycle y estabilidad GSAP, no rehacer direccion artistica.

## Deuda aceptada

- no hay pasada humana con lector de pantalla real en esta fase
- no se ha generado evidencia visual por cada combinacion de orientacion de la matriz completa
- los warnings editoriales y legales pendientes permanecen sin cambio
- no fue posible marcar el PR como ready for review desde este entorno porque `gh` no esta autenticado y la sesion del navegador en GitHub estaba anonima; el estado remoto verificado sigue siendo `Draft`

## Estado remoto verificado

- PR `#11`: `open / draft / mergeable`
- head remoto: `34be06536402b1cc69b15e54a3ad51ab9ded877b`
- ultimo workflow remoto: `ci`
- run id: `29902894763`
- conclusion: `success`
