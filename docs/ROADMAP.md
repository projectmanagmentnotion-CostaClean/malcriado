# Roadmap maestro

Este documento es la columna vertebral del desarrollo. Cada fase se cierra con codigo, documentacion, QA, commit y push. No se avanza ocultando fallos de la fase anterior.

## Fase 0 - Gobierno y descubrimiento

**Objetivo:** fijar reglas, estrategia y alcance.

- [x] Crear `AGENTS.md`.
- [x] Documentar estrategia de producto y conversion.
- [x] Definir arquitectura, diseno, motion, responsive, legal, SEO y assets.
- [x] Completar inventario tecnico de la web actual.
- [x] Capturar todas las URLs, metadatos, redirecciones y assets.
- [ ] Validar datos comerciales y legales con el titular.

**Salida:** base documental aprobada y backlog de contenido pendiente.

### Resultado del sprint

- Auditoria actual: [audit/CURRENT_SITE_AUDIT.md](audit/CURRENT_SITE_AUDIT.md)
- Inventario de contenido: [content/CONTENT_INVENTORY.md](content/CONTENT_INVENTORY.md)
- Inventario de assets: [assets/ASSET_MANIFEST.md](assets/ASSET_MANIFEST.md)
- Mapa de URLs: [seo/URL_MIGRATION_MAP.md](seo/URL_MIGRATION_MAP.md)
- Validacion del titular: [content/OWNER_VALIDATION_CHECKLIST.md](content/OWNER_VALIDATION_CHECKLIST.md)
- Backlog: [BACKLOG.md](BACKLOG.md)
- Riesgos: [audit/RISK_REGISTER.md](audit/RISK_REGISTER.md)
- ADRs: [adr/0001-static-first-architecture.md](adr/0001-static-first-architecture.md), [adr/0002-content-as-typed-local-data.md](adr/0002-content-as-typed-local-data.md), [adr/0003-gsap-progressive-enhancement.md](adr/0003-gsap-progressive-enhancement.md), [adr/0004-reservation-provider-abstraction.md](adr/0004-reservation-provider-abstraction.md), [adr/0005-current-site-assets-as-migration-source.md](adr/0005-current-site-assets-as-migration-source.md)

## Fase 1 - Bootstrap tecnico

- [x] Inicializar Vite + React + TypeScript estricto.
- [x] Instalar GSAP, `@gsap/react` y testing.
- [x] Configurar ESLint, Prettier, Vitest y Playwright.
- [x] Crear tokens, reset, shell, rutas y estructura oficial.
- [x] Configurar CI para format, lint, typecheck, test y build.
- [x] Anadir variables de entorno documentadas sin secretos.
- [x] Documentar direccion artistica, storyboard de motion y presupuesto inicial GSAP.

**Aceptacion:** build limpio, pruebas base verdes y estructura alineada con AGENTS.

### Resultado de la Fase 1

- Arquitectura creada: Vite + React + TypeScript estricto en ESM con aliases, shell de rutas, contenido tipado y separacion por `app`, `pages`, `components`, `content`, `motion`, `services`, `styles` y `test`.
- Stack: React 18, React Router, GSAP, `@gsap/react`, `react-helmet-async`, Zod, ESLint, Prettier, Vitest, Testing Library, Axe y Playwright.
- Scripts: `dev`, `build`, `preview`, `format`, `format:check`, `lint`, `lint:fix`, `typecheck`, `test`, `test:run`, `test:coverage`, `test:e2e`, `test:e2e:ui`, `qa`, `qa:full`.
- Rutas creadas: `/`, `/menu/`, `/especiales/`, `/nosotros/`, `/reservar/`, `/aviso-legal/`, `/privacidad/`, `/cookies/` y 404.
- Base GSAP: registro unico de plugins, hook de reduced motion, hook de contexto y utilidades de capacidad sin escenas complejas fuera del alcance de Fase 1.
- Direccion artistica: home provisional organizada por escenas, lenguaje visual inicial y documentacion creativa inspirada en la referencia auditada sin copiar identidad ni composiciones exactas.
- Documentos creativos: `docs/creative/ART_DIRECTION.md`, `docs/creative/MOTION_STORYBOARD.md` y `docs/creative/GSAP_SCENE_BUDGET.md`.
- Pruebas ejecutadas: `npm run format:check`, `npm run lint`, `npm run typecheck`, `npm run test:run`, `npm run build`, `npm run test:e2e`, `npm run qa`.
- Resultados exactos: todas las comprobaciones anteriores verdes en local al cierre de la fase.
- Deuda pendiente: contenido comercial validado, optimizacion real de assets, home inmersiva completa, escenas GSAP finales y reserva integrada con proveedor real.
- Aclaracion de alcance: la home inmersiva real y las escenas GSAP completas pertenecen a la Fase 6, no a esta Fase 1.

