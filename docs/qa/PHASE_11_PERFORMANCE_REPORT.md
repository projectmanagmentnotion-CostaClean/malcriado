# Fase 11 - Performance report

Fecha: `2026-07-22`
Entorno Lighthouse: preview de produccion local en Windows `http://127.0.0.1:4173/`

## Bundle

`npm run bundle:budget`

- estado: `pass`
- presupuesto: `500 kB`
- chunk inicial: `169.33 kB`
- route chunks: `12`
- chunks GSAP: `2`

## Lighthouse

Artefactos iniciales de fase:

- [phase11-lighthouse-home.json](/C:/Users/USUARIO/Documents/malcriado/docs/qa/phase11-lighthouse-home.json)
- [phase11-lighthouse-menu.json](/C:/Users/USUARIO/Documents/malcriado/docs/qa/phase11-lighthouse-menu.json)

Repeticion independiente durante la revision del PR `#12` sobre la misma preview local:

### Home

- run 1: `99 / 100 / 100 / 100`
- run 2: `99 / 100 / 100 / 100`
- LCP repetido: `826.8 ms` y `918.3 ms`
- CLS repetido: `0.0207` y `0.0207`

### Menu

- run 1: `99 / 100 / 100 / 100`
- run 2: `99 / 100 / 100 / 100`
- LCP repetido: `907.8 ms` y `854.3 ms`
- CLS repetido: `0.0139` y `0.0139`

Nota de tooling:

- El CLI de Lighthouse en Windows sigue lanzando `EPERM` al limpiar su carpeta temporal despues de escribir el JSON.
- La medicion se considera valida porque el reporte se genera correctamente antes del fallo de limpieza.

## Interpretacion

- El presupuesto de bundle queda controlado.
- `Accessibility`, `Best Practices` y `SEO` cierran en `100` en las rutas medidas.
- Las lecturas anteriores de `LCP 4.3 s` y `CLS 0.102` en Home no se reproducen en la repeticion independiente actual.
- La evidencia actual apunta a ruido de laboratorio o estado previo del entorno, no a una regresion real del producto.

## Deuda aceptada

- Confirmar Lighthouse y CWV una vez desplegada la build final del lanzamiento.
- Mantener vigilado el fallo `EPERM` del CLI de Lighthouse en Windows por ser una molestia de tooling, no de producto.
