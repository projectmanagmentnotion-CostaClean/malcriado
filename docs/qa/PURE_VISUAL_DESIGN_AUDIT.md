# Pure visual design audit

Fecha: 2026-07-22. Rama: `codex/pure-visual-design-qa`. Base: `15696c88e1071fdb3d57257c946ce82d80041b20`.

## Veredicto

La base era funcional y reconocible, pero Carta, Nosotros y Reserva acumulaban densidad, patrones de panel y encuadres vacios que reducian la calidad percibida. La revision y su auditoria independiente eliminan los P0/P1/P2 visuales detectados sin cambiar reserva, datos, SEO o backend. Resultado final: **88/100**, frente a **68/100** antes de la intervencion.

## Produccion auditada

- `https://malcriadobcn.com/` respondio `200` con el SPA nuevo.
- Huella observada: `/assets/index-CMr03ZJf.js` y `/assets/index-CrADe8Zx.css`.
- `/wp-login.php` devolvio el shell SPA, no WordPress.
- No aparecieron menu, cookies ni horarios de la web heredada.
- La revision visual se implemento solo en local; no se desplego produccion.

## Hallazgos y correcciones

| Prioridad | Hallazgo                                                           | Correccion                                                                         | Resultado                                       |
| --------- | ------------------------------------------------------------------ | ---------------------------------------------------------------------------------- | ----------------------------------------------- |
| P0        | Carta desbordaba hasta `865 px` entre 320 y 820 px                 | Contencion inline y rail horizontal interno                                        | Sin scroll horizontal en la repeticion          |
| P1        | Dos escenas pedian crops inexistentes y producian marcos vacios    | Crop valido `editorial` para `asset-026` y `portrait` para `asset-017`             | Cero media frames vacios                        |
| P1        | Carta repetia cajas semicirculares de alergenos y parecia catalogo | Capitulos full-width, reglas editoriales y estado alergeno compacto                | Lectura escaneable sin ocultar la advertencia   |
| P1        | Reserva parecia formulario administrativo continuo                 | Imagen estable, formulario sin paneles redondeados y seccion de ubicacion separada | Jerarquia de conversion mas clara               |
| P1        | Nosotros tenia un primer viewport casi negro y sin relato visual   | Hero fotografico valido y galeria de tres imagenes                                 | Mayor contraste y evidencia gastronomica        |
| P2        | Home mostraba estadisticas tipo dashboard y CTA bajo el pliegue    | Hero limpio, escala tipografica menor y soportes secundarios retirados             | CTA visible y primera impresion mas directa     |
| P2        | Navegacion de Carta no acompanaba una pagina larga                 | Indice sticky, desplazable y accesible                                             | Salto inmediato entre nueve categorias          |
| P2        | Banner de consentimiento dominaba la pantalla                      | Panel compacto y limitado en desktop/movil                                         | Mantiene decision informada sin tapar la pagina |
| P2        | React descubria y decodificaba tarde el LCP de Home y Reserva      | Preload AVIF responsive por ruta y decode sincronico solo para imagenes eager      | Descubrimiento y pintura criticos mas tempranos |
| P1        | CTA claros de Carta y eyebrow de Nosotros no alcanzaban 4.5:1      | Color contextual oscuro en Carta y blanco en la galeria naranja                    | Axe limpio en las 12 rutas, movil y desktop     |
| P1        | El salto de Carta no indicaba categoria activa y rozaba el sticky  | `aria-current`, seguimiento de scroll, rail centrado y margen de anclaje de 10 rem | Categoria y encabezado visibles tras el salto   |

## Puntuacion por ruta

| Ruta           | Antes | Despues | Estado    |
| -------------- | ----: | ------: | --------- |
| `/`            |    72 |      89 | Corregida |
| `/menu/`       |    58 |      90 | Corregida |
| `/especiales/` |    78 |      86 | Conforme  |
| `/nosotros/`   |    54 |      89 | Corregida |
| `/contacto/`   |    82 |      88 | Conforme  |
| `/faq/`        |    82 |      88 | Conforme  |
| `/reservar/`   |    57 |      88 | Corregida |
| Legales        |    80 |      86 | Conforme  |
| `404`          |    80 |      87 | Conforme  |

## Evidencia

- Antes: `screenshots/pure-visual-design/before-*.png`.
- Despues: capturas completas en `screenshots/pure-visual-design/*-{390x844,1440x900}.jpg` y extremos 320/2560 para rutas principales.
- Matriz machine-readable: `visual-matrix-results.json`.

## Accesibilidad y rendimiento

- Axe independiente: cero violaciones en las 12 rutas relevantes, escritorio y movil (24 auditorias); cero errores de consola, `pageerror`, PII o requests externos inesperados antes del consentimiento.
- Lighthouse movil, Home: `85/100/100/100`, LCP `4.136 s`, CLS `0`.
- Lighthouse movil, Reserva: `87/100/100/100`, LCP `3.692 s`, CLS `0`.
- Lighthouse escritorio, Home: `99/100/100/100`, LCP `0.896 s`, CLS `0`.
- Lighthouse escritorio, Reserva: `100/100/100/100`, LCP `0.771 s`, CLS `0`.
- El LCP exacto de Home es la imagen AVIF responsive `asset-019` del hero. En Reserva es la imagen AVIF responsive `asset-019` que introduce el formulario. Ambas usan `loading="eager"`, `fetchpriority="high"`, `srcset`, `sizes` y dimensiones declaradas.
- El preload por ruta hace descubrible el LCP desde el documento inicial y GSAP deja de competir con la primera pintura. El LCP movil de laboratorio mejora `408 ms` frente al fallo remoto de `4.548 s`, sin rebajar el gate. Medir CWV p75 y evaluar prerender siguen como P3.

## Candidato de release

- ZIP reproducible local tras la revision independiente: SHA-256 `801eda53fc0bec3dd3b16224b4c2fd1b7f4dd1397843fe3c9df2d3099f7cecc6`.
- Verificacion: `384` archivos, `384` entradas, cero source maps, rutas prohibidas o marcadores internos.
- El checksum historico documentado para la version actualmente publicada no se modifica. Este candidato visual no se ha desplegado.

## Limites

La matriz es Chromium emulado. NVDA/VoiceOver y los dispositivos iOS/Android fisicos quedan como P3 humano. La fuente Drive se inventario sin atribuir escenas del food truck al restaurante. El detalle reproducible de cierre esta en `PURE_VISUAL_DESIGN_INDEPENDENT_REVIEW.md` y `pure-visual-independent-results.json`.