## Fase 2 - Migracion y optimizacion de assets

- [x] Auditar los assets fuente existentes y documentar su estado real.
- [x] Crear manifiesto enriquecido y trazabilidad tipada.
- [x] Detectar duplicados exactos y definir master por grupo.
- [x] Generar derivados responsive para imagenes aprobadas.
- [x] Validar logos y favicons dentro del pipeline.
- [x] Exponer catalogo interno `/dev/assets/` para revision tecnica y editorial.
- [ ] Recuperar los MP4 originales bloqueados por `SG-Captcha`.
- [ ] Generar posters y variantes finales de video desde los originales.

**Aceptacion:** ningun asset critico sin origen, dimensiones, alt/rol y variante optimizada.

### Resultado de la Fase 2

- Scripts creados: `npm run assets:audit`, `npm run assets:build` y `npm run assets:verify`.
- Inventario actual: 27 assets fuente auditados, 1 grupo de duplicados detectado y 23 assets aceptados para produccion local.
- Derivados generados: 322 variantes en `public/assets/optimized/`.
- Peso de variantes primarias: `912025` bytes en el manifiesto actual.
- Ruta interna: `/dev/assets/` protegida con `noindex, nofollow`.
- Documentos producidos: `docs/assets/ASSET_MANIFEST.md`, `DUPLICATE_REPORT.md`, `IMAGE_OPTIMIZATION.md`, `ART_DIRECTION_CROPS.md`, `BRAND_ASSET_GUIDE.md`, `VIDEO_RECOVERY_STATUS.md`, `ASSET_PERFORMANCE_BUDGET.md`, `docs/creative/ASSET_SCENE_MAPPING.md` y `docs/content/PHOTO_VIDEO_SHOT_LIST.md`.
- Bloqueos remanentes: dos MP4 publicos siguen inaccesibles por `SG-Captcha`; no se han podido extraer posters ni versiones finales de video sin recibir los originales.

## Fase 3 - Contenido y modelo editorial

- [x] Crear fuentes tipadas para negocio, menu, ofertas, FAQ y testimonios.
- [x] Migrar contenido real y corregir erratas verificadas.
- [x] Modelar vigencia de ofertas.
- [x] Preparar estados de contenido pendiente.
- [x] Validar estructura del contenido, dejando pendientes editoriales explicitos.

**Aceptacion:** cero contenido comercial duplicado y cero datos inventados.

### Resultado de la Fase 3

- Dominio editorial consolidado en `src/content/`.
- Legacy retirado: `siteContent.ts`, `homeScenes.ts` y `structuredData.ts`.
- Nuevas rutas: `/contacto/` y `/dev/content/`.
- Validacion Zod y scripts: `content:validate`, `content:report`.
- Estado actual: `0` errores estructurales y `92` warnings editoriales conocidos.
- Deuda abierta: precios, alergenos, legales, horarios por dia y ciertas taxonomias ambiguas.

## Fase 4 - Sistema de diseno

