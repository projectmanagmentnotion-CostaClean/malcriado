# Diagnóstico CI de Fase 12A

Fecha: `2026-07-22`  
PR: `#13`  
Rama: `codex/phase-12a-content-and-own-reservations`

## Veredicto del `NO_FCP`

El fallo era exclusivo del recorrido Lighthouse de GitHub Actions. El artefacto remoto de la corrida `#42` fijó la causa: el build no tenía `VITE_PUBLIC_SITE_URL`; `src/lib/env.ts` entregaba `undefined` a Zod y lanzaba antes de montar React. El preview devolvía el shell HTML con 200, pero la página quedaba sin contenido y Lighthouse informaba correctamente `NO_FCP`.

El workflow anterior ejecutaba Lighthouse y E2E en un mismo job, por lo que el fallo cancelaba también QA funcional. El diagnóstico insuficiente ocultaba la excepción Zod. No se encontró un error de DNS, IPv4/IPv6, caché, service worker, `xvfb`, descarga de imagen ni cierre intencionado del servidor.

## Corrección

- `quality`, `e2e` y `lighthouse` son jobs independientes, sin `needs` ni `fail-fast` compartido.
- E2E y Lighthouse construyen y sirven `dist/`, no el dev server.
- El preview Lighthouse fija `127.0.0.1:4174`, `--strictPort` y comprueba que el puerto esté libre antes de arrancar.
- El health check exige HTTP 200, `text/html` y el marcador `#root` tanto en `/` como en `/reservar/`.
- El build sin `.env` usa el canonical verificado `https://malcriadobcn.com`; staging y despliegues siguen obligados a declarar su URL explícita.
- Playwright intenta confirmar después hidratación y heading visible antes de auditar.
- Si esa comprobación diagnóstica no ve el heading, lo registra junto con HTML, captura y consola sin impedir que Lighthouse ejecute su propio gate.
- El hero queda pintable antes de GSAP; movimiento y `prefers-reduced-motion` se conservan.
- El preloader solo opera en escritorio con movimiento permitido y nunca oculta la primera pintura móvil.
- Ambos LCP cargan `eager` y `fetchpriority="high"`.
- No se añadió ningún `sleep` fijo como solución. El polling de readiness es acotado y depende de respuestas reales.

## Diagnóstico persistido

El artefacto `lighthouse-diagnostics` se sube con `if: always()` y retención de 14 días. Incluye:

- `preview.log` y `preview-status.json` con PID, host, puerto e intentos;
- respuesta HTML y headers de Home y Reserva;
- HTML hidratado y capturas PNG;
- consola/errores de página y versión de Chromium;
- log de Chromium;
- log CLI y reportes Lighthouse JSON/HTML por ruta.

Como el directorio empieza por punto, el upload declara `include-hidden-files: true`; sin esa opción GitHub Actions v4 omite el contenido aunque exista.

## Matriz de hipótesis

| Hipótesis                              | Resultado                                                                                           |
| -------------------------------------- | --------------------------------------------------------------------------------------------------- |
| preview no preparado / readiness débil | corregido con HTTP 200 real + hidratación                                                           |
| puerto, hostname o IPv6                | fijado a IPv4 y puerto exclusivo; un preview huérfano local confirmó la necesidad de `--strictPort` |
| proceso background / cierre temprano   | PID y exit code vigilados; logs siempre preservados                                                 |
| Chromium / sandbox / `xvfb`            | Chromium de Playwright explícito, `--no-sandbox`; `xvfb` no es necesario en headless                |
| timeout                                | 45 s de carga y 30 s de readiness; no fue la causa local                                            |
| caché / service worker                 | no existe service worker registrado                                                                 |
| preloader / animación                  | riesgo preventivo corregido: ningún candidato crítico parte de opacidad cero                        |
| descarga o lazy loading del LCP        | descartado tras `eager` + prioridad alta; descarga local inferior a 6 ms                            |

Los umbrales siguen intactos: performance `>= 0.75`, accesibilidad/best-practices/SEO `= 1`, LCP `<= 4500 ms` y CLS `<= 0.11`.
