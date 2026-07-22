# Spacing and grid audit

La correccion usa los tokens existentes y una capa final coherente, no ajustes por captura.

- Ritmo de escenas: `clamp(4rem, 7vw, 7rem)`.
- Carta: encabezado a tres zonas en desktop y una columna bajo 900 px.
- Lista de platos: dos columnas desktop, una columna movil.
- Reserva: relacion `0.78 / 1.22`; apilado completo bajo 900 px.
- Ubicacion: relacion `0.65 / 1.35`; mapa con altura estable.
- Bordes y reglas sustituyen paneles/radios repetidos.
- Contencion `max-width: 100vw` elimina el desborde circular causado por el rail de Carta.

Resultado: alineaciones compartidas, mas aire y menos apariencia de dashboard.

## Revision independiente

- El anclaje de Carta aumento de `8rem` a `10rem` para compensar header y rail sticky tambien con viewport bajo y zoom.
- El estado activo centra el chip dentro del rail sin desplazar el documento ni secuestrar el scroll.
- Las 180 comprobaciones base y 28 escenarios extendidos terminaron sin overflow horizontal.
