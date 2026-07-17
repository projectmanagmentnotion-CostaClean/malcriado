# Malcriado BCN - Website Rebuild

Nueva web oficial de Malcriado, restaurante de cocina fusion latinoamericana y mediterranea frente al mar en Pineda de Mar.

Este repositorio se trata como un proyecto nuevo. La web existente se usa unicamente como fuente auditada de marca, logos, fotografias, videos, carta, datos comerciales y contenido editorial. No se reutiliza ninguna base de datos ni arquitectura heredada.

## Objetivo

Construir una experiencia web inmersiva, rapida, accesible y orientada a conversion que:

- convierta visitas en reservas mediante un formulario claro;
- permita destacar platos, menus y ofertas por dia, semana o temporada;
- posicione Malcriado en busquedas locales de Pineda de Mar, Maresme y costa de Barcelona;
- reutilice y optimice todos los assets validos de la web actual;
- use GSAP y ScrollTrigger como sistema de movimiento, sin sacrificar rendimiento, accesibilidad ni navegacion;
- funcione de forma robusta en movil, tablet, escritorio y dispositivos con capacidades reducidas.

## Documentacion de gobierno

La ejecucion se rige por `AGENTS.md` y por los documentos de `/docs`. El orden obligatorio de lectura para Codex es:

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

Fase 0, Fase 1, Fase 2 y Fase 3 cerradas en local.

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
- Pipeline de assets con auditoria, manifiesto enriquecido, derivados responsive y ruta interna `/dev/assets/`.
- Modelo editorial tipado con validacion Zod, scripts de auditoria y ruta interna `/dev/content/`.

En Fase 2 quedaron implementados:

- `scripts/assets/audit.mjs`, `scripts/assets/build.mjs` y `scripts/assets/verify.mjs`.
- Manifiesto tipado en `src/content/assets/asset-manifest.json`.
- Componentes `ResponsiveImage` y `ResponsiveVideo`.
- Catalogo interno `/dev/assets/` con `noindex, nofollow`.
- Documentacion operativa de duplicados, crops, performance, marca y recuperacion de video.

En Fase 3 quedaron implementados:

- `src/content/` como dominio editorial tipado para negocio, carta, ofertas, historia, legales y SEO.
- Pages y layout reconectados al modelo unico sin hardcodes comerciales legacy.
- Scripts `npm run content:validate` y `npm run content:report`.
- Ruta interna `/dev/content/` con resumen operativo del modelo.
- Tests para helpers de negocio, selectores de ofertas, guardas de assets y validacion editorial.

La home inmersiva final y las escenas GSAP completas pertenecen a la Fase 6 del roadmap.
