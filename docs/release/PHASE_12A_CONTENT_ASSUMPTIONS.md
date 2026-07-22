# Phase 12A — supuestos de contenido comercial

Fecha: `2026-07-22`  
Estado: `PROPUESTA_PARA_STAGING`

## Horarios

La unica fuente ejecutable es `src/content/business/openingHours.ts`. Los horarios cargados son una propuesta comercial solicitada para staging; no constan como validados por el titular. La web publica no muestra esta advertencia interna.

- lunes: cerrado
- martes a jueves: 13:00–16:00 y 19:30–23:30
- viernes: 13:00–16:00 y 19:30–00:00
- sabado: 13:00–00:00
- domingo: 13:00–23:00

## Precios

La unica tabla de propuesta es `src/content/menu/proposedPrices.ts`. Se asigna solo cuando la fuente auditada no contenia un precio; una cifra futura con estado verificado prevalece y no se sobrescribe. Todos los importes se publican en EUR e incluyen IVA cuando corresponda.

Rangos aplicados: platos 8–18,50 €, pizzas 12,50–17,50 €, cocteles 10,50–11,50 €, bebidas 2,50–7 € y postres 6,50–8 €. Estas cifras son propuesta editorial y requieren aprobacion item por item antes del lanzamiento.

## Alergenos

No se ha inferido ningun alergeno. Todos los platos conservan `allergenStatus: PENDING_VALIDATION`, matriz vacia y ausencia de iconos/schema de alergenos. La validacion debe realizarla el titular a partir de recetas, fichas tecnicas de proveedores y control de contaminacion cruzada.

## Bloqueos de contenido

- validar horarios y excepciones festivas
- aprobar o sustituir cada precio propuesto
- completar la matriz de alergenos por plato
- completar identidad juridica y retencion de datos

## QA local del cierre

- unit/integration: `74/74`
- E2E: `45 passed / 5 skipped`
- content: `0 errores / 86 warnings` (alergenos, descripciones y legales documentados)
- bundle inicial: `169,77 KiB`, presupuesto `500 KiB`
- Lighthouse Home: `78 / 100 / 100 / 100`, LCP `4,4 s`, CLS `0,102`, TBT `80 ms`
- Lighthouse Reserva: `84 / 100 / 100 / 100`, LCP `3,9 s`, CLS `0,003`, TBT `10 ms`
- Lighthouse CI final: Home `79 / 100 / 100 / 100` (LCP `4,39 s`, CLS `0,046`) y Reserva `84 / 100 / 100 / 100` (LCP `3,93 s`, CLS `0,003`)

La corrida fria de Lighthouse no alcanza el objetivo de rendimiento de lanzamiento. CI mantiene un suelo anti-regresion; el GO exige optimizacion adicional y medicion en staging/dispositivo real.
