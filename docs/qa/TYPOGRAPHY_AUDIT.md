# Typography audit

- Bodoni Moda conserva la voz editorial; Manrope sostiene lectura y formularios.
- H1 Home baja de una escala que expulsaba el CTA a `clamp(3.5rem, 6.2vw, 5.9rem)` y `0.98` de interlineado.
- Titulos de Carta usan balance y evitan partir palabras dentro de una categoria.
- Longitud de lectura se limita a `66ch`.
- Precios mantienen peso alto y proximidad al plato.
- Labels, ayudas y estados conservan tamaño legible y asociacion accesible.
- No se alteraron textos legales ni contenido gastronomico.

Deuda P3: revisar viudas concretas con Safari/iOS real y validar subsetting de fuentes con datos de campo.

## Revision independiente

- Axe detecto contraste 1.24:1 en dos CTA claros de Carta y 2.31:1 en el eyebrow de la galeria de Nosotros.
- Se aplicaron colores contextuales sin cambiar familia, escala ni jerarquia. La repeticion final de Axe queda en cero violaciones, 12 rutas por movil y desktop.
- Zoom emulado 125/150/200 conserva un `h1` por ruta, reflow y lectura sin desborde.
