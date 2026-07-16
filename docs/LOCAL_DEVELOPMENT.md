# Local Development

## Requisitos

- Node 20.19+ o 22.x
- npm

## Arranque

1. copiar `.env.example` a `.env`
2. definir `VITE_PUBLIC_SITE_URL`
3. ejecutar `npm install`
4. ejecutar `npm run dev`

## Comandos clave

- `npm run qa`: lint + typecheck + unit/integration + build
- `npm run qa:full`: `qa` + Playwright
- `npm run test:e2e:ui`: depuracion visual local de Playwright

## Notas

- El proyecto se monta en la raiz del repositorio.
- Los assets verificados de Fase 0 se sirven desde `public/assets/source/`.
- El formulario de reserva actual es solo una abstraccion provisional y no confirma disponibilidad real.
