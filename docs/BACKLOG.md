# Backlog

## P0

- Despublicar o bloquear `sample-page`.
  Razon: contenido basura indexable.
  Dependencia: ninguna.
  Fase: `Fase 5`.
  Criterio de cierre: la URL deja de ser indexable o redirige correctamente.

- Confirmar datos comerciales y legales con Anderson.
  Razon: el modelo editorial ya existe, pero faltan razon social, NIF/CIF, horarios por dia, precios y alergenos.
  Dependencia: respuesta del titular.
  Fase: `Fase 3` y `Fase 9`.
  Criterio de cierre: fuentes tipadas completas y checklist validada.

- Definir proveedor real de reservas desacoplado de WhatsApp.
  Razon: el sitio actual no tiene flujo robusto ni verificable.
  Dependencia: decision del titular.
  Fase: `Fase 8`.
  Criterio de cierre: proveedor abstraido, copy legal correcto y recorrido E2E probado.

## P1

- Resolver el acceso a los dos MP4 publicos referenciados en `home`.
  Razon: el pipeline de imagen ya esta cerrado, pero los MP4 siguen respondiendo desafio `SG-Captcha` y no se pueden optimizar desde origen real.
  Dependencia: acceso estable o entrega directa de los originales.
  Fase: `Fase 2`.
  Criterio de cierre: video descargado, hash calculado, poster generado y variantes finales exportadas.

- Confirmar derechos del asset `Mjoitos-fresa-y-maracuya-malcriado.webp`.
  Razon: el manifiesto ya existe, pero este asset sigue en estado `PENDING_RIGHTS` y queda excluido de produccion.
  Dependencia: confirmacion expresa del titular.
  Fase: `Fase 2`.
  Criterio de cierre: rights status resuelto y decision final de inclusion o descarte.

- Consolidar `descargo-de-responsabilidad` con la estrategia legal definitiva.
  Razon: posible solape con `aviso-legal`.
  Dependencia: validacion legal.
  Fase: `Fase 9`.
  Criterio de cierre: una sola estructura legal coherente y redirecciones definidas.

## P2

- Revisar el peso final de las fuentes autocontenidas y valorar subsetting mas agresivo si afecta al presupuesto movil.
  Razon: `Bodoni Moda Variable` y `Manrope Variable` mejoran la direccion artistica, pero aun puede optimizarse el set final servido.
  Dependencia: medicion continua en Fase 11.
  Fase: `Fase 4` y `Fase 11`.
  Criterio de cierre: subsets definitivos validados sin perder idiomas requeridos.

- Sustituir o re-fotografiar los assets marcados como `LOW_QUALITY`.
  Razon: `Margaritas-cocteles.webp` y `cheese-cake-malcriado-2.webp` quedaron fuera del pipeline productivo por calidad insuficiente.
  Dependencia: nueva fuente visual aprobada.
  Fase: `Fase 2`.
  Criterio de cierre: reemplazos auditados y derivados generados.

- Normalizar taxonomia de cocteles, vinos y categorias ambiguas del menu.
  Razon: Fase 7 resolvio el slug publico duplicado de `Margarita`, pero el modelo actual aun conserva entradas ambiguas auditadas (`Maracuya`, `Fresa`, `U.D`, vinos genericos) para no inventar contenido.
  Dependencia: validacion de carta.
  Fase: `Fase 3`.
  Criterio de cierre: modelo tipado sin ambiguedad.

- Completar descripciones editoriales de 38 items del menu.
  Razon: Fase 7 hizo visible la deuda editorial real y la incorporo al validador.
  Dependencia: confirmacion del titular o fuente publica verificable.
  Fase: `Fase 7` y posterior.
  Criterio de cierre: `missingDescriptions = 0` o justificacion expresa de omision.

- Revisar copy geografica y claims editoriales.
  Razon: aparece `Costa Brava` junto a `Pineda de Mar`; conviene validar precision comercial.
  Dependencia: validacion del titular.
  Fase: `Fase 3`.
  Criterio de cierre: copy aprobado y unico.

- Pasada humana con lector de pantalla real sobre la home inmersiva final.
  Razon: Axe y teclado estan cerrados, pero la verificacion de Fase 6 no sustituye una prueba humana de NVDA o VoiceOver.
  Dependencia: sesion manual de accesibilidad.
  Fase: `Fase 11`.
  Criterio de cierre: incidencias documentadas y resueltas o aceptadas.

- Contrastar el Lighthouse de `home` y `menu` en preview o produccion real.
  Razon: el laboratorio local de Windows mantiene lecturas pobres de CLS/LCP aunque la QA funcional y la matriz responsive de Fase 7 esten verdes.
  Dependencia: entorno de preview o produccion equivalente y repeticion de la medicion fuera del escritorio local.
  Fase: `Fase 11`.
  Criterio de cierre: discrepancia explicada o corregida con evidencia reproducible.

- Revisar el desfase no desplazable de `scrollWidth` en Home a `320x568`.
  Razon: la matriz de Fase 11 no detecta scroll horizontal real, pero la emulacion reporta `326px` de ancho documental frente a `320px` de viewport.
  Dependencia: repeticion en dispositivo real o emulacion adicional.
  Fase: `Fase 11`.
  Criterio de cierre: medicion descartada como artefacto o corregida en layout base.

## P3

- Medir LCP e INP en preview o produccion real con red y hardware menos favorables.
  Razon: el Lighthouse local de Fase 6 es excelente, pero sigue siendo una medicion de laboratorio local.
  Dependencia: entorno de preview o produccion controlado.
  Fase: `Fase 11` y `Fase 12`.
  Criterio de cierre: metrica real registrada y dentro de presupuesto aceptado.

- Reducir LCP/CLS local del hero de Home antes del lanzamiento final si las mediciones remotas confirman el problema.
  Razon: Fase 11 mide `performance 78`, `LCP 4.3 s` y `CLS 0.102` en Home sobre preview local de Windows.
  Dependencia: contraste en preview o produccion equivalente.
  Fase: `Fase 12`.
  Criterio de cierre: medicion estable dentro de objetivo o deuda aceptada explicitamente.
