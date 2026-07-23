# Revisión final móvil e iPad

Fecha: 2026-07-23

## Veredicto técnico

El candidato resuelve el P1 del menú, introduce tres composiciones responsive reales y mantiene desktop estable. La matriz completa pasa `264/264`.

## Puntuación

| Superficie     | Inicial |  Final |
| -------------- | ------: | -----: |
| Mobile 320–430 |  6,8/10 | 8,8/10 |
| iPad portrait  |  5,9/10 | 8,7/10 |
| iPad landscape |  6,1/10 | 8,8/10 |
| Desktop        |  9,0/10 | 9,0/10 |

La puntuación es una valoración heurística apoyada por la matriz y las capturas, no una métrica de laboratorio.

## Resumen por área

- Home: hero controlado, menor ritmo vertical y retículas tablet.
- Carta: rail sticky, categorías compactas, dos columnas tablet y menor altura.
- Especiales: hero y estado con dos zonas en tablet.
- Nosotros: secuencia alternada y galería adaptada.
- Reserva: formulario táctil, panel contextual tablet y mapa consentido intacto.
- Contacto/FAQ: retículas tablet y acordeones con target mínimo.
- Legales/404: gutter y escala intermedia, sin cambios de contenido.
- Header/footer: altura específica, drawer hasta 1199 y columnas reales en tablet.
- Imágenes: focal points por familia, sin alterar pipeline.
- Movimiento: sin nuevas cargas; reduced motion y cleanup preservados.

## Evidencia

- 264/264 checks responsive.
- 82/82 tests unitarios.
- 48 E2E aprobados y 8 skips declarados; incluye 3/3 responsive específicos.
- Revisión independiente: 28 escenarios extendidos y 24 superficies Axe, sin fallos.
- Build, lint y TypeScript verdes.
- Capturas antes/después: 32 archivos, cuatro rutas y cuatro viewports por origen.

## Riesgo residual

Safari iOS, Android Chrome, lector de pantalla, teclado virtual y red lenta requieren validación humana en hardware real. No hay P0/P1 técnico conocido en el candidato.

## Estado

`AWAITING_OWNER_VISUAL_APPROVAL`

No hacer merge ni despliegue de producción sin aprobación explícita.
