# AGENTS.md — Malcriado BCN

## 1. Mandato

Este repositorio contiene la reconstrucción profesional de malcriadobcn.com. Se considera un proyecto nuevo. La web actual solo es fuente de contenido y assets; no se heredarán su base de datos, constructor, dependencias, estructura HTML, estilos, plugins ni deuda técnica.

Codex debe elegir siempre la solución más profesional, robusta, mantenible y escalable. No debe reducir alcance mediante atajos visuales o técnicos sin documentarlo.

## 2. Prioridades, en orden

1. Reserva de mesa y claridad comercial.
2. Accesibilidad real y navegación comprensible.
3. Rendimiento móvil y estabilidad visual.
4. SEO local y contenido indexable.
5. Sistema de diseño coherente.
6. Movimiento inmersivo con GSAP.
7. Facilidad editorial para ofertas y especiales.

Una animación nunca tiene prioridad sobre accesibilidad, conversión, legibilidad, SEO o rendimiento.

## 3. Fuente de verdad

- Contenido y activos actuales: `https://malcriadobcn.com/` y sus páginas públicas.
- Gobierno y alcance: documentos de `/docs`.
- Roadmap operativo: `docs/ROADMAP.md`.
- Decisiones permanentes: ADRs en `docs/adr/`.

No inventar precios, horarios, platos, promociones, reseñas, premios, certificaciones, ingredientes ni datos legales. Cuando falte información, usar contenido marcado como `PENDING_CONTENT` y registrarlo en el backlog.

## 4. Stack recomendado

- Vite + React + TypeScript estricto.
- CSS moderno mediante módulos o una capa de tokens; evitar estilos ad hoc.
- GSAP, `@gsap/react`, ScrollTrigger y plugins oficialmente disponibles bajo la licencia instalada.
- Formularios con validación de esquema.
- Contenido temporal desacoplado del layout mediante archivos tipados locales en la primera versión.
- Vitest para lógica, Testing Library para interfaz y Playwright para recorridos críticos.
- ESLint, Prettier, TypeScript `noEmit`, Lighthouse CI y comprobaciones de accesibilidad automatizadas.

No introducir CMS, backend o base de datos hasta que exista una necesidad aprobada. La primera entrega debe ser desplegable como frontend estático con una integración de formulario explícita y sustituible.

## 5. Arquitectura obligatoria

- Separar páginas, secciones, componentes, datos, animaciones, estilos, utilidades y servicios.
- Una sección visual importante por carpeta.
- Cada escena GSAP debe vivir junto a su sección o en un módulo de motion claramente nombrado.
- Ningún componente de página debe contener una línea de tiempo GSAP extensa inline.
- Los datos de menú, ofertas, contacto y horarios no se duplican en componentes.
- Evitar componentes genéricos prematuros. Extraer solo patrones realmente repetidos.
- Toda API pública interna debe estar tipada.

Estructura objetivo:

```text
src/
  app/
  pages/
  sections/
  components/
  content/
  motion/
  styles/
  hooks/
  services/
  lib/
  types/
public/
  assets/
    brand/
    images/
    video/
    menu/
docs/
```

## 6. Reglas GSAP

- Registrar plugins una sola vez.
- Usar `gsap.context()` o `useGSAP()` y limpiar todas las animaciones.
- ScrollTrigger debe usar disparadores locales y límites claros.
- Prohibido animar propiedades de layout continuamente cuando `transform` y `opacity` resuelvan el efecto.
- No crear una instancia por elemento si una animación agrupada es viable.
- Usar `matchMedia()` para variantes por capacidad y breakpoint.
- Respetar `prefers-reduced-motion`; la experiencia debe seguir completa sin animaciones.
- No bloquear el scroll natural ni secuestrar la navegación.
- El pinning debe ser excepcional, medido y desactivado en pantallas donde perjudique.
- No depender de hover para descubrir contenido o acciones.
- Los textos y enlaces deben existir en el DOM y ser comprensibles sin JavaScript de animación.

