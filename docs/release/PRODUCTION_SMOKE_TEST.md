# Smoke test de producción

## Estado

- URL real: `https://malcriadobcn.com/`.
- Despliegue: 2026-07-22 16:12 CEST.
- Resultado final: `PASS — GO`.
- Build desplegado: SHA-256 `b43ef4ff6d395b820067641a15883a174256dfba9b7e16f061e6c87004ae997a`.
- Navegadores automatizados: Chromium escritorio y Pixel 7 emulado.

## Rutas y servidor

Respondieron HTTP 200 y el mismo shell SPA de 1.805 bytes: `/`, `/menu/`, `/especiales/`, `/nosotros/`, `/contacto/`, `/faq/`, `/reservar/`, `/aviso-legal/`, `/privacidad/`, `/cookies/`, `/declaracion-de-accesibilidad/` y `/ruta-inexistente-prueba/`. La última muestra la experiencia 404 lógica de la aplicación.

`robots.txt`, `sitemap.xml`, manifest, favicon, fuentes e imágenes responden correctamente. Se verificaron acceso directo, refresh, back/forward, menú móvil, foco inicial, zoom 200 %, reduced motion, ausencia de overflow y bloqueo de `/dev/*`.

HTTP redirige con 301 a HTTPS y `www` redirige con 301 a `https://malcriadobcn.com/`. Canonical de Home y Reserva es correcto. Open Graph y JSON-LD se verifican en el DOM hidratado. Gzip y caché anual están activos para el CSS con hash.

## Reservas y privacidad

- Modo activo: `contact`.
- Preparar una solicitud no realiza fetch, persistencia, Supabase, SMTP, webhook ni backend.
- WhatsApp, correo, copia y llamada requieren acciones explícitas.
- No aparece una confirmación automática falsa; el estado es `prepared_for_contact` y explica que la reserva sigue pendiente.
- La referencia UUID se genera correctamente.
- Las alergias quedan fuera de WhatsApp/correo salvo consentimiento específico.
- Teléfono y correo de la persona no aparecen en URLs externas ni en la URL de la página.
- Honeypot, validación y consentimiento funcionaron en producción.

## QA remoto

- Playwright: 45 aprobadas, 5 omitidas previstas, 0 fallos.
- Axe: 0 violaciones WCAG 2.2 AA en Home/Reserva, escritorio, móvil y reduced motion.
- Consola: 0 errores.
- Errores de página: 0.
- Requests externos inesperados: 0; no se observaron Supabase ni endpoints backend.

| Superficie | Rendimiento | Accesibilidad | Buenas prácticas | SEO | LCP | CLS |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| Home móvil | 91 | 100 | 100 | 100 | 3.421 ms | 0 |
| Reserva móvil | 92 | 100 | 100 | 100 | 3.280 ms | 0 |
| Home escritorio | 99 | 100 | 100 | 100 | 615 ms | 0 |
| Reserva escritorio | 77 | 100 | 100 | 100 | 1.873 ms | 0 |

El elemento LCP exacto de Home es `section#home-hero … picture.home-hero__background > img`, servido como `asset-019/landscape-960.avif` en móvil y `landscape-1440.avif` en escritorio. En Reserva es `figure.media-frame … picture > img`, `asset-019/landscape-960.avif`. Ambos usan `loading="eager"` y `fetchpriority="high"`; no causan CLS.

Lighthouse generó los cuatro JSON/HTML sin `runtimeError`. El CLI devolvió `EPERM` únicamente al limpiar carpetas temporales de Chrome en Windows después de escribir los informes; se mantiene como deuda P3 de tooling. El LCP móvil superior a 2,5 s sigue como deuda P3 ya aceptada y no representa una regresión grave respecto al laboratorio local.

## Incidencias y decisión

Se detectó contenido WordPress antiguo en Home y Contacto por Dynamic Cache tras el intercambio. La purga manual fue confirmada por SiteGround y la repetición devolvió el build nuevo en todas las rutas. No quedaron P0 ni P1 abiertos y no se ejecutó rollback.

Decisión final: `GO`. Mantener los backups y ejecutar los controles de 24 horas y 7 días definidos en `POST_LAUNCH_MONITORING.md`.

## Repeticion tras rediseño visual — 2026-07-23

- Resultado: `PASS — GO`, sin rollback.
- Head: `8ee7ebb93ee1eecf0dbd7b0c78deae77a75b0116`.
- Build: SHA-256 `801eda53fc0bec3dd3b16224b4c2fd1b7f4dd1397843fe3c9df2d3099f7cecc6`.
- Rutas: Home, Carta, Especiales, Nosotros, Contacto, FAQ, Reserva, legales y 404 logica respondieron con el shell nuevo.
- SEO: `robots.txt`, `sitemap.xml`, manifest, assets con hash, canonical hidratado y rutas directas conformes.
- Interaccion: menú móvil, teclado, refresh, historial, zoom 200 %, reduced motion y Carta sticky conformes.
- Reserva: 45 E2E aprobadas, 5 omitidas previstas, 0 fallos; WhatsApp, correo, copia y llamada siguen siendo acciones explicitas sin persistencia ni confirmacion falsa.
- Privacidad: alergias requieren consentimiento; mapa bloqueado antes del consentimiento y desmontado tras revocarlo; cero Supabase/backend, PII, errores de consola o requests inesperadas.
- Axe: 24/24 superficies, cero violaciones.

| Superficie | Rendimiento | Accesibilidad | Buenas prácticas | SEO | FCP | LCP | CLS | TBT |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Home móvil | 93 | 100 | 100 | 100 | 1.701 ms | 3.051 ms | 0 | 0 ms |
| Reserva móvil | 92 | 100 | 100 | 100 | 1.715 ms | 3.270 ms | 0 | 5 ms |
| Home escritorio | 99 | 100 | 100 | 100 | 420 ms | 699 ms | 0 | 0 ms |
| Reserva escritorio | 100 | 100 | 100 | 100 | 403 ms | 697 ms | 0 | 0 ms |

Lighthouse escribio los cuatro JSON validos. El `EPERM` posterior al intentar limpiar temporales de Chrome en Windows no invalida los informes y queda como P3 de tooling.
