# Malcriado BCN — Website Rebuild

Nueva web oficial de Malcriado, restaurante de cocina fusión latinoamericana y mediterránea frente al mar en Pineda de Mar.

Este repositorio se trata como un proyecto nuevo. La web existente se usa únicamente como fuente auditada de marca, logos, fotografías, vídeos, carta, datos comerciales y contenido editorial. No se reutiliza ninguna base de datos ni arquitectura heredada.

## Objetivo

Construir una experiencia web inmersiva, rápida, accesible y orientada a conversión que:

- convierta visitas en reservas mediante un formulario claro;
- permita destacar platos, menús y ofertas por día, semana o temporada;
- posicione Malcriado en búsquedas locales de Pineda de Mar, Maresme y costa de Barcelona;
- reutilice y optimice todos los assets válidos de la web actual;
- use GSAP y ScrollTrigger como sistema de movimiento, sin sacrificar rendimiento, accesibilidad ni navegación;
- funcione de forma robusta en móvil, tablet, escritorio y dispositivos con capacidades reducidas.

## Documentación de gobierno

La ejecución se rige por `AGENTS.md` y por los documentos de `/docs`. El orden obligatorio de lectura para Codex es:

1. `AGENTS.md`
2. `docs/PRODUCT_STRATEGY.md`
3. `docs/INFORMATION_ARCHITECTURE.md`
4. `docs/DESIGN_SYSTEM.md`
5. `docs/MOTION_GSAP.md`
6. `docs/RESPONSIVE_PRODUCTION.md`
7. `docs/ACCESSIBILITY_EU_LEGAL.md`
8. `docs/SEO_LOCAL.md`
9. `docs/ASSET_MIGRATION.md`
10. `docs/ROADMAP.md`
11. `docs/QUALITY_GATES.md`

## Estado

Fase 0 completada y Fase 1 cerrada a nivel de bootstrap tecnico.

La base actual ya incluye:

- Vite + React + TypeScript estricto en la raiz del repositorio.
- Routing provisional accesible.
- SEO base y JSON-LD inicial.
- Abstraccion de reservas sustituible.
- Base GSAP segura para React y reduced motion.
- Tests con Vitest, Testing Library, Axe y Playwright.
- CI para format, lint, typecheck, tests y build.
- Home provisional organizada por escenas.
- Documentos creativos para direccion artistica, storyboard de motion y presupuesto GSAP.

La home inmersiva final y las escenas GSAP completas pertenecen a la Fase 6 del roadmap.
