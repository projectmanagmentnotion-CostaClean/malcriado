# Fase 7 Lighthouse Investigation

## Fecha de la investigacion

2026-07-21

## Alcance

Ruta auditada con mayor detalle: `/menu/`

Objetivo: explicar y corregir el CLS detectado en la fase de revision independiente sin relajar los presupuestos de bundle ni degradar la experiencia editorial.

## Sintoma inicial

En entrada directa a `/menu/` se detecto un cambio de layout severo durante el primer render.

Evidencia inicial:

- `PerformanceObserver` en navegador: CLS aproximado `0.5603`
- Lighthouse desktop en `/menu/`: CLS aproximado `0.5769`
- Elemento mas desplazado en el reporte: `footer.container.site-footer`

## Causa raiz confirmada

Las rutas publicas se resolvian con `lazy(...)` y el `Suspense` superior pintaba primero un fallback minimo con el texto accesible `Cargando pagina`. En una carga directa de `/menu/` el shell y el footer aparecian antes de que se montara el contenido real de la ruta, y el footer saltaba varios miles de pixeles cuando el contenido de carta entraba en el DOM.

Confirmacion observada en muestreo temporal:

- frame inicial: shell + footer visibles con fallback
- frame siguiente: contenido completo de `/menu/` montado
- consecuencia: gran desplazamiento del footer y CLS acumulado

## Solucion aplicada

Se mantuvo el code splitting, pero se precarga de forma condicionada la pagina publica que coincide con la URL inicial antes de crear el router.

Implementacion final:

- `src/app/router.tsx`
- precarga solo para la ruta inicial (`/menu/`, `/especiales/`, `/nosotros/`, `/contacto/`, `/reservar/`, `/declaracion-de-accesibilidad/`)
- el resto de navegaciones sigue usando `lazy(...)`

Se descarto una importacion eager global porque eliminaba el CLS, pero empeoraba innecesariamente el bundle inicial y hacia fallar `bundle:budget`.

## Ajuste adicional de tooling

El analisis de bundle podia seleccionar artefactos `index-*.js` obsoletos dentro de `dist/assets`.

Correccion aplicada:

- `scripts/performance/bundle-lib.mjs`
- el chunk inicial ahora se obtiene leyendo el `script` real referenciado por `dist/index.html`

Esto alinea `bundle:budget` y `bundle:analyze` con el build actual, no con restos de builds previos.

## Resultado final verificado

### `/menu/` desktop

- `PerformanceObserver`: CLS `0.0026318383715669964`
- Lighthouse: `99 / 100 / 100 / 100`
- LCP: `923.6542500000002 ms`
- CLS: `0.002940386717774191`
- TBT: `0 ms`

### Medianas de 3 ejecuciones

`menuDesktop`

- Performance: `99`
- Accessibility: `100`
- Best Practices: `100`
- SEO: `100`
- LCP: `920.01125 ms`
- CLS: `0.003939921500228467`
- TBT: `0 ms`

`homeDesktop`

- Performance: `98`
- Accessibility: `100`
- Best Practices: `100`
- SEO: `100`
- LCP: `897.48975 ms`
- CLS: `0.01227791475020914`
- TBT: `0 ms`

`menuMobile`

- Performance: `80`
- Accessibility: `100`
- Best Practices: `100`
- SEO: `100`
- LCP: `4378.58085 ms`
- CLS: `0.00286949507995333`
- TBT: `6.5 ms`

## Conclusion

El CLS grave de Fase 7 no venia de tipografias ni de una condicion exclusiva de Windows. La causa confirmada era el orden de pintado entre el shell y las rutas lazy en carga directa. La solucion final elimina el desplazamiento severo en `/menu/`, conserva el code splitting y mantiene el bundle inicial dentro del presupuesto.
