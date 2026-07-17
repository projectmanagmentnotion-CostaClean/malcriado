# Typography System

## Familias

- Display: `Bodoni Moda Variable`
  - licencia: SIL Open Font License 1.1
  - uso: hero, statements, headings, navegacion movil grande
- Functional/body: `Manrope Variable`
  - licencia: SIL Open Font License 1.1
  - uso: cuerpo, navegacion desktop, formularios, estados, metadatos

## Carga tecnica

- empaquetadas localmente mediante `@fontsource-variable/*`
- formato: WOFF2 servido por el paquete
- `font-display`: gestionado por la distribucion de Fontsource
- sin dependencia de CDN externa

## Escala

- display xl: `clamp(3.7rem, 9vw, 8.5rem)`
- display lg: `clamp(3rem, 7vw, 6rem)`
- display md: `clamp(2.3rem, 5vw, 4.5rem)`
- heading xl: `clamp(2rem, 4vw, 3.6rem)`
- heading lg: `clamp(1.65rem, 3vw, 2.6rem)`
- heading md: `clamp(1.35rem, 2vw, 1.9rem)`
- body lg: `clamp(1.05rem, 1.3vw, 1.2rem)`

## Reglas

- No todo va en mayusculas; solo eyebrow y navegacion.
- El display se usa para tension editorial, no para parrafos largos.
- `Manrope` mantiene claridad en espanol, catalan e ingles con acentos y cifras.
- A 320 px y al 200 % de zoom la escala debe reflujo sin overflow horizontal.

## Antiusos

- No usar display en labels o formularios.
- No forzar tracking exagerado en body.
- No convertir headings largos en una sola linea.
