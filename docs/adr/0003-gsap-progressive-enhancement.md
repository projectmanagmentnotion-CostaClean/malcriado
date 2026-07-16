# ADR 0003: GSAP Progressive Enhancement

- Estado: `Accepted`

## Contexto

El proyecto quiere una experiencia inmersiva, pero el movimiento no puede comprometer accesibilidad, SEO ni conversión.

## Decisión

GSAP y ScrollTrigger se aplicarán solo como progressive enhancement sobre contenido HTML completo y navegable sin animación.

## Alternativas consideradas

- Experiencia fuertemente dependiente de JS y scroll scenes.
- Animaciones CSS limitadas sin GSAP.

## Consecuencias

- Mejor control de reduced motion y de fallbacks.
- Mayor trabajo de diseño de estados base.

## Riesgos

- Sobrecoste si no se limita el número de escenas.
- Tentación de recrear efectos del sitio heredado sin medir impacto.

