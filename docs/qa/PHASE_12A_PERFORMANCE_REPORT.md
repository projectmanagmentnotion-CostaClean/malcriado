# Rendimiento Fase 12A

Fecha: `2026-07-22`  
Entorno: `vite preview`, Chromium móvil Lighthouse, build de producción.

## Resultado reproducible local

| Ruta    | Antes | Después | LCP antes | LCP después | CLS antes | CLS después |
| ------- | ----: | ------: | --------: | ----------: | --------: | ----------: |
| Home    |    78 |      82 |   4386 ms |     4396 ms |     0,102 |           0 |
| Reserva |    84 |      85 |   3935 ms |     4000 ms |     0,003 |           0 |

La variación de LCP de Reserva está dentro del ruido de laboratorio. La mejora demostrada es de estabilidad y descubrimiento: ambos recursos son eager, tienen prioridad alta y su descarga tarda menos de 6 ms. El preload de los subsets latinos de Bodoni Moda y Manrope elimina el cambio de fuente que concentraba todo el CLS de Home.

## Elementos LCP exactos

- Home: `section#home-hero > div.home-hero__media > picture.home-hero__background > img` (`asset-019`, variante AVIF responsive).
- Reserva: `figure.media-frame > div.media-frame__media > picture > img` (`asset-019`, variante AVIF responsive).

## Investigación

- prioridad: corregida con `fetchpriority="high"`;
- lazy loading: corregido en Reserva; ambos LCP usan `loading="eager"`;
- responsive/compresión: AVIF/WebP, `srcset`, `sizes` y dimensiones declaradas; la red no domina el LCP;
- fuentes: dos preloads críticos eliminan CLS sin retirar tipografía ni resolución;
- preloader: desactivado en móvil y con reduced motion; limitado a escritorio;
- GSAP/contenido oculto: hero y texto crítico ya no nacen con opacidad cero;
- JS inicial: sigue siendo el principal límite de laboratorio porque el HTML inicial es un shell SPA y el navegador descubre el hero tras arrancar React;
- accesibilidad/SEO: `100/100`; reduced motion y contenido DOM se conservan.

El breakdown medido en Home fue TTFB `~4 ms`, espera del recurso `~76 ms`, descarga `~5 ms` y render del elemento `~155 ms`. El valor Lighthouse simulado cercano a 4,4 s procede principalmente de FCP/arranque bajo throttling, no de un asset de cuatro segundos.

## Deuda aceptada

P3: medir CWV p75 en staging y dispositivo real. Si no cumple LCP `<= 2,5 s`, evaluar prerender/SSR del shell y reducción del grafo inicial antes de producción. No se rebaja el gate anti-regresión de este PR y el lanzamiento a producción permanece `NO-GO`.
