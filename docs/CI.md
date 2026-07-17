# CI

El pipeline vive en `.github/workflows/ci.yml` y se ejecuta en `push` a `main` y en `pull_request`.

## Pasos

1. checkout con `actions/checkout@v5`
2. Node 22 con cache npm usando `actions/setup-node@v5`
3. `npm ci`
4. `npm run format:check`
5. `npm run lint`
6. `npm run typecheck`
7. `npm run content:validate`
8. `npm run routes:validate`
9. `npm run seo:validate`
10. `npm run assets:verify`
11. `npm run test:run`
12. `npm run build`
13. instalacion de Chromium para Playwright
14. `npm run test:e2e`

## Concurrencia

La workflow cancela ejecuciones obsoletas del mismo ref para no acumular jobs.
