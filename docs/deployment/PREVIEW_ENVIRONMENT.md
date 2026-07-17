# Preview Environment

Fecha: 2026-07-17
Estado: `local preview activo para Fase 6`

## Comando base

`npm run dev -- --host 0.0.0.0 --port 4173`

## URLs

- local: `http://localhost:4173/`
- loopback: `http://127.0.0.1:4173/`
- network: `http://172.20.10.2:4173/`

## Variable local necesaria

`.env`

- `VITE_PUBLIC_SITE_URL=http://127.0.0.1:4173`

## Motivo de esta variable

`src/lib/env.ts` exige `VITE_PUBLIC_SITE_URL` fuera del modo de test. Sin ella, la app no renderiza correctamente en desarrollo.

## Observacion operativa

La URL responde correctamente por shell local. El bloqueo actual no esta en Vite, sino en la sesion del navegador integrado usada para QA.
