# Informe de regresión desktop

## Regla

Los cambios responsive están limitados a `max-width: 1199px`. Desktop conserva la composición existente desde 1200 px.

## Evidencia cuantitativa a 1440 × 900

| Ruta    | Producción | Candidato | Delta |
| ------- | ---------: | --------: | ----: |
| Home    |  10.397 px | 10.397 px |     0 |
| Carta   |  12.349 px | 12.349 px |     0 |
| Reserva |   3.506 px |  3.506 px |     0 |

La matriz comprobó además 1280 × 720, 1920 × 1080 y 2560 × 1440: navegación desktop visible, drawer oculto, un `h1`, cero imágenes rotas y cero overflow.

Las capturas antes/después de 1440 × 900 se encuentran en `docs/qa/screenshots/mobile-ipad/`.

## Veredicto

`PASS — NO_DESKTOP_REDESIGN`
