# Current Home Audit

Fecha de auditoria: 2026-07-17
Branch: `codex/phase-6-immersive-home-gsap`
Commit base auditado: `57deb4eabbb1d317db1a40770e611718ff56bb9c`
Entorno visual revisado: `npm run dev -- --host 0.0.0.0 --port 4173`
Baseline vivo: `docs/qa/PHASE_6_LIVE_BASELINE.md`

## Alcance auditado

- Documentacion de producto, IA, diseño, responsive, QA, direccion artistica y motion.
- ADRs 0001 a 0005.
- Home actual en `src/pages/HomePage.tsx`.
- Contrato editorial en `src/content/home/scenes.ts` y `src/types/content/home.ts`.
- Shell publico en `src/app/layout/PublicLayout.tsx`, `src/app/shell/ShellRouteEffects.tsx`, `src/components/layout/Header.tsx` y `src/components/layout/PersistentBookingCta.tsx`.
- Infraestructura GSAP en `src/motion/config/gsap.ts`.
- Styles relevantes en `src/styles/index.css`.
- Baseline visual real en navegador in-app sobre `http://localhost:4173/`.

## Diagnostico ejecutivo

La home actual no es todavia una home inmersiva de Fase 6. Es una composicion provisional de Fase 4 apoyada en bloques editoriales reutilizables, con narrativa sugerida pero sin sistema de escenas, sin preloader real, sin integracion GSAP de scroll y sin una jerarquia visual final alineada con `docs/creative/ART_DIRECTION.md`.

La base del sprint existe y es util:

- El contenido tipado de escenas ya modela la secuencia narrativa objetivo.
- El shell publico y el header ya aceptan estados (`overlay`, `dark`, `light`) reutilizables.
- El CTA persistente ya esta desacoplado de la home y funciona como red de seguridad en movil.
- El manifiesto de assets ya contiene crops, pesos y candidatos editoriales.
- El baseline en vivo ya esta operativo y limpio en desktop y movil tras fijar `VITE_PUBLIC_SITE_URL`.

Lo que falta es la capa central de Fase 6:

- arquitectura real de escenas renderizadas;
- sistema GSAP progresivo con limpieza de contexts;
- direccion artistica final de la home;
- integracion del header con escenas;
- reduced motion y degradacion por capacidad;
- documentacion y QA especificos de Fase 6.

## Estado final de cierre

El diagnostico anterior queda superado por la implementacion actual de la rama. La home ya opera como secuencia inmersiva real de Fase 6 y queda cerrada en local con:

- 10 escenas renderizadas desde contenido tipado mas preloader de primera visita
- carga diferida de GSAP y `ScrollTrigger`
- header gobernado por escena con `data-header-theme`
- CTA persistente cooperando con footer y excluido de `/reservar/`
- reduced motion sin secuencias largas ni parallax
- bundle principal final en `494.23 kB` segun salida de Vite
- Lighthouse local de build: Performance `98`, Accessibility `100`, Best Practices `100`, SEO `100`
- Axe serio/critico: `0`
- matriz responsive cerrada en 12 viewports documentados

## Deuda restante tras Fase 6

- siguen abiertos los `92` warnings editoriales ya conocidos
- falta una pasada humana con lector de pantalla real
- los MP4 siguen sin entrar en produccion por bloqueo de origen

## Hallazgos por area

### 1. Estructura actual de la pagina

`src/pages/HomePage.tsx` usa:

- un hero en dos columnas con `hero-shell`;
- una `StatementSection` estatica;
- un grid de `Frame` con `homeScenes.slice(2, 10)`;
- un bloque de plato destacado + categorias;
- una `FullBleedMediaSection`;
- un `BookingCta` generico al cierre.

Problema:

- la narrativa existe solo como listado visual de bloques;
- no hay continuidad entre escenas;
- no existe ritmo cinematografico ni alternancia fuerte de masas visuales;
- los bloques repetidos empujan la home a una lectura de catalogo, no de experiencia.

### 2. Estado del contrato de contenido

`src/content/home/scenes.ts` ya define once escenas con:

- `slug`
- `purpose`
- `content`
- `media`
- `ctas`
- `theme`
- `motionIntent`
- `editorialStatus`
- `mobileVariant`

Fortalezas:

- el modelo permite renderizado por escena;
- la narrativa coincide con estrategia y storyboard;
- ya expresa estados pendientes reales como `PENDING_CONTENT`.

Gap:

