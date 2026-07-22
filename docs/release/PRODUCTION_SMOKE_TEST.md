# Smoke test de producción

## Estado

- Preview local de producción: `PASS` el 2026-07-22 en Chromium, servido desde el build final en `127.0.0.1:4173`.
- URL real: `NOT_DEPLOYED` hasta que exista evidencia de publicación.
- Smoke remoto: `BLOCKED_NO_AUTHENTICATED_HOSTING_SESSION`.

El recorrido automatizado local terminó con 43 pruebas aprobadas y 5 omitidas previstas. Incluyó rutas directas y 404, flujo de contacto, UUID abreviado, consentimiento específico de alergias, honeypot, reduced motion, zoom, ausencia de overflow y rutas `/dev/*` no disponibles.

## Rutas

Probar `/`, `/menu/`, `/especiales/`, `/nosotros/`, `/contacto/`, `/faq/`, `/reservar/`, `/aviso-legal/`, `/privacidad/`, `/cookies/`, `/declaracion-de-accesibilidad/` y una URL inexistente. En cada ruta comprobar navegación, acceso directo, refresh, back/forward, canonical, imágenes, fuentes, consola y red.

## Interacción

- Menú móvil con teclado y touch.
- Formulario: errores accesibles, referencia UUID abreviada y vista previa.
- Alergias ausentes por defecto y presentes solo tras marcar consentimiento.
- WhatsApp, correo, copia y llamada apuntan a canales públicos correctos.
- El correo muestra aviso de que solo se abrió la aplicación.
- Consentimiento, rechazo, personalización y mapa externo.
- Reduced motion, foco visible, zoom 200 % y ausencia de overflow.
- `/dev/assets/`, `/dev/content/`, `/dev/design-system/` y `/dev/reservations/` devuelven 404 en el build de producción.

Registrar navegador, dispositivo, hora, resultado y evidencia. Un smoke local no se presenta como smoke de producción.