## 7. Responsive y dispositivos

Diseñar mobile-first. Probar como mínimo:

- 320, 360, 390, 430 px;
- 768, 820, 1024 px;
- 1280, 1440, 1728 y 1920 px;
- portrait y landscape;
- teclado, touch, ratón y lector de pantalla;
- iOS Safari, Android Chrome, Chrome, Firefox, Safari y Edge actuales.

No usar detección por user-agent para layout. Usar capacidades, media queries y progressive enhancement.

## 8. Accesibilidad

Objetivo mínimo WCAG 2.2 nivel AA. Toda funcionalidad debe operar con teclado. Mantener foco visible, landmarks, jerarquía semántica, nombres accesibles, contraste, zoom al 200 %, reflow, objetivos táctiles y mensajes de error asociados.

Las imágenes decorativas usan `alt=""`; las informativas requieren texto alternativo útil. Los vídeos no deben reproducir audio automáticamente y necesitan alternativa o descripción cuando transmitan información.

## 9. Formularios y privacidad

- El formulario de reserva debe pedir solo datos necesarios.
- Incluir fecha, hora, comensales, nombre, contacto, notas opcionales y aceptación informada.
- No confirmar disponibilidad si no existe una fuente real que la valide.
- Diferenciar claramente “solicitud enviada” de “reserva confirmada”.
- Validación accesible en cliente y servidor/integración.
- Antispam sin retos inaccesibles.
- No cargar analítica, píxeles, mapas o medios no esenciales antes del consentimiento cuando legalmente corresponda.

## 10. SEO y contenido

- Una intención principal por URL.
- Un solo `h1` lógico por página.
- Metadatos únicos, canonical, Open Graph y datos estructurados válidos.
- Información local coherente: nombre, dirección, teléfono, horario y coordenadas verificadas.
- El menú debe ser HTML indexable, no solo PDF o imagen.
- No usar texto oculto, keyword stuffing ni páginas locales falsas.
- Las ofertas caducadas deben retirarse o marcarse correctamente; nunca mostrar promociones vencidas.

## 11. Rendimiento

Objetivos iniciales en móvil de producción:

- LCP <= 2.5 s en p75.
- INP <= 200 ms en p75.
- CLS <= 0.1 en p75.
- JS inicial tan pequeño como permita la experiencia; dividir escenas y rutas.
- Imágenes AVIF/WebP con dimensiones declaradas y `srcset`.
- Vídeo con poster, formatos eficientes y carga condicionada.
- Fuentes alojadas de forma legal, con subconjuntos y `font-display` adecuado.

No precargar assets que no sean críticos. El preloader nunca debe ocultar una carga lenta ni impedir acceder a la página.

## 12. Flujo de trabajo

Antes de codificar:

1. Leer el roadmap y la documentación relevante.
2. Auditar el estado real del repositorio.
3. Identificar contenido pendiente y dependencias.
4. Definir criterios de aceptación verificables.

Al cerrar cada bloque:

1. Ejecutar lint, typecheck, tests, build y QA relevante.
2. Revisar móvil real o emulado y reduced motion.
3. Actualizar documentación y roadmap.
4. Hacer commit y push del bloque terminado.
5. Informar archivos modificados, pruebas ejecutadas, resultados y deuda restante.

## 13. Prohibiciones

- No copiar plugins, temas o código propietario de la web anterior.
- No descargar assets sin conservar trazabilidad de origen y derechos.
- No inventar testimonios ni usar reseñas sin fuente y permiso.
- No usar animaciones que provoquen mareo, flashes o pérdida de control.
- No ocultar fallos de QA.
- No declarar cumplimiento legal absoluto; la revisión jurídica final corresponde al titular y profesional competente.
- No desplegar secretos en cliente ni incluir credenciales en Git.
