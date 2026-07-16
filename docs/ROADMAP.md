# Roadmap maestro

Este documento es la columna vertebral del desarrollo. Cada fase se cierra con código, documentación, QA, commit y push. No se avanza ocultando fallos de la fase anterior.

## Fase 0 — Gobierno y descubrimiento

**Objetivo:** fijar reglas, estrategia y alcance.

- [x] Crear `AGENTS.md`.
- [x] Documentar estrategia de producto y conversión.
- [x] Definir arquitectura, diseño, motion, responsive, legal, SEO y assets.
- [ ] Completar inventario técnico de la web actual.
- [ ] Capturar todas las URLs, metadatos, redirecciones y assets.
- [ ] Validar datos comerciales y legales con el titular.

**Salida:** base documental aprobada y backlog de contenido pendiente.

## Fase 1 — Bootstrap técnico

- [ ] Inicializar Vite + React + TypeScript estricto.
- [ ] Instalar GSAP, `@gsap/react` y testing.
- [ ] Configurar ESLint, Prettier, Vitest y Playwright.
- [ ] Crear tokens, reset, shell, rutas y estructura oficial.
- [ ] Configurar CI para lint, typecheck, test y build.
- [ ] Añadir variables de entorno documentadas sin secretos.

**Aceptación:** build limpio, pruebas base verdes y estructura alineada con AGENTS.

## Fase 2 — Migración y optimización de assets

- [ ] Descargar originales autorizados.
- [ ] Crear manifiesto y trazabilidad.
- [ ] Eliminar duplicados.
- [ ] Generar derivados responsive.
- [ ] Preparar posters y variantes de vídeo.
- [ ] Validar logos y favicons.

**Aceptación:** ningún asset crítico sin origen, dimensiones, alt/rol y variante optimizada.

## Fase 3 — Contenido y modelo editorial

- [ ] Crear fuentes tipadas para negocio, menú, ofertas, FAQ y testimonios.
- [ ] Migrar contenido real y corregir erratas verificadas.
- [ ] Modelar vigencia de ofertas.
- [ ] Preparar estados de contenido pendiente.
- [ ] Validar precios, alérgenos, horarios y condiciones.

**Aceptación:** cero contenido comercial duplicado y cero datos inventados.

## Fase 4 — Sistema de diseño

- [ ] Tokens completos.
- [ ] Tipografía y escala fluida.
- [ ] Botones, enlaces, formularios y navegación.
- [ ] MediaFrame, DishCard, OfferCard y layouts.
- [ ] Estados y documentación visual.
- [ ] Accesibilidad de componentes base.

**Aceptación:** componentes operables por teclado y consistentes en la matriz responsive.

## Fase 5 — Shell, navegación y SEO técnico

- [ ] Header desktop/móvil.
- [ ] CTA de reserva persistente y no invasivo.
- [ ] Footer completo.
- [ ] Routing, canonical, sitemap, robots y 404.
- [ ] Metadata, Open Graph y JSON-LD base.
- [ ] Redirecciones desde URLs antiguas.

**Aceptación:** navegación completa con teclado, sin JS de animación y con metadatos válidos.

## Fase 6 — Home inmersiva

- [ ] Hero y preloader.
- [ ] Especial activo.
- [ ] Platos estrella.
- [ ] Narrativa de fusión.
- [ ] Experiencia frente al mar.
- [ ] Historia del chef.
- [ ] Prueba social.
- [ ] Bloque de reserva y ubicación.
- [ ] Variantes reduced motion y móvil.

**Aceptación:** narrativa completa, CTA claro, sin bloqueo de scroll y Core Web Vitals dentro del presupuesto de laboratorio.

## Fase 7 — Carta y especiales

- [ ] Carta HTML por categorías.
- [ ] Filtros accesibles.
- [ ] Precios y alérgenos validados.
- [ ] Página de especiales con caducidad automática por contenido.
- [ ] Enlaces profundos y reserva precontextualizada.

**Aceptación:** carta indexable, usable sin animación y sin promociones vencidas visibles.

## Fase 8 — Reserva

- [ ] Formulario de reserva completo.
- [ ] Validación accesible.
- [ ] Integración desacoplada del proveedor.
- [ ] Estados pending/success/error.
- [ ] Antispam.
- [ ] Privacidad y consentimiento.
- [ ] Rutas alternativas teléfono/WhatsApp.

**Aceptación:** recorrido E2E en móvil y escritorio; nunca se comunica confirmación falsa.

## Fase 9 — Páginas secundarias y legales

- [ ] Nosotros.
- [ ] Contacto y cómo llegar.
- [ ] FAQ.
- [ ] Aviso legal, privacidad y cookies.
- [ ] Declaración de accesibilidad.
- [ ] Gestor de consentimiento real.

**Aceptación:** textos revisados, preferencias reversibles y terceros bloqueados antes de consentimiento cuando corresponda.

## Fase 10 — Motion polish

- [ ] Auditar cada escena GSAP.
- [ ] Reducir triggers y coste de pintura.
- [ ] Afinar timings y continuidad.
- [ ] Probar orientation changes, back/forward y navegación rápida.
- [ ] Validar reduced motion.

**Aceptación:** ninguna animación genera overflow, pérdida de foco, contenido inaccesible o caída significativa de interacción.

## Fase 11 — QA integral

- [ ] Unit, integration y E2E.
- [ ] QA visual por viewport.
- [ ] Axe y auditoría manual WCAG.
- [ ] Navegadores y dispositivos.
- [ ] Lighthouse y WebPageTest.
- [ ] SEO schema/canonical/indexación.
- [ ] Formularios, consentimiento y seguridad.
- [ ] Enlaces, 404 y redirecciones.

**Aceptación:** quality gates completos y deuda residual documentada con prioridad.

## Fase 12 — Lanzamiento

- [ ] Build de producción reproducible.
- [ ] Backup de web actual.
- [ ] Plan de despliegue y rollback.
- [ ] Verificación DNS/SSL/caché.
- [ ] Smoke test de producción.
- [ ] Search Console, analítica consentida y monitorización.
- [ ] Revisión post-lanzamiento 24 h / 7 días.

**Aceptación:** producción estable, reservas verificadas y rollback disponible.

## Backlog posterior

- CMS ligero para especiales si la frecuencia editorial lo exige.
- Idiomas catalán e inglés con traducción completa.
- Integración con sistema real de disponibilidad.
- Automatización de carta y eventos.
- Experimentos A/B respetuosos con privacidad.
