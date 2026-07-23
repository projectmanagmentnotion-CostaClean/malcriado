# Dirección de arte móvil e iPad

## Decisión

Se conserva el pipeline existente de AVIF/WebP, `srcset`, dimensiones, lazy loading y prioridad LCP. No se añadieron originales sin trazabilidad ni nuevos assets.

## Focal points

- `asset-019` en Home, Carta y Reserva: foco tablet `58% 60%`; foco móvil `62% 58%`.
- Nosotros conserva el foco editorial específico del hero y la galería sin bordes genéricos.
- Las alturas de medios se limitan por familia para evitar platos cortados y escenas excesivamente largas.

## LCP

`asset-019` sigue siendo el LCP de Home y Reserva, con `loading="eager"`, `fetchpriority="high"`, variantes responsive y dimensiones declaradas. Esta iteración cambia encuadre y composición, no la semántica ni el pipeline.

## Evidencia

La matriz candidata registró cero imágenes rotas en 264 comprobaciones. Las capturas de Home, Carta, Nosotros y Reserva existen en 390 × 844, 768 × 1024, 1024 × 768 y 1440 × 900 para producción y candidato.

## Deuda

Una sesión fotográfica real de sala, terraza y equipo sigue siendo preferible a reutilizar fotografía gastronómica donde falte contexto.
