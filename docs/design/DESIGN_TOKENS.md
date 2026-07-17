# Design Tokens

## Estructura

Los tokens de Fase 4 viven en `src/styles/tokens/`:

- `colors.css`
- `typography.css`
- `spacing.css`
- `sizing.css`
- `layout.css`
- `radius.css`
- `borders.css`
- `shadows.css`
- `motion.css`
- `z-index.css`

## Color

- Base oscura: `charcoal` y `smoke` derivados de la direccion artistica nocturna.
- Respiracion clara: `ivory` y `sand` para texto y pausas editoriales.
- Acento principal: `terracotta` inspirado en fuego, salsa y producto.
- Acento secundario: `teal coast` para mar, noche y contraste cromatico.
- Apoyo: `gold` muy medido para calidez y jerarquia.

### Tokens semanticos principales

- `--color-bg-base`
- `--color-bg-elevated`
- `--color-bg-editorial`
- `--color-fg-base`
- `--color-fg-secondary`
- `--color-fg-muted`
- `--color-border-subtle`
- `--color-border-strong`
- `--color-accent-primary`
- `--color-accent-secondary`
- `--color-danger`
- `--color-success`
- `--color-warning`
- `--color-focus`
- `--color-overlay`
- `--color-scrim`
- `--color-surface-warm`
- `--color-surface-night`
- `--color-surface-coast`

## Tipografia

- Display: `Bodoni Moda Variable`
- Body/navigation/forms: `Manrope Variable`
- Ambos tokens estan definidos en `typography.css`.

## Espaciado

- Escala base: `2xs` a `5xl`
- Escalas de seccion:
  - `--space-section-compact`
  - `--space-section-base`
  - `--space-section-spacious`
  - `--space-section-scene`

## Layout

- `--layout-width-base`
- `--layout-width-editorial`
- `--layout-width-reading`
- `--layout-width-wide`
- gutters con safe areas incluidas

## Motion

- `instant`
- `fast`
- `base`
- `slow`
- `editorial`

La Fase 4 deja el presupuesto y el lenguaje de motion listos sin introducir aun escenas ScrollTrigger complejas.
