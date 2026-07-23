# Auditoría de movimiento móvil e iPad

## Arquitectura comprobada

- GSAP y ScrollTrigger se cargan de forma diferida y se registran en un único módulo.
- Home y Carta usan `gsap.context()` y `gsap.matchMedia()`.
- Los triggers tienen ciclo de cleanup probado.
- `useReducedMotion` escucha cambios en `prefers-reduced-motion`.
- El vídeo evita autoplay cuando reduced motion está activo.
- Carta cambia scroll suave por `auto` con reduced motion.
- El menú mantiene duraciones casi instantáneas con reduced motion.

## Decisión de esta iteración

No se añadieron nuevas escenas ni parallax. La mejora responsive procede de composición CSS, no de movimiento que retrase lectura. El contenido permanece visible sin GSAP.

## QA

- Tests `reducedMotion` y `scrollTriggerLifecycle`: verdes.
- Matriz visual capturada con reduced motion para comparaciones estables.
- Sin scroll hijacking ni bloqueo de scroll fuera del drawer abierto.

## Pendiente humano

Safari/iOS real, cambio de orientación repetido y hardware de gama baja deben validarse antes del despliegue.
