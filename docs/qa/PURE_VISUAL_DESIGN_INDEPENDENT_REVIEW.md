# Revision independiente del rediseño visual

Fecha: 2026-07-22. PR: `#16`. Rama revisada: `codex/pure-visual-design-qa`. Head de entrada: `d5c9d287ecb2005f7cceb881536fc432a28aa841`.

## Veredicto

**GO técnico para merge, condicionado a CI remoto verde y PR listo para revisión. NO-GO operativo para producción:** este trabajo no autoriza despliegue. La puntuación visual final es **88/100** frente a 68/100 antes del rediseño.

El 88 está justificado porque el sistema dejó de parecer un dashboard o ecommerce: usa capítulos de fondo completo, reglas editoriales, fotografía con intención, pocas cajas y radios contenidos. Home, Carta, Nosotros y Reserva tienen composiciones distintas pero comparten Bodoni Moda, Manrope, paleta cálida, logo, grid, CTA y lenguaje fotográfico. No se eleva la nota por encima de 88 mientras falten prueba física iOS/Android, NVDA/VoiceOver, CWV p75 y una sesión real de sala/equipo.

## Hallazgos

| Prioridad | Hallazgo                                                                       | Evidencia                                   | Corrección                                                                      | Estado  |
| --------- | ------------------------------------------------------------------------------ | ------------------------------------------- | ------------------------------------------------------------------------------- | ------- |
| P0        | Ninguno                                                                        | 180 checks base y 28 extendidos sin bloqueo | —                                                                               | Cerrado |
| P1        | Carta no indicaba categoría activa y el salto podía rozar header + rail sticky | Prueba real sobre `#menu-category-pizzas`   | `aria-current`, seguimiento rAF, centrado del rail y `scroll-margin-top: 10rem` | Cerrado |
| P1        | Dos CTA de Carta medían 1.24:1 y el eyebrow naranja de Nosotros 2.31:1         | Axe móvil y desktop                         | Color oscuro contextual en Carta y blanco 4.5:1+ en Nosotros                    | Cerrado |
| P2        | Ninguno adicional con evidencia                                                | Comparación, matriz y Axe                   | —                                                                               | Cerrado |
| P3        | Hardware/AT real, CWV p75, EXIF completo y foto de sala/equipo                 | No sustituibles por emulación               | Aceptado y registrado                                                           | Abierto |

No quedan P0, P1 ni P2 abiertos.

## Puntuación por ruta

| Ruta       | Nota | Evaluación                                                                        |
| ---------- | ---: | --------------------------------------------------------------------------------- |
| Home       |   89 | Impacto claro, CTA visible, assets y contraste correctos                          |
| Carta      |   90 | Capítulos diferenciados, precio escaneable, sticky activo y sin cajas repetitivas |
| Nosotros   |   89 | Narrativa fotográfica, contraste corregido y cierre editorial                     |
| Reserva    |   88 | Progresión legible, formulario estable y ubicación separada                       |
| Especiales |   86 | Estado comercial honesto y consistente                                            |
| Contacto   |   88 | Canales y mapa consentido bien jerarquizados                                      |
| FAQ        |   88 | Lectura clara y navegación coherente                                              |
| Legales    |   86 | Tipografía y ancho de lectura estables                                            |
| 404        |   87 | Recuperación clara y visualmente integrada                                        |

## Comparación antes/después

- Home: se retiraron métricas y soportes con apariencia de dashboard; el hero conserva identidad, foto LCP y reserva dentro del primer impacto.
- Carta: pasa de tarjetas y avisos semicirculares repetidos a capítulos full-width, listas tipográficas, reglas, fondos alternos e índice sticky activo.
- Nosotros: pasa de apertura oscura y casi vacía a hero y galería con tres imágenes, ritmo editorial y contraste AA.
- Reserva: pasa de formulario continuo tipo administración a imagen, formulario agrupado y sección de ubicación independiente; no cambia la lógica de reserva.
- Evidencia: `docs/qa/screenshots/pure-visual-design/before-*.png`, matriz posterior y capturas extendidas bajo `docs/qa/screenshots/pure-visual-independent/`.

## Carta

El rail es sticky, horizontal en móvil, operable por teclado y touch, y mantiene visible la categoría activa. El salto a Pizzas deja sección y `h2` debajo del conjunto sticky. Los nombres, descripciones y precios conservan jerarquía; platos sin imagen siguen en HTML sin huecos; textos largos reflowean; alérgenos permanecen visibles y compactos. Landscape, viewport bajo y zoom 200 % no generan overflow.

