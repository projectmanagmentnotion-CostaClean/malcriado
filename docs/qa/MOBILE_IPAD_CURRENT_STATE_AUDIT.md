# Auditoría actual móvil e iPad

Fecha: 2026-07-23  
Producción auditada: `https://malcriadobcn.com`  
Base estable: `8ee7ebb93ee1eecf0dbd7b0c78deae77a75b0116`

## Alcance y método

Se revisaron Home, Carta, Especiales, Nosotros, Reserva, Contacto, FAQ, legales y 404 en producción. La matriz representativa usó 390 × 844, 768 × 1024, 1024 × 768 y 1440 × 900. Se verificaron estructura, navegación, altura documental, overflow horizontal y comportamiento del menú.

## Hallazgos priorizados

### P1 — Menú móvil contenido por el header

En 390 × 844 el backdrop y el panel medían aproximadamente 67 px y 122 px de alto. El `backdrop-filter` del header sticky convertía el header en bloque contenedor para sus descendientes `position: fixed`, por lo que el menú no cubría el viewport. Tampoco existía una acción de cierre inequívoca dentro del panel.

Corrección aplicada en esta rama: renderizado del backdrop y panel en `document.body`, capa a pantalla completa, cierre interno con nombre accesible, Escape, click en backdrop, cierre por navegación, bloqueo de scroll y restauración de foco.

### P2 — Tablet portrait tratado como móvil ampliado

A 768 × 1024, Carta, Contacto y FAQ no conservaban ninguna retícula de varias columnas; Home y Nosotros apenas una. La anchura disponible no se utilizaba y la lectura vertical se alargaba innecesariamente.

### P2 — Tablet landscape tratado como escritorio reducido

A 1024 × 768 aparecía la navegación completa de escritorio. La interfaz saltaba directamente de composición móvil a desktop y no ofrecía una familia específica para tablet landscape.

### P2 — Densidad vertical excesiva

En 390 × 844 Home alcanzaba aproximadamente 13.317 px y Carta 19.141 px. El problema principal era la suma de escenas con espaciado desktop, tarjetas altas y listas de carta con altura mínima sobredimensionada.

### P2 — Navegación de Carta

El índice sticky es útil, pero necesitaba una altura y separación ajustadas a los headers móvil y tablet, mejor affordance de desplazamiento horizontal y elementos táctiles consistentes.

### P3 — Dirección de arte de imágenes

`asset-019` es el LCP de Home y Reserva y ya tiene AVIF/WebP, `srcset`, dimensiones y prioridad correcta. La deuda está en el encuadre por familia, no en sustituir el pipeline ni cargar recursos nuevos.

## Señales positivas preservadas

- Ninguna ruta auditada presentó overflow horizontal.
- Todas las rutas principales mantuvieron un único `h1`.
- El escritorio de 1440 × 900 se usa como referencia protegida.
- El bloqueo de scroll del menú ya funcionaba.
- Los recursos críticos tienen dimensiones declaradas y variantes responsive.

## Criterios verificables de esta iteración

- Tres familias explícitas: 320–599, 600–899 y 900–1199 px.
- Navegación tipo drawer hasta 1199 px; navegación desktop desde 1200 px.
- Targets primarios de al menos 44 px.
- Sin overflow horizontal en 320, 390, 768, 1024 y 1440 px.
- Home, Carta y Reserva más compactas sin eliminar información verificable.
- Tablet portrait y landscape con composiciones propias.
- Escritorio ≥1200 px sin rediseño.
- Menú operable con touch y teclado, con cierre visible y restauración de foco.

## Estado

`IMPLEMENTATION_IN_PROGRESS`
