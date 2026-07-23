# Dirección de arte móvil e iPad

## Decisión

Se conserva el pipeline existente de AVIF/WebP, `srcset`, dimensiones, lazy loading y prioridad LCP. Se incorporaron cuatro originales entregados por el titular en esta tarea, identificados como `USER_SUPPLIED_FOR_PROJECT`, con hash, dimensiones, focal point y derivados trazables en el manifiesto.

En móvil, las escenas gastronómicas principales pasan a full-bleed real: ocupan el ancho completo del viewport, sin bordes, radios ni sombras de tarjeta. El texto conserva su gutter en un plano separado. En tablet se eliminan los marcos visibles y la fotografía usa toda la zona editorial disponible.

## Focal points

- `asset-019` en Home, Carta y Reserva: foco tablet `58% 60%`; foco móvil `62% 58%`.
- Nosotros conserva el foco editorial específico del hero y la galería sin bordes genéricos.
- Las alturas de medios se limitan por familia para evitar platos cortados y escenas excesivamente largas.
- La escena Costa separa imagen y contenido en móvil para evitar texto negro sobre zonas ruidosas; el bloque informativo usa fondo sólido de alto contraste.
- La carta asigna sin reutilización cruzada: `asset-028` a cócteles, `asset-029` a refrescos, `asset-030` a sangría y `asset-031` a vinos.
- La escena nocturna de Home utiliza `asset-028` y mantiene la fotografía a ancho completo, sin marco.

## LCP

`asset-019` sigue siendo el LCP de Home y Reserva, con `loading="eager"`, `fetchpriority="high"`, variantes responsive y dimensiones declaradas. Esta iteración cambia encuadre y composición, no la semántica ni el pipeline.

## Evidencia

La matriz candidata registró cero imágenes rotas en 264 comprobaciones. Las capturas de Home, Carta, Nosotros y Reserva existen en 390 × 844, 768 × 1024, 1024 × 768 y 1440 × 900 para producción y candidato.

## Deuda

Una sesión fotográfica real de sala, terraza y equipo sigue siendo preferible a reutilizar fotografía gastronómica donde falte contexto. La revisión jurídica final de los cuatro originales entregados sigue correspondiendo al titular.
