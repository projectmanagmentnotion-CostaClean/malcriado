# Auditoría de navegación móvil e iPad

## Header

- Mobile: 68 px nominales, logo limitado y safe areas preservadas.
- Tablet: 76 px nominales, sin header móvil sobredimensionado.
- Drawer hasta 1199 px; navegación horizontal desde 1200 px.
- La navegación sticky de Carta usa el token de altura correspondiente y no queda bajo el header.

## Menú

El defecto de producción estaba causado por `backdrop-filter` en el header sticky: los descendientes `fixed` quedaban contenidos por el header. El panel y su backdrop ahora se renderizan en `document.body`.

Verificado a 390 × 844:

- backdrop y panel cubren el viewport;
- botón X interno visible, con nombre `Cerrar menu movil`;
- bloqueo de scroll;
- cierre por X, toggle, backdrop, Escape y enlace;
- restauración de foco al trigger;
- cierre al cambiar de ruta;
- capas por encima del shell.
- acciones comerciales apiladas a ancho completo, con 56 px de alto y sin salto de línea forzado;
- separación vertical entre `Reservar mesa` y `WhatsApp`, sin solapamiento.

## Carta

- Rail sticky compacto con chips horizontales.
- Categoría activa mediante `aria-current="location"`.
- Desvanecido lateral que comunica contenido desplazable.
- Offset dependiente del header.
- Scroll suave solo cuando no hay reduced motion.

## Riesgo residual

Back/forward, rotación y navegación se cubren en Chromium automatizado. Safari iOS y Chrome Android reales siguen siendo una comprobación humana requerida antes de producción.
