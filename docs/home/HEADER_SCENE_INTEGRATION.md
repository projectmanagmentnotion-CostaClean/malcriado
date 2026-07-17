# Header Scene Integration

Fecha: 2026-07-17
Estado: `cerrado en local con QA de Fase 6`

## Contrato actual

Cada escena de la home declara `data-header-theme` y el hook `useHomePageMotion` actualiza `data-theme` del `.site-header` cuando la escena entra en el rango visible principal.

## Temas usados

- `overlay`
  - hero
- `light`
  - especial, costa, historia, reserva
- `dark`
  - fusion, platos, noche, carta, cierre

## Implementacion

- origen del estado base: `PublicLayout` / route handle de `/`
- transicion viva: `ScrollTrigger.create(...)` por escena
- restauracion: al desmontar la home se repone el tema inicial del header

## Limites actuales

- no hay interpolacion compleja ni morph del header
- no cambia la densidad todavia
- no existe capa de progress indicator

## Pendiente

- pasada humana complementaria en lector de pantalla real
- posible ajuste futuro de densidad si el header cambia en Fase 10
