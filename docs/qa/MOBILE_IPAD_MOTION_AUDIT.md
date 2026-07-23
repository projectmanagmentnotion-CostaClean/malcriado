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

No se añadieron nuevas escenas ni pinning. Las imágenes de las escenas existentes se animan dentro de su propio recorte mediante `scale` y `translate`, con `scrub: 0.35`, sin mover el contenedor ni alterar el layout. El progreso queda ligado al scroll y es reversible: al volver al mismo `scrollY`, la matriz CSS recupera exactamente el estado anterior.

El contenido permanece visible sin GSAP y `prefers-reduced-motion` evita crear estos triggers.

## QA

- Tests `reducedMotion` y `scrollTriggerLifecycle`: verdes.
- E2E de ida/vuelta: la transformación cambia al bajar y cambia de nuevo al subir.
- Verificación visual a 390 × 844: retorno de `matrix(1.0303, ..., 6.59991)` a `matrix(1.04, ..., 0.00146296)` en el mismo punto de scroll.
- Matriz visual capturada con reduced motion para comparaciones estables.
- Sin scroll hijacking ni bloqueo de scroll fuera del drawer abierto.

## Pendiente humano

Safari/iOS real, cambio de orientación repetido y hardware de gama baja deben validarse antes del despliegue.
