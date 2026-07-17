# Phase 6 Bundle Report

Fecha: 2026-07-17
Comando: `npm run build`
Estado: `cierre local de Fase 6`

## Resultado inicial observado

- `assets/index-C351FMkF.js`: `632.30 kB`
- `gzip`: `184.24 kB`
- `assets/index-Le9zEkZR.css`: `36.91 kB`
- `gzip CSS`: `11.33 kB`

## Resultado final

- `assets/index-CiPEkCCx.js`: `494.23 kB`
- `gzip`: `132.72 kB`
- `assets/ScrollTrigger-BrDuEirF.js`: `43.55 kB`
- `gzip ScrollTrigger`: `18.11 kB`
- `assets/index-LDOMmmsY.css`: `37.33 kB`
- `gzip CSS`: `11.42 kB`

## Presupuesto reproducible

`npm run bundle:analyze` y `npm run bundle:budget` sobre el build final registran:

- chunk inicial analizado: `494233` bytes (`482.65 KiB`)
- presupuesto interno aprobado: `500 KiB`
- chunks de rutas lazy detectados: `11`
- chunks GSAP detectados: `1`

## Lectura final

La home inmersiva sigue siendo pesada, pero el chunk principal ya queda por debajo del presupuesto reproducible y sin warning de tamano en Vite. El coste de motion se separa ahora en un chunk dedicado de `ScrollTrigger`, y las rutas `/dev/*` y secundarias ya no cargan dentro del camino inicial de produccion.

## Cambios que explican la bajada

- GSAP y `ScrollTrigger` pasan a carga diferida desde `src/motion/config/gsap.ts`
- la home mantiene la experiencia visual, pero deja de arrastrar motion en el bundle inicial
- rutas secundarias y dev se sirven por carga diferida desde `src/app/router.tsx`

## Decision

El frente de rendimiento queda suficientemente saneado para revision de Fase 6. No se recomienda meter mas particion en este sprint salvo que una medicion real de LCP o INP detecte otro cuello de botella.
