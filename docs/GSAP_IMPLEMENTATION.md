# GSAP Implementation

## Principios aplicados en Fase 1

- Registro unico de plugins en `src/motion/config/gsap.ts`.
- Hook de preferencia de reduced motion en `src/motion/hooks/useReducedMotion.ts`.
- Hook de contexto para escenas futuras en `src/motion/hooks/useGsapContext.ts`.
- Utilidad de capacidad para degradacion progresiva en `src/motion/utilities/motionCapabilities.ts`.

## Estado actual

Fase 1 no introduce escenas complejas ni `ScrollTrigger` extensivo. Solo deja la infraestructura necesaria para que Fase 6 y Fase 10 incorporen motion sin mezclar timelines dentro de paginas.

## Regla operativa

Toda escena futura debe:

1. registrar plugins mediante `ensureGsapRegistration()`;
2. respetar `prefers-reduced-motion`;
3. limpiar contextos y triggers;
4. no bloquear scroll, foco ni lectura del DOM sin JavaScript.
