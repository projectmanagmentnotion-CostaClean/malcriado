# Phase 6 Lighthouse

Fecha: 2026-07-17
URL auditada: `http://127.0.0.1:4174/`
Fuente: build de produccion servida con `npm run preview -- --host 127.0.0.1 --port 4174`

## Scores

- Performance: `98`
- Accessibility: `100`
- Best Practices: `100`
- SEO: `100`

## Metricas clave

- FCP: `~488 ms`
- LCP: `~829 ms`
- Speed Index: `~1221 ms`
- TBT: `0 ms`
- CLS: `~0.0107`

## Lectura

El build local de Fase 6 queda dentro de un rango muy bueno de laboratorio. La home no muestra bloqueo fuerte de main thread y el coste de motion no empuja ni LCP ni CLS fuera de presupuesto local.

## Limites

- la ejecucion de Lighthouse devolvio un error de limpieza temporal de Chrome en Windows al cerrar, pero el JSON de resultados se genero correctamente y las metricas anteriores salen de ese artefacto
- sigue siendo una medicion de laboratorio local, no una garantia de campo en preview o produccion real