- [x] Tokens completos.
- [x] Tipografia y escala fluida.
- [x] Botones, enlaces, formularios y navegacion.
- [x] MediaFrame, DishCard, OfferCard y layouts.
- [x] Estados y documentacion visual.
- [x] Accesibilidad de componentes base.

**Aceptacion:** componentes operables por teclado y consistentes en la matriz responsive.

### Resultado de la Fase 4

- Tokens centralizados en `src/styles/tokens/`.
- Paleta semantica documentada en `docs/design/DESIGN_TOKENS.md`.
- Tipografia autocontenida con `Bodoni Moda Variable` y `Manrope Variable`.
- Componentes UI, layouts, media, comida, ofertas y formularios base implementados.
- Navegacion visual preparada con menu movil editorial y estados para evoluciones futuras.
- Catalogo interno `/dev/design-system/` disponible con `noindex, nofollow`.
- Pruebas: `28` tests unitarios verdes, Axe verde en home, reservar y design system, Playwright ampliado para el catalogo.
- Responsive y accesibilidad documentados en `docs/design/ACCESSIBILITY_MATRIX.md` y `docs/design/RESPONSIVE_DESIGN_RULES.md`.
- Deuda abierta: optimizacion futura de subsets de fuentes, estado definitivo del header en escenas GSAP reales y contenido editorial aun pendiente de validacion.
- Preparacion para GSAP: HTML, tokens, layouts y componentes listos para Fase 6 sin rehacer el sistema base.

## Fase 5 - Shell, navegacion y SEO tecnico

- [x] Header desktop/movil.
- [x] CTA de reserva persistente y no invasivo.
- [x] Footer completo.
- [x] Routing, canonical, sitemap, robots y 404.
- [x] Metadata, Open Graph y JSON-LD base.
- [x] Redirecciones desde URLs antiguas.

**Aceptacion:** navegacion completa con teclado, sin JS de animacion y con metadatos validos.

## Fase 6 - Home inmersiva

- [x] Hero y preloader.
- [x] Especial activo.
- [x] Platos estrella.
- [x] Narrativa de fusion.
- [x] Experiencia frente al mar.
- [x] Historia del chef.
- [x] Prueba social.
- [x] Bloque de reserva y ubicacion.
- [x] Variantes reduced motion y movil.

**Aceptacion:** narrativa completa, CTA claro, sin bloqueo de scroll y Core Web Vitals dentro del presupuesto de laboratorio.

### Resultado de la Fase 6

- Escenas implementadas: 10 escenas inmersivas y editoriales sobre `HomePage`, mas preloader de primera visita.
- Assets visibles en home: hero, especial, fusion, platos, costa y noche servidos desde el manifiesto tipado; el video sigue fuera del alcance por bloqueo de origen.
- GSAP: carga diferida, registro unico, `matchMedia`, cleanup al desmontar y sin pinning.
- ScrollTriggers medidos en dev:
  - mobile estable: `26`
  - desktop estable: `27`
  - pins: `0`
- Reduced motion: sin reveals ni parallax; preloader cerrado sin secuencia larga.
- Responsive: matriz cerrada en `320x568`, `360x800`, `390x844`, `430x932`, `768x1024`, `820x1180`, `1024x768`, `1280x800`, `1366x768`, `1440x900`, `1728x1117` y `1920x1080`.
- Bundle:
  - anterior: `632.64 kB`
  - final Vite: `494.23 kB`
  - chunk principal analizado: `482.65 KiB`
  - `ScrollTrigger`: `42.53 KiB`
- Lighthouse local sobre build de produccion:
  - Performance `98`
  - Accessibility `100`
  - Best Practices `100`
  - SEO `100`
  - LCP `~829 ms`
  - CLS `~0.0107`
  - TBT `0 ms`
- Axe:
  - home, menu movil abierto, reduced motion, reservar, footer y `/dev/design-system/` con `0` violaciones serias o criticas.
- Tests:
  - unitarios/integracion: `31` verdes
  - E2E: ampliados para CTA persistente, menu movil, redirects, reservar y rutas dev
