# Phase 7 Menu Visual QA

Fecha: 2026-07-17
Entorno auditado: `http://127.0.0.1:4173/`

## Matriz responsive auditada

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

Rutas auditadas:

- `/menu/`
- `/especiales/`
- `/nosotros/`
- `/reservar/`
- `/contacto/`

## Resultado

- sin overflow en todas las rutas y viewports auditados tras corregir el margen de `figure`
- header sticky presente en todas las rutas
- footer presente en todas las rutas
- `h1` correcto en las 5 rutas
- `/menu/` deep link a `#menu-category-pizzas` operativo

## Hallazgo corregido durante la QA

- `320x568` en `/menu/` presentaba overflow horizontal por margen por defecto del `figure` de `MediaFrame`
- correccion aplicada: `margin: 0` en `.media-frame`

## Zoom 200 %

Rutas auditadas:

- `/menu/`
- `/especiales/`
- `/reservar/`

Resultado:

- sin overflow horizontal en la emulacion aplicada
- riesgo residual: realizar una pasada manual de zoom real del navegador antes del lanzamiento
