# Specials Implementation

## Objetivo

Publicar una ruta `/especiales/` que no invente promociones y que se comporte correctamente en `Europe/Madrid`.

## Estados soportados

- `active`
- `upcoming`
- `expired`
- `empty`

## Fuente actual

- `src/content/offers/offers.ts`
- estado real actual: sin ofertas verificadas activas, futuras o expiradas

## Selectores

- `getActiveOffers`
- `getUpcomingOffers`
- `getExpiredOffers`
- `getOfferEditorialSnapshot`

## Reglas

- solo cuentan ofertas `VERIFIED`
- la prioridad menor gana entre activas
- las expiradas se ordenan por ultima fecha de fin
- el empty state editorial sigue siendo la salida publica si no existe oferta real activa

## Tests

- DST
- inicio exacto
- fin exacto
- prioridad
- upcoming
- expired
- empty
