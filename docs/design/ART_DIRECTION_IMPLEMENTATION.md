# Art Direction Implementation

## Color

La paleta aprobada se ha traducido a dos capas:

- base cruda inspirada en `charcoal`, `ivory`, `sand`, `terracotta`, `teal` y `gold`
- capa semantica para fondos, foregrounds, acentos, focus y superficies

## Tipografia

- `Bodoni Moda Variable` aporta tension editorial y sofisticacion controlada
- `Manrope Variable` sostiene lectura, navegacion y formularios

## Composicion

- secciones con `Container`, `Section`, `Split`, `EditorialGrid` y `Bleed`
- hero y statements ya no dependen de paneles genericos repetidos

## Fotografia

- `EditorialImage` y `MediaFrame` permiten cinema, portrait y full bleed
- la fotografia puede ocupar gran parte de la pantalla sin convertirse en una card generica

## Ritmo

- alternancia de bloques oscuros, warm y coast
- statements amplios para pausas editoriales
- CTA de reserva reforzado como desenlace del recorrido

## Navegacion

- header con estados preparados para el futuro (`overlay`, `solid`, etc.)
- menu movil editorial con tipografia grande y cierre accesible

## Platos y ofertas

- componentes especificos para carta y especiales
- deuda editorial visible, no ocultada

## Formularios

- base visual accesible y reutilizable para Fase 8

## Preparacion para GSAP

- HTML y composicion ya resuelven la narrativa base
- Fase 6 podra anadir motion como enhancement sin rehacer el sistema visual