- la UI actual no consume este modelo como sistema de escenas;
- `motionIntent` no gobierna ninguna capa de comportamiento;
- no existe mapeo entre `theme` y cromatica/layout concretos;
- no hay contrato entre contenido, escena, header y motion.

### 3. GSAP y progressive enhancement

`src/motion/config/gsap.ts` solo registra `useGSAP` y `ScrollTrigger`.

Esto confirma que:

- no hay escenas activas reales;
- no hay `matchMedia`;
- no hay control de reduced motion en home;
- no hay limpieza medida por escena;
- no hay orquestacion de header, progress o preloader.

El repositorio cumple la ADR 0003 en intencion, pero todavia no en implementacion completa de Fase 6.

### 4. Shell y header

El shell publico ya aporta una base valida:

- `PublicLayout` separa header, main, footer y CTA persistente.
- `ShellRouteEffects` controla foco, restauracion y scroll sin depender de GSAP.
- `Header` soporta `theme` y `density`.
- La ruta `/` ya declara `headerTheme: "overlay"` y `hasHero: true`.

Gap:

- el header cambia por handle de ruta, no por progreso de escenas;
- no existe integracion viva hero -> scene transition -> header contrast;
- la home inmersiva necesita un puente controlado entre escena visible y tema del header.

### 5. Assets y direccion artistica

Los assets validados y sus crops permiten construir:

- hero editorial;
- platos insignia;
- escena costera;
- escena de cocteles;
- transiciones cromaticas ligadas al contenido real.

Limitaciones actuales:

- no hay MP4 utilizables en produccion por bloqueo `SG-Captcha`;
- la home no debe depender de video para quedar terminada;
- algunas escenas siguen con contenido editorial pendiente y deben expresar ese estado sin inventar ofertas ni claims.

### 6. Responsive y accesibilidad

El baseline vivo muestra:

- home visible en `1440x900` y `390x844`;
- sin overflow horizontal visible;
- sin errores/warnings de consola en la revision limpia;
- header `overlay` correcto al cargar.

Pero la home actual todavia no demuestra:

- control de escenas en `320`, `360`, `430`, `768`, `820`, `1024`, `1280`, `1920`;
- reduced motion equivalente;
- integracion del CTA persistente con bloques inmersivos largos;
- ausencia de conflictos futuros entre ScrollTrigger, foco y shell route effects.

## Reutilizacion recomendada

Se deben reutilizar:

- `homeScenes` como fuente editorial principal.
- `Header`, `PersistentBookingCta` y `PublicLayout`.
- `ResponsiveImage`, `EditorialImage`, `MediaFrame`, `Container`, `Section`, `Cluster`, `Frame` y otros primitives.
- `buildBookingIntentHref`.
- `asset-manifest.json` como fuente de hero/dishes/coast/night.

Se deben reemplazar o reconvertir:

- la composicion completa de `HomePage.tsx`;
- el grid provisional de `Frame`;
- el hero actual de dos columnas;
- la `StatementSection` y la `FullBleedMediaSection` como piezas de home principal si impiden un sistema de escenas coherente.

## Gaps documentales detectados

En la lista obligatoria del sprint faltan actualmente:

- `docs/shell/SCENE_SHELL_CONTRACT.md`
- `docs/qa/PHASE_5_VIEWPORT_ZOOM_QA.md`

No bloquean la fase, pero deben cubrirse con documentacion equivalente de Fase 6 para no dejar huecos en el contrato tecnico y en el QA.

## Riesgos activos del sprint

1. Convertir la home en una suma de efectos sin reforzar decision y reserva.
2. Introducir demasiados triggers frente al presupuesto de `docs/creative/GSAP_SCENE_BUDGET.md`.
3. Romper la estabilidad del header o del CTA persistente en movil.
4. Confiar en video no disponible o en contenido comercial pendiente.
5. Perder legibilidad por intentar reproducir la referencia en vez de traducir su ritmo.

## Decision de arquitectura

La implementacion de Fase 6 debe pivotar a un sistema de escenas declarativas:

- HTML completo y navegable sin GSAP;
- enhancement progresivo por escena;
- layout y tema derivados del contenido tipado;
- control explicito de reduced motion;
- integracion de header por progreso de escena;
- movil con narrativa corta y sin pinning largo.

## Siguiente bloque exacto

1. Crear la arquitectura de escenas y su contrato de implementacion.
2. Reescribir `HomePage.tsx` alrededor de un sistema de secciones inmersivas.
3. Anadir capa GSAP progresiva con presupuesto controlado.
4. Volver al navegador y validar el primer corte visual real.
