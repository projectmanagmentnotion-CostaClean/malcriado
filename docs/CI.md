# CI

El pipeline vive en `.github/workflows/ci.yml` y se ejecuta en `push` a `main` y en `pull_request`.

## Pasos

1. checkout con `actions/checkout@v4.2.2`
2. Node 22 con cache npm
3. `npm install`
4. `npm run lint`
5. `npm run typecheck`
6. `npm run test:run`
7. `npm run build`
8. instalacion de Chromium para Playwright
9. `npm run test:e2e`

## Concurrencia

La workflow cancela ejecuciones obsoletas del mismo ref para no acumular jobs.
