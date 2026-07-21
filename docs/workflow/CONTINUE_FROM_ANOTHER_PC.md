# Continuar desde otra PC

## Estado exacto para retomar

- Fase: `Fase 7 - Carta HTML y especiales`
- Rama activa: `codex/phase-7-menu-and-specials`
- Head de checkpoint conocido: `19a899e7177135806eb3c50ee91d0dad5dec309d`
- Pull Request: `#8 Phase 7: accessible HTML menu and specials`
- Estado remoto del checkpoint: draft abierto sobre `main` con CI `#19` `completed / success`
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
  - Actualizacion del PR `#8` con el head final del bloque
  - Verificacion del CI remoto tras el siguiente push
- Warnings actuales: `130`
- Bugs conocidos:
  - No hay bugs funcionales P0/P1 abiertos en este checkpoint local
  - La categoria `Vermut` sigue vacia y oculta al publico
- Siguiente tarea concreta:
  - Empujar el head final del bloque, actualizar el PR `#8` y esperar el CI remoto terminal

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
git switch codex/phase-7-menu-and-specials
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
git rev-parse origin/codex/phase-7-menu-and-specials
```

Condicion correcta:

- `git status` limpio
- SHA local igual al SHA remoto

## Trabajo pendiente exacto de Fase 7

- Verificar el draft PR remoto ya existente y actualizarlo con resultados reales
- Confirmar que el CI remoto sobre el head final se inicia y queda verde
- Mantener la deuda editorial documentada:
  - 44 precios pendientes
  - 44 alergenos pendientes
  - 38 descripciones pendientes
  - 3 legales pendientes
  - 1 categoria vacia oculta (`Vermut`)
- No iniciar todavia la Fase 8 en el mismo bloque