- Warnings editoriales:
  - permanecen `92`
  - no bloquean porque siguen siendo los mismos pendientes de contenido y legales
- Deuda restante:
  - material MP4 original
  - validacion editorial y legal del titular
  - pasada humana con lector de pantalla real
  - proveedor real de reservas en Fase 8

## Fase 7 - Carta y especiales

- [x] Carta HTML por categorias.
- [ ] Filtros accesibles.
- [ ] Precios y alergenos validados.
- [x] Pagina de especiales con caducidad automatica por contenido.
- [x] Enlaces profundos y reserva precontextualizada.

**Aceptacion:** carta indexable, usable sin animacion y sin promociones vencidas visibles.

### Resultado de la Fase 7

- Carta publica reconstruida en `src/pages/MenuPage.tsx` con hero editorial, rail por categorias, categorias con `h2`, platos HTML y CTA contextual.
- Especiales reconstruida en `src/pages/EspecialesPage.tsx` con snapshot tipado `active/upcoming/expired/empty`.
- `Vermut` permanece fuera de la publicacion publica hasta recuperar items validos.
- Identidad publica del menu normalizada:
  - pizza `Margarita` => slug `pizza-margarita`
  - coctel `Margarita` => slug `margarita`
- JSON-LD ampliado para `Menu`, `MenuSection`, `MenuItem` y `Offer` activo sin precios inventados.
- QA local cerrada:
  - `content:validate`: `0` errores, `130` warnings
  - `test:run`: `42/42`
  - `test:e2e`: `26` passed, `4` skipped
  - `bundle:budget`: pass
  - Axe en escenarios clave: `0` violaciones
  - matriz responsive regenerada el `2026-07-21`: `0` overflows
- Estado remoto del checkpoint previo a cierre final:
  - branch publicada: `codex/phase-7-menu-and-specials`
  - draft PR existente: `#8 Phase 7: accessible HTML menu and specials`
  - CI remoto verificado en el checkpoint: run `#19` `completed / success`
- Warning delta explicado en `docs/content/PHASE_7_WARNING_DELTA.md`.
- Documentacion de fase creada en `docs/menu/` y `docs/qa/`.

### Cierre de roadmap

Fase 7 no debe marcarse como completamente publicada hasta tener:

- head final del bloque empujado a remoto
- PR `#8` actualizado con resultados reales del head final
- CI remoto terminal verde sobre el head final
- revision independiente completada
- decision expresa sobre los `130` warnings pendientes de contenido y legales

## Fase 8 - Reserva

- [ ] Formulario de reserva completo.
- [ ] Validacion accesible.
- [ ] Integracion desacoplada del proveedor.
- [ ] Estados pending/success/error.
- [ ] Antispam.
- [ ] Privacidad y consentimiento.
- [ ] Rutas alternativas telefono/WhatsApp.

**Aceptacion:** recorrido E2E en movil y escritorio; nunca se comunica confirmacion falsa.

## Fase 9 - Paginas secundarias y legales

- [x] Nosotros.
- [x] Contacto y como llegar.
- [x] FAQ.
- [x] Aviso legal, privacidad y cookies.
- [x] Declaracion de accesibilidad.
- [x] Gestor de consentimiento real.

**Aceptacion:** textos revisados, preferencias reversibles y terceros bloqueados antes de consentimiento cuando corresponda.

### Resultado de la Fase 9

- `/nosotros/` reconstruida con hero amplio, relato editorial verificado y deuda biografica visible.
- `/contacto/` completada con bloque `Como llegar`, mapa embebido condicionado por consentimiento y CTA a reserva/FAQ/cookies.
- `/faq/` creada como ruta HTML indexable con acordeones accesibles y `FAQPage` en JSON-LD visible.
- `/aviso-legal/`, `/privacidad/` y `/cookies/` completadas como textos provisionales estructurados, con alcance real y disclaimers explicitos.
- `/declaracion-de-accesibilidad/` completada con capacidades actuales, limites conocidos y canal de reporte provisional.
- Gestor de consentimiento real implementado en `src/features/consent/`:
  - aceptar
  - rechazar
  - personalizar
  - cambiar preferencias mas tarde
  - persistencia versionada
  - sin casillas premarcadas
  - terceros no esenciales bloqueados antes del consentimiento
