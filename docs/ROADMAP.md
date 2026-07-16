# Roadmap maestro

Este documento es la columna vertebral del desarrollo. Cada fase se cierra con codigo, documentacion, QA, commit y push. No se avanza ocultando fallos de la fase anterior.

## Fase 0 - Gobierno y descubrimiento

**Objetivo:** fijar reglas, estrategia y alcance.

- [x] Crear `AGENTS.md`.
- [x] Documentar estrategia de producto y conversion.
- [x] Definir arquitectura, diseño, motion, responsive, legal, SEO y assets.
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
- [x] Añadir variables de entorno documentadas sin secretos.
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

- [ ] Descargar originales autorizados.
- [ ] Crear manifiesto y trazabilidad.
- [ ] Eliminar duplicados.
- [ ] Generar derivados responsive.
- [ ] Preparar posters y variantes de video.
- [ ] Validar logos y favicons.

**Aceptacion:** ningun asset critico sin origen, dimensiones, alt/rol y variante optimizada.

## Fase 3 - Contenido y modelo editorial

- [ ] Crear fuentes tipadas para negocio, menu, ofertas, FAQ y testimonios.
- [ ] Migrar contenido real y corregir erratas verificadas.
- [ ] Modelar vigencia de ofertas.
- [ ] Preparar estados de contenido pendiente.
- [ ] Validar precios, alergenos, horarios y condiciones.

**Aceptacion:** cero contenido comercial duplicado y cero datos inventados.

## Fase 4 - Sistema de diseño

- [ ] Tokens completos.
- [ ] Tipografia y escala fluida.
- [ ] Botones, enlaces, formularios y navegacion.
- [ ] MediaFrame, DishCard, OfferCard y layouts.
- [ ] Estados y documentacion visual.
- [ ] Accesibilidad de componentes base.

**Aceptacion:** componentes operables por teclado y consistentes en la matriz responsive.

## Fase 5 - Shell, navegacion y SEO tecnico

- [ ] Header desktop/movil.
- [ ] CTA de reserva persistente y no invasivo.
- [ ] Footer completo.
- [ ] Routing, canonical, sitemap, robots y 404.
- [ ] Metadata, Open Graph y JSON-LD base.
- [ ] Redirecciones desde URLs antiguas.

**Aceptacion:** navegacion completa con teclado, sin JS de animacion y con metadatos validos.

## Fase 6 - Home inmersiva

- [ ] Hero y preloader.
- [ ] Especial activo.
- [ ] Platos estrella.
- [ ] Narrativa de fusion.
- [ ] Experiencia frente al mar.
- [ ] Historia del chef.
- [ ] Prueba social.
- [ ] Bloque de reserva y ubicacion.
- [ ] Variantes reduced motion y movil.

**Aceptacion:** narrativa completa, CTA claro, sin bloqueo de scroll y Core Web Vitals dentro del presupuesto de laboratorio.

## Fase 7 - Carta y especiales

- [ ] Carta HTML por categorias.
- [ ] Filtros accesibles.
- [ ] Precios y alergenos validados.
- [ ] Pagina de especiales con caducidad automatica por contenido.
- [ ] Enlaces profundos y reserva precontextualizada.

**Aceptacion:** carta indexable, usable sin animacion y sin promociones vencidas visibles.

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

- [ ] Nosotros.
- [ ] Contacto y como llegar.
- [ ] FAQ.
- [ ] Aviso legal, privacidad y cookies.
- [ ] Declaracion de accesibilidad.
- [ ] Gestor de consentimiento real.

**Aceptacion:** textos revisados, preferencias reversibles y terceros bloqueados antes de consentimiento cuando corresponda.

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
