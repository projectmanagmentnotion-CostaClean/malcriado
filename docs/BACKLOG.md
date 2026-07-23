# Backlog

## Estado Fase 12C

- `CERRADO`: modo de contacto sin persistencia, con UUID, Zod y acciones explícitas.
- `CERRADO`: rutas dev fuera del build de producción y 404 en `/dev/*`.
- `CERRADO`: paquete reproducible SiteGround con checksums.
- `CERRADO`: backup real de SiteGround y copia local restaurable verificados antes de publicar.
- `CERRADO`: despliegue, purga de caché y smoke remoto completados el 2026-07-22.
- `P3 OPERATIVO`: control post-lanzamiento a 24 horas y 7 días, incluido Search Console cuando esté disponible.
- `P1`: validación final de horarios/precios y datos jurídicos por el titular.
- `P2`: activar proveedor API futuro solo tras revisión legal, seguridad, staging y rollback a `contact`.
- `P2`: pasada humana con NVDA/VoiceOver y dispositivos Safari/iOS/Android reales.

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

- Revisar el desfase no desplazable de `scrollWidth` en Home a `320x568`.
  Razon: la matriz de Fase 11 no detecta scroll horizontal real, pero la emulacion reporta `326px` de ancho documental frente a `320px` de viewport.
  Dependencia: repeticion en dispositivo real o emulacion adicional.
  Fase: `Fase 11`.
  Criterio de cierre: medicion descartada como artefacto o corregida en layout base.

## P3

- Completar la descarga de originales oficiales temporalmente limitada por Google Drive.
  Razon: el inventario y las 98 previews estan completos, pero Drive limito el lote de originales despues de varias descargas.
  Criterio de cierre: 98 JPG originales inventariados con dimensiones, EXIF, hash y duplicados, siempre fuera del build y de Git.

- Realizar una sesion fotografica del local, terraza y equipo.
  Razon: la biblioteca oficial contiene platos y un evento de food truck, pero no una serie inequivoca de sala/equipo del restaurante.
  Criterio de cierre: seleccion A con derechos confirmados, crops responsive y derivados AVIF/WebP.

- Validar la Fase 13 en Safari/iOS, Android y lector de pantalla real.
  Razon: la matriz `180/180` es Chromium emulado.
  Criterio de cierre: evidencia humana sin P0/P1/P2 o incidencias corregidas.

- Confirmar LCP p75 de campo y valorar prerender del shell SPA.
  Razon: Lighthouse del rediseño en produccion identifica `asset-019` como LCP; Home móvil midió 3,05 s y Reserva móvil 3,27 s, con prioridad alta, CLS 0 y puntuaciones 93/92. No existen aún datos p75 reales.
  Dependencia: tráfico de producción y dispositivo real.
  Fase: `Fase 12`.
  Criterio de cierre: LCP p75 <= 2,5 s o plan de arquitectura aprobado para una iteracion posterior.

- Confirmar CWV de campo con red y hardware menos favorables.
  Razon: producción ya dispone de línea base Lighthouse, pero sigue siendo una medición de laboratorio.
  Dependencia: datos reales suficientes en producción.
  Fase: `Fase 11` y `Fase 12`.
  Criterio de cierre: metrica real registrada y dentro de presupuesto aceptado.
