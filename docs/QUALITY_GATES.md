# Quality gates

Ningún bloque se considera terminado por apariencia visual. Debe superar las comprobaciones aplicables y dejar evidencia en el cierre del sprint.

## Gate 1 — Código

- Instalación reproducible.
- TypeScript sin errores.
- ESLint sin errores.
- Formato consistente.
- Build de producción correcto.
- Sin secretos, credenciales ni URLs privadas.
- Sin dependencias no justificadas o vulnerabilidades críticas conocidas.

## Gate 2 — Pruebas

- Tests unitarios para lógica de contenido, ofertas y formulario.
- Tests de integración para navegación, filtros y estados.
- Playwright para reserva, carta, consentimiento y rutas críticas.
- Los fallos no se silencian con `skip` sin issue y justificación.

## Gate 3 — Accesibilidad

- Axe sin violaciones críticas/serias en rutas principales.
- Recorrido manual completo con teclado.
- Foco visible y orden lógico.
- Lectura básica con lector de pantalla.
- Contraste, zoom 200 %, reflow y targets táctiles.
- Reduced motion funcional.
- Formularios con labels, errores y confirmaciones accesibles.

## Gate 4 — Responsive

- 320, 360, 390, 430, 768, 820, 1024, 1280, 1440 y 1920 px.
- Portrait y landscape donde proceda.
- Sin overflow horizontal.
- Sin solapes de CTA, cookies, navegación o teclado virtual.
- Imágenes con encuadre aprobado.
- Escenas GSAP degradadas correctamente por capacidad.

## Gate 5 — Rendimiento

Objetivos de laboratorio iniciales en móvil:

- Performance Lighthouse >= 90 para páginas clave cuando el entorno sea estable.
- Accessibility, Best Practices y SEO >= 95.
- LCP <= 2.5 s.
- CLS <= 0.1.
- INP aproximado <= 200 ms y sin long tasks evitables.
- Presupuesto de imágenes/vídeo documentado.
- Sin descarga anticipada de galerías, mapas o terceros no necesarios.

Los datos reales de campo prevalecerán tras lanzamiento.

## Gate 6 — GSAP

- Todos los contexts y triggers se limpian.
- Sin warnings de ScrollTrigger.
- Sin pinning roto al redimensionar u orientar.
- Sin contenido inaccesible con JS desactivado.
- Sin scroll-jacking.
- Sin flashes o movimiento peligroso.
- Reduced motion muestra estado final correcto.
- Escenas medidas en móvil de gama media.

## Gate 7 — SEO local

- Titles, descriptions, canonical y H1 únicos.
- Sitemap y robots correctos.
- JSON-LD válido y basado en datos reales.
- NAP coherente.
- Carta en HTML.
- Redirecciones de URLs antiguas.
- Imágenes, alt y enlaces internos revisados.
- Noindex solo donde esté justificado.

## Gate 8 — Privacidad y legal

- Inventario real de cookies y terceros.
- Rechazar tan accesible como aceptar.
- No esenciales bloqueados antes de consentimiento cuando corresponda.
- Retirada de consentimiento disponible.
- Formularios con primera capa informativa.
- Marketing opcional y separado.
- Páginas legales completadas y revisadas.
- Ningún dato personal en analítica o URL.

## Gate 9 — Contenido

- Datos de contacto y horario verificados.
- Precios, alérgenos y ofertas aprobados por Malcriado.
- Sin contenido placeholder en producción.
- Sin reseñas inventadas.
- Ofertas vencidas ocultas o archivadas.
- Ortografía, tono y consistencia editorial revisados.

## Gate 10 — Lanzamiento

- Backup y rollback.
- Variables de producción verificadas.
- SSL, canonical y redirects correctos.
- Formulario probado extremo a extremo en producción.
- Smoke test móvil/escritorio.
- 404 y enlaces externos revisados.
- Monitorización y responsables definidos.

## Plantilla de cierre

Cada sprint debe informar:

1. alcance completado;
2. archivos creados/modificados;
3. pruebas ejecutadas y resultado;
4. capturas o evidencia visual relevante;
5. métricas de rendimiento;
6. deuda o riesgos restantes;
7. commit y push realizados;
8. siguiente bloque exacto del roadmap.
