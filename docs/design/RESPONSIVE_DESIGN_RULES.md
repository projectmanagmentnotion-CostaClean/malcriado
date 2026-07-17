# Responsive Design Rules

## Viewports de control

- 320
- 360
- 390
- 430
- 768
- 820
- 1024
- 1280
- 1440
- 1728
- 1920

## Reglas

- La tipografia display debe partirse en varias lineas de forma intencional.
- El header pasa a menu movil sin perder CTA ni focus order.
- Las grids editoriales colapsan gradualmente; no se escalan proporcionalmente sin reflujo.
- Formularios pasan a una sola columna y mantienen labels visibles.
- Media dominante conserva ratios fuertes con `MediaFrame`, no cards miniaturizadas.
- Los bloques `Statement` y `FullBleed` deben seguir legibles al 200 % de zoom.

## Overflow

- ninguna ruta dev o publica debe introducir scroll horizontal a 320 px
- los tests E2E deben inspeccionar especificamente `document.documentElement.scrollWidth`

## Reduced motion

- las transiciones de UI se reducen casi a instantaneas
- el contenido no depende de motion para entenderse
