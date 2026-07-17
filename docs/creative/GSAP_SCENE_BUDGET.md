# GSAP Scene Budget

Fecha: 2026-07-17
Estado: `presupuesto actualizado con medicion real de Fase 6`

## Reglas base

- maximo recomendado de escenas inmersivas activas a la vez: 2
- maximo recomendado de triggers simultaneos en home desktop inicial: 18
- maximo recomendado de triggers simultaneos en home movil inicial: 10
- ninguna escena puede introducir pinning largo en movil

## Presupuesto por escena

| Escena          | Triggers maximos | Pinning | Asset budget inicial    | Video    | Coste estimado | Fallback               | Cuando eliminar animacion            |
| --------------- | ---------------- | ------- | ----------------------- | -------- | -------------- | ---------------------- | ------------------------------------ |
| Preloader       | 0                | no      | logo + textura ligera   | no       | bajo           | desmontaje inmediato   | si oculta carga real                 |
| Hero            | 3                | no      | 1 visual principal      | opcional | medio          | estado final visible   | si degrada LCP o CTA                 |
| Especial activo | 2                | no      | 1 producto protagonista | no       | medio          | escena estatica        | si la oferta no esta verificada      |
| Fusion          | 3                | no      | 1-2 imagenes            | no       | medio          | texto editorial fijo   | si reduce legibilidad                |
| Platos insignia | 4                | no      | 3-5 platos maximo       | no       | alto           | lista estatica         | si exige demasiados triggers         |
| Costa           | 2                | no      | 1 panorama              | opcional | medio          | imagen fija            | si parece stock o pierde rendimiento |
| Cocteles        | 2                | no      | 1-2 imagenes            | no       | medio          | layout estatico oscuro | si requiere blur o filtros caros     |
| Historia        | 1                | no      | 1 retrato + 1 apoyo     | no       | bajo           | contenido fijo         | si distrae de la lectura             |
| Carta visual    | 2                | no      | previews ligeros        | no       | medio          | lista de categorias    | si depende de hover                  |
| Reserva         | 1                | no      | fondo ligero            | no       | bajo           | entrada simple         | si afecta la escritura o validacion  |

## Medicion real en Fase 6

Resultados observados en desarrollo sobre la home final:

- mobile estable tras volver a home: `26` triggers
- desktop estable: `27` triggers
- pins: `0`
- timelines activas en reposo tras montar: `0`
- cleanup tras abandonar y volver a home: sin duplicacion observable

## Triggers por escena observados

- `home-hero`: `3`
- `scene-special`: `3`
- `scene-fusion`: `3`
- `scene-signature-dishes`: `4` en desktop, `3` en mobile estable
- `scene-coast`: `3`
- `scene-night`: `3`
- `scene-story`: `2`
- `scene-menu`: `2`
- `scene-booking`: `2`
- `scene-location`: `2`

## Lectura final

- el presupuesto real queda por encima del objetivo inicial teorico, pero sin pinning y sin scroll-jacking
- la diferencia viene del doble contrato por escena: reveal o media motion mas control de tema del header
- se acepta en Fase 6 porque no hay triggers huerfanos, no hay pins y el bundle inicial ya no arrastra GSAP
