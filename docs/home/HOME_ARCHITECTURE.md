# Home Architecture

Fecha: 2026-07-17
Estado: `implementacion cerrada y validada en local`

## Objetivo

Construir una home inmersiva orientada a reserva usando HTML completo como base y GSAP como mejora progresiva, sin depender de video bloqueado ni de contenido editorial no validado.

## Resultado actual

La arquitectura descrita aqui ya esta aplicada en codigo:

- `HomePage` ensambla escenas inmersivas y editoriales desde `src/content/home/scenes.ts`
- `useHomePageMotion` aplica enhancement progresivo, `matchMedia`, cleanup y reduced motion
- el shell publico mantiene foco, scroll y CTA sin quedar acoplado a GSAP
- las rutas secundarias quedan lazy y no forman parte del camino inicial de produccion

## Principios no negociables

1. La home debe seguir siendo comprensible, navegable e indexable sin JS de animacion.
2. GSAP no puede convertirse en el sistema de layout.
3. Cada escena debe tener una funcion narrativa y una funcion de conversion.
4. Movil y reduced motion no son recortes tardios: forman parte del diseño base.
5. El header y el CTA persistente deben cooperar con las escenas, no competir con ellas.

## Capas de la arquitectura

### Capa 1. Contenido

Fuente principal:

- `src/content/home/scenes.ts`

Responsabilidad:

- definir secuencia;
- copy;
- CTA;
- media;
- estado editorial;
- intencion de movimiento.

Regla:

- no introducir copy comercial hardcodeado en componentes de escena salvo etiquetas UI neutrales.

### Capa 2. Render de escenas

Nueva responsabilidad de la home:

- transformar `homeScenes` en secciones renderizables con un contrato visual y accesible consistente.

Contrato propuesto por escena:

- `id` y `slug` como anchors y hooks de testing;
- `theme` para cromatica y transicion de header;
- `motionIntent` para enhancement GSAP;
- `editorialStatus` para mostrar pendientes reales;
- `media` como fuente de imagenes responsive;
- `ctas` como acciones contextuales o fallback a reserva/carta.

### Capa 3. Sistema visual

La home debe organizarse en tres familias:

1. escenas inmersivas:
   hero, especial, fusion, platos, costa, noche.
2. escenas editoriales de lectura:
   historia, carta.
3. escenas estables de conversion:
   reserva, ubicacion.

Cada familia necesita:

- reglas de espaciado propias;
- masa tipografica distinta;
- tratamientos cromaticos por escena;
- densidad adaptada a viewport.

### Capa 4. Motion progressive enhancement

Infraestructura deseada:

- timeline local por escena;
- `ScrollTrigger` solo donde aporte lectura o continuidad;
- `gsap.matchMedia()` para separar desktop, movil y reduced motion;
- destruccion completa de contexts al desmontar;
- presupuesto de triggers alineado con `docs/creative/GSAP_SCENE_BUDGET.md`.

Comportamientos previstos:

- preloader corto y omitible;
- hero reveal;
- entradas suaves por escena;
- layered parallax muy medido en fusion/coast/night;
- secuencia de platos sin pinning largo en movil;
- entrada estable en reserva.

### Capa 5. Integracion de shell

Necesidades:

- coordinar tema del header segun escena visible;
- mantener `ShellRouteEffects` como responsable de scroll/focus entre rutas;
- evitar que la home cree side effects globales que rompan otras paginas;
- respetar el CTA persistente en movil y ocultarlo solo si invade formularios o bloques finales.

## Estructura propuesta

### `HomePage`

Responsabilidades:

- ensamblar preloader, hero y secuencia de escenas;
- derivar data de `homeScenes` y assets;
- pasar configuracion a secciones y hooks;
- mantener SEO y CTA principales.

### Nuevos componentes/hook esperables

- `src/components/home/HomeScene.tsx`
- `src/components/home/HomeHero.tsx`
- `src/components/home/HomeSceneMedia.tsx`
- `src/components/home/HomeSceneContent.tsx`
- `src/components/home/HomeSceneRail.tsx` o equivalente si la escena de platos lo requiere
- `src/components/home/HomePreloader.tsx`
- `src/motion/home/useHomeSceneMotion.ts`
- `src/motion/home/useHomeHeaderTheme.ts` o equivalente

La modularizacion final puede variar, pero debe separar:

- render base;
- motion;
- integracion con shell.

## Secuencia de escenas objetivo

### 1. Preloader

- temporal, corto y no obligatorio en visitas repetidas;
- solo si la carga inicial real lo justifica;
- fallback directo en reduced motion;
- no debe impedir leer el hero de forma inmediata.

### 2. Hero

- viewport dominante;
- titular masivo;
- CTA primario de reserva y secundario operativo;
- asset principal con presencia editorial;
- metadatos de ubicacion/hours como soporte, no como tabla protagonista.

### 3. Especial activo

- si `PENDING_CONTENT`, mostrar estado editorial honesto;
- si en el futuro hay oferta verificada, la escena debe admitirla sin rehacer layout;
- CTA contextual a especiales o reserva.

### 4. Fusion

- bloque tipografico y visual de manifiesto;
- scroll enhancement ligero;
- legibilidad total sin animacion.

### 5. Platos insignia

- secuencia de producto con 3 a 5 platos maximo;
- desktop con narrativa progresiva;
- movil como stack editorial compacto;
- CTA claro a carta.

### 6. Costa

- escena de respiracion y contexto;
- menos densidad textual;
- profundidad lenta y limpia.

### 7. Cocteles y noche

- cambio de energia y cromatica;
- una sola idea visual fuerte;
- nada de blur caro ni filtros decorativos.

### 8. Historia

- escena humana y pausada;
- lectura confortable;
- sin prometer biografia no validada.

### 9. Carta visual

- previews de categorias reales;
- acceso claro a `/menu/`;
- usable con teclado y touch.

### 10. Reserva

- bloque estable y legible;
- motion solo de entrada;
- nunca mover formulario o CTA durante interaccion.

### 11. Ubicacion

- cierre operativo;
- direccion y contacto con estados pendientes visibles donde aplique.

## Responsive contract

- Desktop: ritmo largo, masas fuertes y algun enhancement de profundidad.
- Tablet: simplificacion de capas y reduccion de recorridos largos.
- Mobile: secciones cortas, CTA siempre recuperable, cero pinning largo.
- Reduced motion: mismo orden, misma jerarquia, sin scrub ni parallax.

## Testing contract

La implementacion debe dejar preparada evidencia para:

- tests de render basico de la home;
- validacion manual de header overlay -> dark/light;
- QA visual por viewport;
- reduced motion;
- ausencia de overflow horizontal;
- consola limpia;
- sin warnings de ScrollTrigger;
- build, lint, typecheck, test y playwright.

## No hacer

- copiar composiciones de la referencia;
- meter sliders porque falte una escena;
- usar GSAP para resolver espaciado o responsiveness;
- inventar promociones, horarios o biografia;
- depender de video;
- esconder deuda editorial para que la home parezca completa.
