# Producción responsive y multidispositivo

## Enfoque

Mobile-first, progressive enhancement y diseño por capacidades. La experiencia debe conservar contenido, navegación y conversión en cualquier tamaño; las escenas avanzadas se añaden solo cuando hay espacio, potencia y preferencias compatibles.

## Matriz mínima

| Clase | Viewports de control | Uso |
|---|---:|---|
| Móvil compacto | 320, 360 | mínimos reales, textos largos y teclado abierto |
| Móvil estándar | 390, 430 | iPhone/Android actuales |
| Tablet | 768, 820, 1024 | portrait y landscape |
| Desktop | 1280, 1440 | portátil y monitor estándar |
| Wide | 1728, 1920 | límites de lectura y escala visual |

Los breakpoints se definirán por necesidad del contenido, no por marcas de dispositivos.

## Reglas de layout

- Sin scroll horizontal involuntario a 320 px.
- Contenido principal con ancho legible; medios pueden sangrar de forma controlada.
- Usar grid y flex con `minmax()`, `clamp()` y container queries cuando mejoren aislamiento.
- Reservar espacio de imagen y vídeo para impedir CLS.
- Respetar safe areas en iOS.
- Navegación y CTA fijo no pueden tapar formulario, cookies o contenido final.
- Soportar zoom de navegador al 200 % y reflow equivalente.

## Touch y entrada

- Objetivos táctiles de tamaño suficiente y separación clara.
- Sin acciones exclusivas de hover.
- Teclados virtuales no deben ocultar el campo activo ni el botón de envío.
- Inputs usan tipos y `autocomplete` correctos.
- Gestos horizontales tienen alternativa visible y no compiten con scroll de página.

## Medios

- `picture` y `srcset` para imágenes responsive.
- Variantes de encuadre documentadas por asset.
- Vídeos con poster, `playsinline`, silencio cuando haya autoplay y controles cuando proceda.
- No descargar vídeo de desktop en móvil si la escena usa imagen estática.

## QA por sección

Cada sección se aprueba en:

1. 320 px sin overflow.
2. 390 px con navegación y CTA.
3. Tablet portrait y landscape.
4. Desktop estándar.
5. 200 % de zoom.
6. Reduced motion.
7. Teclado completo.
8. Con JS de animación desactivado o fallando.

## Navegadores

Últimas versiones estables y una anterior de Chrome, Edge, Firefox y Safari; Safari iOS y Chrome Android en dispositivos reales o servicios equivalentes. Las incompatibilidades deben degradar con elegancia, no romper funcionalidad.
