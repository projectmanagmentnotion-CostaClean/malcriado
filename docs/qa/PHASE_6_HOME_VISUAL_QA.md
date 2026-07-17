# Phase 6 Home Visual QA

Fecha: 2026-07-17
Base URL: `http://127.0.0.1:4173/`
Estado: `completado sobre estado actual de Fase 6`

## Matriz de viewports

| Viewport  | Estado | Notas                               |
| --------- | ------ | ----------------------------------- |
| 320x568   | PASS   | sin incidencias visuales relevantes |
| 360x800   | PASS   | sin incidencias visuales relevantes |
| 390x844   | PASS   | sin incidencias visuales relevantes |
| 430x932   | PASS   | sin incidencias visuales relevantes |
| 768x1024  | PASS   | sin incidencias visuales relevantes |
| 820x1180  | PASS   | sin incidencias visuales relevantes |
| 1024x768  | PASS   | sin incidencias visuales relevantes |
| 1280x800  | PASS   | sin incidencias visuales relevantes |
| 1366x768  | PASS   | sin incidencias visuales relevantes |
| 1440x900  | PASS   | sin incidencias visuales relevantes |
| 1728x1117 | PASS   | sin incidencias visuales relevantes |
| 1920x1080 | PASS   | sin incidencias visuales relevantes |

## Evidencia final retenida

- `docs/qa/evidence/phase-6-qa/desktop-1920x1080-final-top.png`
- `docs/qa/evidence/phase-6-qa/laptop-1366x768-final-top.png`
- `docs/qa/evidence/phase-6-qa/tablet-820x1180-final-top.png`
- `docs/qa/evidence/phase-6-qa/mobile-320x568-final-top.png`
- `docs/qa/evidence/phase-6-qa/mobile-430x932-final-top.png`
- `docs/qa/evidence/phase-6-qa/footer-mobile-390x844-final.png`
- `docs/qa/evidence/phase-6-qa/reduced-motion-390x844-final.png`

## Navegacion viva

- recarga en mitad de pagina tras scroll: `6133px`
- orientacion landscape mobile: `844px`, overflow `false`
- menu mobile por teclado: body locked `true`, cierre con Escape aria-expanded `false`, foco devuelto a `Abrir menu`
- primer foco capturado en automatizacion: `A Saltar al contenido principal` href `#main-content`

## Reduced motion

- preloader activo tras recarga en reduced motion: `false`
- preloader aria-hidden tras recarga en reduced motion: `true`

## Consola y red

- none
