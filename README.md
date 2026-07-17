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

Fase 0, Fase 1, Fase 2, Fase 3, Fase 4, Fase 5 y Fase 6 cerradas en local.

Fase 7 queda cerrada tecnicamente en local y pendiente de publicacion remota del draft PR:

- carta HTML editorial por categorias reales
- especiales con estado `active`, `upcoming`, `expired` y `empty`
- deep links de categoria y anchors de plato
- slug `margarita` resuelto con identidad publica unica
- shell visual abierto consolidado en rutas publicas secundarias
- JSON-LD ampliado para `Menu`, `MenuSection`, `MenuItem` y `Offer`
- QA local completo de lint, typecheck, build, tests, SEO, bundle y responsive

## Hitos implementados

- Vite + React + TypeScript estricto en la raiz del repositorio.
- Routing accesible con shell publico y shell interno `/dev/`.
- SEO base, canonical, sitemap, redirects y JSON-LD extensible.
- Abstraccion de reservas sustituible.
- Base GSAP segura para React y reduced motion.
- Tests con Vitest, Testing Library, Axe y Playwright.
- Home inmersiva final organizada por escenas.
- Pipeline de assets con auditoria, manifiesto enriquecido, derivados responsive y ruta interna `/dev/assets/`.
- Modelo editorial tipado con validacion Zod, scripts de auditoria y ruta interna `/dev/content/`.
- Sistema de diseno con tokens, tipografia autocontenida y catalogo `/dev/design-system/`.
- Carta HTML, especiales honestos y documentacion especifica de Fase 7 en `docs/menu/` y `docs/qa/`.

## Calidad conocida

- `content:validate`: `0` errores, `130` warnings
- `test:run`: `42/42`
- `test:e2e`: `26` passed, `4` skipped
- `bundle:budget`: pass
- Axe: `0` violaciones en escenarios de Fase 7 auditados en preview

## Siguiente bloque

El siguiente bloque funcional del roadmap, una vez publicada la Fase 7, es `Fase 8 - Reserva`.
