# Matriz de rutas móvil e iPad

Fecha: 2026-07-23  
Candidato: `codex/mobile-ipad-art-direction-v2`

La automatización `npm run qa:mobile-ipad` recorrió 12 rutas en 22 viewports: 8 móviles, 10 tablet/iPad y 4 escritorios. Total: 264 comprobaciones por origen.

| Ruta          |  H1 | Imágenes rotas | Overflow candidato | Estado |
| ------------- | --: | -------------: | -----------------: | ------ |
| Home          |   1 |              0 |               0/22 | Verde  |
| Carta         |   1 |              0 |               0/22 | Verde  |
| Especiales    |   1 |              0 |               0/22 | Verde  |
| Nosotros      |   1 |              0 |               0/22 | Verde  |
| Contacto      |   1 |              0 |               0/22 | Verde  |
| FAQ           |   1 |              0 |               0/22 | Verde  |
| Reserva       |   1 |              0 |               0/22 | Verde  |
| Aviso legal   |   1 |              0 |               0/22 | Verde  |
| Privacidad    |   1 |              0 |               0/22 | Verde  |
| Cookies       |   1 |              0 |               0/22 | Verde  |
| Accesibilidad |   1 |              0 |               0/22 | Verde  |
| 404           |   1 |              0 |               0/22 | Verde  |

Resultados completos:

- `docs/qa/mobile-ipad-matrix-before-production.json`
- `docs/qa/mobile-ipad-matrix-candidate.json`
- `docs/qa/screenshots/mobile-ipad/before-production/`
- `docs/qa/screenshots/mobile-ipad/candidate/`

Producción obtuvo 48 fallos de composición: las 12 rutas activaban navegación desktop en 1024 × 768, 1024 × 1366, 1180 × 820 y 1194 × 834. El candidato obtuvo `264/264` sin fallos.
