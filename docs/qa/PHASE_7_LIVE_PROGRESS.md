# Phase 7 Live Progress

Fecha: 2026-07-21
Branch: `codex/phase-7-menu-and-specials`

## Hitos

1. Shell visual abierto consolidado en `home`, `menu`, `nosotros`, `reservar`, `contacto`, legales y `404`.
2. `/menu/` reconstruida como carta editorial por categorias.
3. `/especiales/` reconstruida con estados tipados y honestos.
4. `Vermut` oculto de la publicacion publica.
5. slug `margarita` resuelto con `pizza-margarita`.
6. JSON-LD ampliado para `Menu` y `Offer`.
7. matriz responsive sobre preview regenerada el `2026-07-21`.
8. Axe sin violaciones en escenarios clave de Fase 7.
9. overflow horizontal de `/menu/` corregido en `320x568`.
10. menu movil ajustado con landmark navegable para eliminar la violacion moderada detectada en Axe.

## Estado del warning delta

- baseline: `92`
- pico inicial Fase 7: `131`
- final local: `130`

## Estado remoto conocido del checkpoint

- PR `#8` existe y sigue en draft
- base: `main`
- CI remoto verificado en el checkpoint previo: run `#19` `completed / success`

## Bloqueo externo restante

- actualizar el PR `#8` con el head final del bloque
- confirmar el CI remoto terminal sobre el nuevo head una vez hecho el push