- Tercero real controlado en esta fase: `Google Maps embed` bajo categoria `external_media`.
- Canonicals y `og:url` unificados contra `https://malcriadobcn.com/` tambien en preview y desarrollo, evitando dependencias del host local.
- QA local cerrada:
  - `npm run format:check`
  - `npm run lint`
  - `npm run typecheck`
  - `npm run content:validate`
  - `npm run content:report`
  - `npm run assets:verify`
  - `npm run routes:validate`
  - `npm run seo:validate`
  - `npm run bundle:budget`
  - `npm run test:run`
  - `npm run build`
  - `npm run test:e2e`
  - `npm run qa`
  - `git diff --check`
- Resultados:
  - unitarios: `63/63`
  - E2E: `45 passed / 5 skipped`
  - Axe serio o critico: `0` en rutas cubiertas
  - bundle budget: pass, chunk inicial `164.59 kB`
  - Lighthouse produccion en `/contacto/` y `/faq/`: `86 / 100 / 100 / 100`
- Documentacion de fase:
  - `docs/qa/PHASE_9_SECONDARY_PAGES_AUDIT.md`
  - `docs/legal/PHASE_9_LEGAL_PENDING_MATRIX.md`
  - `docs/consent/CONSENT_ARCHITECTURE.md`
  - `docs/consent/THIRD_PARTY_INVENTORY.md`
  - `docs/consent/STORAGE_POLICY.md`
  - `docs/accessibility/PHASE_9_ACCESSIBILITY_AUDIT.md`
  - `docs/qa/PHASE_9_VISUAL_QA.md`
  - `docs/legal/PHASE_9_OWNER_VALIDATION_CHECKLIST.md`
- Deuda abierta:
  - validacion juridica final del titular
  - proveedor real de analitica si llega a activarse
  - proveedor real de marketing si llega a activarse
  - pasada humana con lector de pantalla real

## Fase 10 - Motion polish

- [ ] Auditar cada escena GSAP.
- [ ] Reducir triggers y coste de pintura.
- [ ] Afinar timings y continuidad.
- [ ] Probar orientation changes, back/forward y navegacion rapida.
- [ ] Validar reduced motion.

**Aceptacion:** ninguna animacion genera overflow, perdida de foco, contenido inaccesible o caida significativa de interaccion.

## Fase 11 - QA integral

- [ ] Unit, integration y E2E.
- [ ] QA visual por viewport.
- [ ] Axe y auditoria manual WCAG.
- [ ] Navegadores y dispositivos.
- [ ] Lighthouse y WebPageTest.
- [ ] SEO schema/canonical/indexacion.
- [ ] Formularios, consentimiento y seguridad.
- [ ] Enlaces, 404 y redirecciones.

**Aceptacion:** quality gates completos y deuda residual documentada con prioridad.

## Fase 12 - Lanzamiento

- [ ] Build de produccion reproducible.
- [ ] Backup de web actual.
- [ ] Plan de despliegue y rollback.
- [ ] Verificacion DNS/SSL/cache.
- [ ] Smoke test de produccion.
- [ ] Search Console, analitica consentida y monitorizacion.
- [ ] Revision post-lanzamiento 24 h / 7 dias.

**Aceptacion:** produccion estable, reservas verificadas y rollback disponible.

## Backlog posterior

- CMS ligero para especiales si la frecuencia editorial lo exige.
- Idiomas catalan e ingles con traduccion completa.
- Integracion con sistema real de disponibilidad.
- Automatizacion de carta y eventos.
- Experimentos A/B respetuosos con privacidad.
