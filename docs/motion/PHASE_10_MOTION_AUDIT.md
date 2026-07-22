# Fase 10 - Motion polish y lifecycle GSAP

## Alcance cerrado

- Auditoria de escenas GSAP existentes sin rehacer direccion artistica.
- Reduccion de trabajo innecesario en `ScrollTrigger`.
- Estabilidad en `resize`, `orientationchange`, `pageshow`, back/forward y navegacion rapida.
- Preservacion de accesibilidad, contenido sin JS y reduced motion.

## Inventario auditado

### Home

- `useHomePageMotion`
- Preloader
- Hero intro
- Header theme transitions
- Featured rail parallax
- Scene reveals
- Scene media parallax

### Carta

- `useMenuPageMotion`
- Hero intro
- Category reveal scenes
- Category media parallax en desktop

### Shell global

- Header movil
- CTA persistente
- Focus restoration via routing shell

## Hallazgos iniciales

### P1 corregidos

1. Reduced motion en Home seguia creando header triggers.
2. Carta anadia listeners manuales de `focus`, `blur`, `mouseenter` y `mouseleave` sin cleanup dedicado.
3. Carta refrescaba `ScrollTrigger` al montar sin justificar el coste.

### P2 corregidos

1. Triggers dependientes de viewport sin `invalidateOnRefresh`.
2. Falta de un lifecycle comun para refrescar `ScrollTrigger` tras `resize`, orientacion y `pageshow` persistido.
3. Parallax de Carta ejecutandose en viewports pequenos sin aportar valor suficiente.

### Deuda aceptada

1. No se introduce nueva narrativa ni nuevas escenas; solo se pule lifecycle.
2. No hay pasada humana con lector de pantalla real en esta fase.
3. Lighthouse final puede variar levemente por CPU local y preload de assets, pero el objetivo es ausencia de regresion bloqueante.

## Correcciones implementadas

- Nuevo helper `src/motion/utilities/scrollTriggerLifecycle.ts`.
- `Home` deja de crear escenas `ScrollTrigger` cuando `prefers-reduced-motion: reduce`.
- Triggers de Home y Carta usan `invalidateOnRefresh` en escenas dependientes de viewport.
- `Menu` elimina listeners manuales y delega el emphasis visual a CSS existente.
- `Menu` limita el parallax de media a `min-width: 901px`.
- `ScrollTrigger.refresh()` pasa a ejecutarse solo por lifecycle real:
  - `resize`
  - `orientationchange`
  - `pageshow` con `persisted`
- Nueva cobertura:
  - unit test de lifecycle
  - smoke E2E de navegacion rapida entre rutas

## Triggers y pins

### Antes

- Home: triggers activos tambien en reduced motion para el header.
- Carta: triggers de reveal y parallax mas listeners manuales de navegacion.
- Pins: `0` conocidos.

### Despues

- Home: `0` escenas GSAP en reduced motion.
- Carta: reveals y parallax solo donde aportan valor; sin listeners huerfanos.
- Pins: `0`.

## Matriz de validacion prevista

- `320x568`
- `390x844`
- `430x932`
- `768x1024`
- `820x1180`
- `1024x768`
- `1366x768`
- `1440x900`
- `1728x1117`
- `1920x1080`

## Criterio de cierre

- Sin overflow nuevo.
- Sin perdida de foco con teclado.
- Sin triggers duplicados tras navegacion rapida.
- Sin escenas activas en reduced motion.
- Sin errores de consola relevantes.
- Sin regresion bloqueante en Home, Carta, Reservar o consentimiento.

## Resultados reales

- `npm run qa`: verde
- `npm run test:e2e`: `47 passed / 5 skipped`
- `npm run bundle:budget`: `pass`
- `git diff --check`: limpio
- Browser audit en `http://127.0.0.1:5173/`:
  - Home, Carta y Reservar cargan en pestaña limpia de Malcriado
  - back/forward mantiene rutas correctas
  - `data-route-heading` visible en Carta y Reservar
  - sin warnings ni errores relevantes de consola

## Lighthouse de produccion

Artefactos:

- `docs/qa/phase10-lighthouse-home.json`
- `docs/qa/phase10-lighthouse-menu.json`

Resultados:

| Ruta     | Performance | Accessibility | Best Practices | SEO   | LCP      | TBT     | CLS     |
| -------- | ----------- | ------------- | -------------- | ----- | -------- | ------- | ------- |
| `/`      | `97`        | `100`         | `100`          | `100` | `745 ms` | `17 ms` | `0.093` |
| `/menu/` | `99`        | `100`         | `100`          | `100` | `897 ms` | `0 ms`  | `0.014` |

## Deuda aceptada al cierre

- Falta pasada humana con lector de pantalla real.
- La matriz de orientacion y resize repetido queda principalmente cubierta por smoke E2E, reduced motion y validacion viva puntual; no se genero una bateria separada de screenshots por cada giro de dispositivo.
- Los `130` warnings editoriales y legales siguen fuera del alcance de motion polish.
- La revision independiente del 2026-07-22 no detecta deuda tecnica P0/P1/P2 en motion, pero mantiene deuda visual P3:
  - `/contacto/` conserva un bloque de resumen con `border-left` y padding (`.contact-hero__summary`) que sigue transmitiendo una sensacion mas encajonada que el resto del sistema.
  - Home aprovecha bien el ancho disponible, aunque algunas superficies secundarias siguen usando separadores superiores y radios amplios como recurso editorial.
  - Esta deuda no bloquea merge tecnico porque no introduce overflow, perdida de foco, regresion de motion ni incumplimiento automatico de accesibilidad.

## Revision independiente final

Fecha: `2026-07-22`

- PR `#11`: abierto, `draft`, mergeable.
- Head auditado: `34be06536402b1cc69b15e54a3ad51ab9ded877b`.
- CI remoto mas reciente:
  - workflow: `ci`
  - run id: `29902894763`
  - evento: `pull_request`
  - estado: `completed / success`
  - actualizado: `2026-07-22T08:11:51Z`
- Veredicto independiente: `APPROVED_WITH_DOCUMENTED_DEBT`
