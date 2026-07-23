# Monitorización posterior al lanzamiento

## Línea base

- Lanzamiento: 2026-07-22 16:12 CEST.
- URL: `https://malcriadobcn.com/`.
- Estado inicial: `GO`, smoke remoto verde.
- Control de 24 horas: 2026-07-23, a partir de las 16:12 CEST.
- Control de 7 días: 2026-07-29, a partir de las 16:12 CEST.
- Backup operativo: SiteGround `production-before-launch-20260722-1528` y copia local con SHA-256 `479fe7dbe6c8d04d1337f6206289e9c184531c9fd6ed3016a140d26ca4beac`.

## Primeras 24 horas

Revisar disponibilidad, 4xx/5xx, recursos críticos, canonical/robots/sitemap, errores de consola, solicitudes de contacto reportadas por el equipo, funcionamiento de WhatsApp/correo, consentimiento y rendimiento móvil. No activar analítica sin base legal y consentimiento implementado.

Comparar Home y Contacto con el hash/tamaño del shell publicado para detectar una eventual reaparición de HTML WordPress cacheado. Si ocurre, purgar Dynamic Cache y escalar si reaparece después de la purga.

## A los 7 días

Revisar Search Console, indexación, CWV de campo cuando haya datos suficientes, páginas no encontradas, consultas comerciales, incidencias de accesibilidad y feedback del equipo. Comparar horarios, carta, precios y canales con la operativa real.

La línea base Lighthouse remota es Home móvil 91/LCP 3,42 s, Reserva móvil 92/LCP 3,28 s, Home escritorio 99/LCP 0,62 s y Reserva escritorio 77/LCP 1,87 s; CLS 0 y el resto de categorías 100 en las cuatro mediciones. No interpretar una única ejecución de laboratorio como p75 de campo.

## Alertas y privacidad

La monitorización técnica no debe capturar nombres, teléfonos, correos, comentarios, alergias ni URLs `wa.me`/`mailto:` completas. Registrar únicamente métricas agregadas y errores sin PII. Documentar propietario, frecuencia y umbral antes de activar cualquier proveedor.

## Nueva linea base visual — 2026-07-23

El rediseño se publico a las 10:21 CEST y quedo verificado a partir de las 10:33 CEST. Mantener como punto de rollback `production-before-visual-redesign-20260723-0948.zip` y la carpeta `public_html_before_visual_redesign_20260723_0948/`.

Linea base Lighthouse: Home movil 93/LCP 3,05 s, Reserva movil 92/LCP 3,27 s, Home escritorio 99/LCP 0,70 s y Reserva escritorio 100/LCP 0,70 s; accesibilidad, buenas practicas y SEO 100, CLS 0. Vigilar especialmente LCP movil como P3 de campo y confirmar que Dynamic Cache no reintroduce el build anterior.