## Reserva, mapa y privacidad

No se modificaron provider, esquema, canales ni datos. Preparar sigue sin enviar ni confirmar. WhatsApp, correo, copia y llamada mantienen fallbacks honestos; alergias solo entran en el mensaje con consentimiento específico.

En un contexto limpio se verificó:

1. antes de decidir: cero iframe y cero request de Google;
2. tras rechazar: placeholder y enlace simple disponibles;
3. tras aceptar `Contenido externo`: un iframe y request real a Google Maps;
4. tras revocar: iframe desmontado, placeholder restaurado y enlace simple presente.

No hay widget de reseñas, puntuaciones ni citas inventadas. La web solo enlaza a la ubicación/reseñas publicadas directamente en Google. No se observaron URLs externas con nombre, correo, teléfono, alergias o mensaje.

## Assets e imágenes

Se auditaron los 100 registros Drive: 98 JPG y 2 MP4. Los DSC de food truck no se presentan como restaurante. No hay originales Drive, nombres DSC, MP4, temporales ni contact sheets dentro de producción. `external-assets/` está ignorado. Las hojas de contacto viven solo en documentación. Las imágenes públicas usan AVIF/WebP, `srcset`, `sizes`, dimensiones y lazy loading fuera de LCP; no hay frames vacíos, roturas o duplicados nuevos.

`asset-019` es el LCP exacto en Home y Reserva. Usa preload responsive condicionado por ruta, `fetchpriority="high"`, eager, decode síncrono para el crítico y variantes 960/1440/1920. Lighthouse mantiene CLS 0.

## Tipografía, grid, color y motion

Bodoni Moda sostiene titulares; Manrope, lectura y controles. El grid usa gutters y contenedores compartidos sin convertir las rutas en una plantilla repetida. La capa de contraste corregida deja Axe limpio. GSAP continúa como progressive enhancement con `gsap.context`, cleanup y reduced motion; la categoría activa usa un solo rAF pasivo y se limpia al desmontar. No hay scroll hijacking, triggers adicionales ni contenido visible con opacidad residual.

## Dispositivos y accesibilidad

- Matriz base: 12 rutas × 15 viewports = 180/180.
- Extensión: 4 rutas × 7 escenarios = 28/28 (`844x390`, `1180x820`, `1280x560`, zoom 125/150/200 emulado y reduced motion).
- Axe: 12 rutas × móvil/escritorio = 24/24, cero violaciones.
- Consola/page errors: cero.
- Requests externos inesperados antes del consentimiento: cero.
- Teclado, foco, menú móvil, formularios, 404 y legales: conformes en automatización.

## Rendimiento, bundle y release

- Lighthouse móvil Home: 85, accesibilidad/buenas prácticas/SEO 100, LCP 4.134 s, CLS 0.
- Lighthouse móvil Reserva: 87, accesibilidad/buenas prácticas/SEO 100, LCP 3.687 s, CLS 0.
- Lighthouse desktop Home: 99, accesibilidad/buenas prácticas/SEO 100, LCP 0.893 s, CLS 0.
- Lighthouse desktop Reserva: 100, accesibilidad/buenas prácticas/SEO 100, LCP 0.768 s, CLS 0.
- El gate móvil tolera LCP de laboratorio hasta 4.5 s y sigue sin rebajarse. CWV p75 es P3.
- Candidato reproducible: 384 entradas; SHA-256 `801eda53fc0bec3dd3b16224b4c2fd1b7f4dd1397843fe3c9df2d3099f7cecc6`.
- El ZIP excluye `src`, `node_modules`, `.git`, tests, docs, screenshots, Lighthouse, variables privadas, source maps, rutas dev, mocks y datos reales.

## Evidencia reproducible

- `npm run qa:visual:independent`: 28 checks extendidos, 24 Axe, sticky y mapa; estado pass.
- `docs/qa/pure-visual-independent-results.json`: salida estructurada.
- `docs/qa/visual-matrix-results.json`: 180 checks base.
- Quality gates locales: format, lint, typecheck, content, assets, rutas, SEO, build y `qa` verdes; `git diff --check` limpio.
- Unit/component: 24 archivos y 82 tests pass. E2E: 45 pass y 5 skips esperados por proyecto.
- Bundle inicial: 178.4 KB frente a presupuesto de 500 KB; siete chunks de ruta y dos de GSAP.
- `npm audit`: cero vulnerabilidades. Release verify: 384 archivos/entradas, cero source maps, paths prohibidos o marcadores internos.
- CI remoto se registra al cerrar el PR.
