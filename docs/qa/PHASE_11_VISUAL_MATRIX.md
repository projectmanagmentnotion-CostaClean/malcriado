# Fase 11 - Matriz visual

Fecha: `2026-07-22`
Origen: preview viva `http://127.0.0.1:5173/` y preview de produccion `http://127.0.0.1:4173/`

## Viewports auditados

- `320x568`
- `360x800`
- `390x844`
- `430x932`
- `768x1024`
- `820x1180`
- `1024x768`
- `1280x800`
- `1366x768`
- `1440x900`
- `1728x1117`
- `1920x1080`

## Resultado resumido

- Todas las rutas publicas renderizan `h1` correcto en toda la matriz.
- No se detectaron errores de consola relevantes en la matriz.
- No se detecto overflow horizontal visible en rutas publicas salvo la medicion menor no desplazable de Home en `320x568`.
- `menu`, `especiales`, `nosotros`, `contacto`, `faq`, `reservar`, legales y `404` quedaron sin overflow en toda la matriz.

## Observaciones por ruta

- `/`: hero amplio, CTA visible y lectura correcta en toda la matriz. Deuda menor de emulacion en `320x568` sin scroll real.
- `/menu/`: sin overflow; navegacion por categorias y bloques de producto legibles.
- `/especiales/`: sin overflow; estado vacio de promocion se comunica con claridad.
- `/nosotros/`: sin overflow; la nueva redaccion mejora legibilidad y evita bloques internos.
- `/contacto/`: sin overflow; CTA y mapa condicionado por consentimiento se mantienen legibles.
- `/faq/`: acordeones visibles y sin roturas de layout.
- `/reservar/`: formulario usable en toda la matriz, incluido movil estrecho.
- Legales y `404`: sin roturas ni clipping relevante.

## Criterio visual

- Se aprovecha el ancho disponible del viewport mejor que en fases anteriores.
- Persisten componentes de agrupacion visual en varias rutas, pero no aparecio un hallazgo funcional que exija remaquetacion completa dentro de Fase 11.
- La deuda visual pendiente pasa a lanzamiento/polish posterior solo si el titular exige una nueva direccion de maquetacion, no por fallo tecnico actual.
