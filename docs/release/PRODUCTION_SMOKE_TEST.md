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
