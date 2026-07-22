# Continuar desde otra PC

## Estado exacto para retomar

- Fase: `Fase 11 - QA integral`
- Rama activa: `codex/phase-11-integral-qa`
- Head: comprobar con `git rev-parse HEAD` tras el pull de la rama
- Pull Request: `#12` draft abierto sobre `main`
- Estado local del checkpoint: quality gates verdes, documentacion de QA integral creada y CI remoto ya verificado en verde sobre el head auditado
- Gates verdes:
  - `npm run format:check`
  - `npm run lint`
  - `npm run typecheck`
  - `npm run content:validate` con `0` errores y `130` warnings editoriales pendientes
  - `npm run content:report`
  - `npm run assets:verify`
  - `npm run routes:validate`
  - `npm run seo:validate`
  - `npm run test:run`
  - `npm run build`
  - `npm run test:e2e`
  - `npm run qa`
  - `git diff --check`
- Gates pendientes:
  - revision independiente final del PR
  - decision de sacar el PR de draft o mantenerlo abierto
- Warnings actuales: `130`
- Bugs conocidos:
  - No hay bugs funcionales P0/P1/P2 nuevos abiertos en este checkpoint local
  - La categoria `Vermut` sigue vacia y oculta al publico
  - Home en `320x568` mantiene una medicion menor de ancho documental sin scroll horizontal real
- Siguiente tarea concreta:
  - empujar el head final del bloque, abrir el draft PR de Fase 11 y esperar el CI remoto terminal

## Requisitos

- Node `20.19.0` o superior
- npm `10+`
- Git
- Navegador Chromium actual para Playwright

## Variables de entorno

El proyecto solo requiere una variable local no secreta:

```bash
VITE_PUBLIC_SITE_URL=http://127.0.0.1:5173
```

- Archivo de ejemplo: `.env.example`
- Archivo local: `.env`
- No se sube ningun secreto en Git

## Clonar y retomar

```bash
git clone https://github.com/projectmanagmentnotion-CostaClean/malcriado.git
cd malcriado
git fetch --all --prune
git switch codex/phase-11-integral-qa
npm ci
copy .env.example .env
```

Actualiza `.env` para desarrollo local:

```bash
VITE_PUBLIC_SITE_URL=http://127.0.0.1:5173
```

Arranque habitual:

```bash
npm run dev -- --host
```

URL habitual de desarrollo:

- `http://127.0.0.1:5173/`

Preview de produccion local:

```bash
npm run build
npm run preview -- --host 127.0.0.1 --port 4173
```

## Comandos de QA

```bash
npm run format:check
npm run lint
npm run typecheck
npm run content:validate
npm run content:report
npm run assets:verify
npm run routes:validate
npm run seo:validate
npm run test:run
npm run build
npm run test:e2e
npm run qa
git diff --check
```

## Que no se sube por seguridad o portabilidad

- `node_modules/`
- `dist/`
- `test-results/`
- `.vite/`
- `*.log`
- `*.pid`
- `*.tsbuildinfo`
- `.env`

## Como comprobar que el repo esta sincronizado

```bash
git status
git branch -vv
git rev-parse HEAD
git rev-parse origin/codex/phase-11-integral-qa
```

Condicion correcta:

- `git status` limpio
- SHA local igual al SHA remoto

## Trabajo pendiente exacto de Fase 11

- Completar la revision independiente del PR `#12`
- Mantener o actualizar la documentacion segun el veredicto final
- Confirmar que el CI remoto sigue verde sobre cualquier head posterior a la revision
- Mantener la deuda documentada:
  - 44 precios pendientes
  - 44 alergenos pendientes
  - 38 descripciones pendientes
  - 3 legales pendientes
  - 1 categoria vacia oculta (`Vermut`)
- No iniciar todavia la Fase 12 en el mismo bloque
