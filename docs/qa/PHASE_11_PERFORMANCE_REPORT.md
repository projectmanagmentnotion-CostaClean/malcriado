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

### Home

Archivo: [phase11-lighthouse-home.json](/C:/Users/USUARIO/Documents/malcriado/docs/qa/phase11-lighthouse-home.json)

- Performance: `78`
- Accessibility: `100`
- Best Practices: `100`
- SEO: `100`
- LCP: `4.3 s`
- CLS: `0.102`
- TBT: `70 ms`
- Speed Index: `2.7 s`

### Menu

Archivo: [phase11-lighthouse-menu.json](/C:/Users/USUARIO/Documents/malcriado/docs/qa/phase11-lighthouse-menu.json)

- Performance: `81`
- Accessibility: `100`
- Best Practices: `100`
- SEO: `100`
- LCP: `4.2 s`
- CLS: `0.004`
- TBT: `30 ms`
- Speed Index: `2.8 s`

## Interpretacion

- El presupuesto de bundle queda controlado.
- `Accessibility`, `Best Practices` y `SEO` cierran en `100` en las rutas medidas.
- El cuello de botella local sigue siendo `LCP` del hero y, en Home, un `CLS` local de laboratorio ligeramente por encima de `0.1`.
- No se considera una regresion bloqueante para cerrar la fase porque:
  - no hubo empeoramiento funcional detectado
  - Menu mantiene `CLS` excelente
  - el comportamiento ya estaba documentado como discrepancia de laboratorio local

## Deuda aceptada

- Repetir Lighthouse y CWV en preview/remoto o entorno mas parecido a produccion real.
- Revisar LCP del hero de Home antes del lanzamiento definitivo.
