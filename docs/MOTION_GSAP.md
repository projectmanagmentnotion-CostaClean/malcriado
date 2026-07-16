# Sistema de movimiento GSAP

## Objetivo

Usar GSAP y ScrollTrigger para construir una experiencia inmersiva y editorial que refuerce la narrativa gastronómica. El movimiento debe guiar la mirada, revelar producto y dar ritmo; nunca debe ocultar información, bloquear la reserva o convertir la web en una demo técnica.

## Capas

1. **Microinteracción**: botones, enlaces, foco, feedback.
2. **Entrada de sección**: títulos, texto y medios.
3. **Narrativa de scroll**: escenas con ScrollTrigger.
4. **Transición de página**: breve y cancelable.
5. **Ambiental**: parallax, máscaras, grano o movimiento de vídeo, solo cuando el dispositivo lo soporte.

## Escenas propuestas

- Preloader corto basado en logo, con salida inmediata si los recursos críticos ya están listos.
- Hero con vídeo o imagen a pantalla completa, titular por capas y desplazamiento de escala leve.
- Marquee tipográfico de propuesta de valor, sin afectar lectura.
- Platos estrella con galería horizontal controlada por scroll solo en desktop; carrusel o lista nativa en móvil.
- Sección de fusión con split-screen y transición de máscaras.
- Escena frente al mar con imagen expandible y texto anclado.
- Carta con categorías pegajosas sin pinning excesivo.
- Especiales con cambio de contenido ligado al scroll y fallback estático.
- Reserva sin transformaciones complejas; máxima estabilidad y foco.

## Implementación

- `gsap.registerPlugin(ScrollTrigger)` una sola vez.
- `useGSAP()` con scope por sección.
- `ScrollTrigger.matchMedia()` o `gsap.matchMedia()` para desktop, touch y reduced motion.
- Destruir contextos, observers y triggers al desmontar.
- Usar timelines nombradas y funciones de creación testeables.
- Refrescar ScrollTrigger solo tras cambios de layout justificados.
- Lazy-load de módulos de animación no críticos.

## Reduced motion

Con `prefers-reduced-motion: reduce`:

- eliminar scrub, pinning, parallax, desplazamientos largos y autoplay no esencial;
- mostrar el estado final inmediatamente;
- conservar jerarquía, contenido, navegación y feedback;
- permitir vídeo manual cuando aporte información.

## Rendimiento

- Priorizar `transform` y `opacity`.
- Evitar filtros pesados continuos, grandes blur y múltiples vídeos simultáneos.
- Limitar elementos animados por escena.
- No usar ScrollTrigger para efectos que CSS puede resolver mejor.
- Medir en móvil de gama media y con CPU throttling.

## Criterio de aceptación por escena

Cada escena debe documentar objetivo, trigger, inicio/fin, variantes responsive, fallback sin JS, reduced motion, assets, coste de rendimiento y prueba visual.
