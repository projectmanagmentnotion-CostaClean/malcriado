# Malcriado BCN — web oficial

Reconstrucción profesional de Malcriado, restaurante de cocina fusión latinoamericana y mediterránea frente al mar en Pineda de Mar. Es un proyecto nuevo en Vite, React y TypeScript; la web anterior solo se usa como fuente auditada de contenido y assets.

## Estado

Fases 0–12B cerradas. La web está publicada en [malcriadobcn.com](https://malcriadobcn.com/) desde el 2026-07-22 y la Fase 12C registra la verificación post-lanzamiento:

- reserva operativa por WhatsApp y correo, sin backend ni persistencia;
- Zod, UUID, honeypot y consentimiento específico para alergias;
- proveedor estable con modos `contact`, `api` y `disabled`;
- build SiteGround reproducible, ZIP y checksums;
- rutas internas excluidas del build de producción;
- runbooks de backup, despliegue, rollback, smoke y monitorización.

El smoke remoto cerró con 45 E2E aprobadas, Axe sin violaciones en las superficies auditadas, canonical/SSL/redirecciones correctos y sin requests externas inesperadas. El backup anterior y el rollback permanecen disponibles durante la estabilización.

El rediseño visual integrado en `main` `8ee7ebb93ee1eecf0dbd7b0c78deae77a75b0116` se publico el 2026-07-23. El artefacto de 384 entradas (`801eda53fc0bec3dd3b16224b4c2fd1b7f4dd1397843fe3c9df2d3099f7cecc6`) paso de nuevo 45 E2E, 24 auditorias Axe y 28 escenarios responsive/zoom/reduced-motion en produccion. SiteGround Dynamic Cache fue purgada y el backup previo al rediseño permanece verificable.

No existe Supabase, base de datos, SMTP, webhook o función serverless. `api` es arquitectura futura inactiva. Preparar una solicitud no afirma que se haya enviado, almacenado o confirmado.

## Desarrollo

Requisitos: Node `>=20.19.0`, npm y Chromium para Playwright.

```bash
npm ci
copy .env.example .env
npm run dev -- --host 127.0.0.1
```

Variables no secretas:

```dotenv
VITE_PUBLIC_SITE_URL=http://127.0.0.1:5173
VITE_RESERVATION_MODE=contact
VITE_RESERVATION_API_URL=
VITE_ENABLE_DEV_ROUTES=true
VITE_ENABLE_ANALYTICS=false
VITE_STAGING_NOINDEX=false
```

## QA

```bash
npm run qa
npm run test:e2e
npm run bundle:budget
npm run lighthouse:ci
npm audit
git diff --check
```

`qa` incluye formato, lint, TypeScript, contenido, rutas, SEO, assets, tests y build.

## Producción

```bash
npm ci
npm run qa
npm run release:build
```

Salidas locales ignoradas por Git:

- `release/malcriado-production/`
- `release/malcriado-production.zip`
- `release/malcriado-production.sha256`

El build fuerza `https://malcriadobcn.com`, reservas `contact`, dev routes/analytics desactivados e indexación de producción. Consulta [PRODUCTION_BUILD.md](docs/release/PRODUCTION_BUILD.md) y [PRODUCTION_DEPLOYMENT.md](docs/release/PRODUCTION_DEPLOYMENT.md).

## Gobierno

La ejecución se rige por `AGENTS.md`, `docs/ROADMAP.md`, los ADR y el resto de `/docs`. No se inventan precios, horarios, alérgenos, ingredientes, promociones o identidad jurídica. Los datos legales ausentes se omiten y requieren revisión final del titular/profesional competente.
