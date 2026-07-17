# Phase 6 Live Progress

Fecha: 2026-07-17
Branch: `codex/phase-6-immersive-home-gsap`

## Estado del bloque actual

- baseline vivo inicial: completado
- home inmersiva reescrita en codigo: completado
- motion GSAP estable en codigo: completado
- test especifico de home: completado
- build: completado
- lint: completado
- typecheck: completado
- QA visual local: completada
- accessibility audit base: completada
- bundle diagnosis y optimizacion segura: completados

## Cierre de la iteracion

La QA final se cerro sobre `http://127.0.0.1:4173/` con Playwright local y contraste vivo adicional en navegador integrado.

## Evidencia cerrada

- capturas top:
  - `docs/qa/evidence/phase-6-qa/desktop-1920x1080-final-top.png`
  - `docs/qa/evidence/phase-6-qa/laptop-1366x768-final-top.png`
  - `docs/qa/evidence/phase-6-qa/tablet-820x1180-final-top.png`
  - `docs/qa/evidence/phase-6-qa/mobile-320x568-final-top.png`
  - `docs/qa/evidence/phase-6-qa/mobile-430x932-final-top.png`
- captura footer mobile:
  - `docs/qa/evidence/phase-6-qa/footer-mobile-390x844-final.png`
- reduced motion:
  - `docs/qa/evidence/phase-6-qa/reduced-motion-390x844-final.png`
- verificado en mobile:
  - burger visible solo en viewport mobile
  - CTA persistente visible en hero y oculto junto al footer
  - footer sin overflow horizontal detectado
- verificado en desktop:
  - primer foco de teclado en `Saltar al contenido principal`
  - home sin overflow horizontal
  - CTA persistente fuera del viewport desktop util
- verificado en reduced motion:
  - preloader en estado `data-active="false"` y `aria-hidden="true"` sin depender de secuencia larga

## Validacion tecnica cerrada en esta iteracion

- `npm run format:check`
- `npm run test:run`
- `npm run typecheck`
- `npm run lint`
- `npm run build`
- `npm run content:validate`
- `npm run routes:validate`
- `npm run seo:validate`
- `npm run assets:verify`
- `npm run bundle:budget`
- `npm run test:e2e`
- `npm run qa`

## Nota de accesibilidad

- `axe` sigue sin violaciones serias o criticas en home y design system
- apertura y cierre del menu mobile por teclado validados con `Enter` y `Escape`, con foco devuelto a `Abrir menu`
- queda solo el limite normal de no haber hecho una pasada manual humana con lector de pantalla real
