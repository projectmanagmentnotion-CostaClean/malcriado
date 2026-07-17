# Phase 6 Live Baseline

- Date: 2026-07-17 12:36:08 +02:00
- Commit: `57deb4eabbb1d317db1a40770e611718ff56bb9c`
- Branch: `codex/phase-6-immersive-home-gsap`
- Browser surface: Codex in-app browser
- Preview method: local Vite dev server with network host enabled
- Start command: `npm run dev -- --host 0.0.0.0 --port 4173`
- Stop command: `Stop-Process -Id 13212`
- Local URL: `http://localhost:4173/`
- Network URL: `http://172.20.10.2:4173/`
- Viewports reviewed:
  - `1440x900`
  - `390x844`

## Initial Environment Status

- `npm install` completed without dependency errors.
- First launch exposed a real environment failure: `VITE_PUBLIC_SITE_URL` was undefined in development.
- Resolution applied before baseline validation: local `.env` created from repo convention with `VITE_PUBLIC_SITE_URL=http://127.0.0.1:4173`.
- After Vite restart, the home rendered correctly and the clean baseline no longer reported console errors.

## Live Checks

### Network and startup

- `http://127.0.0.1:4173/`: `200`
- `http://172.20.10.2:4173/`: `200`
- Approximate HTML response time from PowerShell:
  - local: `70 ms`
  - network: `68 ms`

### Desktop baseline (`1440x900`)

- Title: `Malcriado | Cocina fusion frente al mar en Pineda de Mar`
- `h1`: `Cocina fusion latinoamericana y mediterranea frente al mar.`
- Header theme: `overlay`
- Horizontal overflow: `false`
- Console warnings/errors: none in the clean baseline tab
- Visible baseline observations:
  - provisional home still reads as stacked editorial sections rather than an immersive scene system;
  - hero has the correct commercial hierarchy and CTA presence, but the visual rhythm is still Phase 5/provisional;
  - the page already exposes real functional entry points for `Reservar`, `Carta`, `WhatsApp` and footer contact.

### Mobile baseline (`390x844`)

- Title: `Malcriado | Cocina fusion frente al mar en Pineda de Mar`
- `h1`: `Cocina fusion latinoamericana y mediterranea frente al mar.`
- Header theme: `overlay`
- Horizontal overflow: `false`
- Console warnings/errors: none in the clean baseline tab
- Visible baseline observations:
  - current mobile experience is stable and readable, but not yet differentiated as a Phase 6 mobile-specific narrative;
  - CTA density is already high enough that the future scene system will need careful pacing to avoid visual noise;
  - no immediate blocker was observed for touch-first progression.

## Problems Detected Before Phase 6 Work

### P0

- Missing local `VITE_PUBLIC_SITE_URL` blocked rendering on the first dev launch.
  - Impact: the home could not be reviewed visually.
  - Fix applied immediately through local environment setup.
  - Closure criterion: keep local preview boot instructions and environment requirements explicit during the sprint.

### P1

- The current home is structurally functional but still provisional in scene orchestration, motion, and art direction.
  - Impact: Phase 6 has no immersive narrative yet.
  - Closure criterion: replace the current stacked composition with a documented scene architecture.

### P2

- `Vermut` still appears with `0 items` in the public baseline.
  - Impact: weakens first-pass perception of menu curation.
  - Closure criterion: decide whether the category should remain visible in the home entry point during Phase 6.

## Evidence

- `docs/qa/evidence/phase-6-baseline/desktop-1440x900.png`
- `docs/qa/evidence/phase-6-baseline/mobile-390x844.png`

## Exact Next Block

Read the remaining mandatory Phase 6 documents and then produce:

- `docs/home/CURRENT_HOME_AUDIT.md`

That audit will be the gate before any scene refactor or GSAP redesign work begins.
