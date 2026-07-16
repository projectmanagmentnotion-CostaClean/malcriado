# Backlog

## P0

- Despublicar o bloquear `sample-page`.
  Razon: contenido basura indexable.
  Dependencia: ninguna.
  Fase: `Fase 5`.
  Criterio de cierre: la URL deja de ser indexable o redirige correctamente.

- Confirmar datos comerciales y legales con Anderson.
  Razon: faltan razon social, NIF/CIF, horarios por dia, precios y alergenos.
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

- Sustituir o re-fotografiar los assets marcados como `LOW_QUALITY`.
  Razon: `Margaritas-cocteles.webp` y `cheese-cake-malcriado-2.webp` quedaron fuera del pipeline productivo por calidad insuficiente.
  Dependencia: nueva fuente visual aprobada.
  Fase: `Fase 2`.
  Criterio de cierre: reemplazos auditados y derivados generados.

- Normalizar taxonomia de cocteles, vinos y categorias ambiguas del menu.
  Razon: hay entradas demasiado genericas o mezcladas (`Margarita`, `Maracuya`, `Fresa`, `U.D`).
  Dependencia: validacion de carta.
  Fase: `Fase 3`.
  Criterio de cierre: modelo tipado sin ambiguedad.

- Revisar copy geografica y claims editoriales.
  Razon: aparece `Costa Brava` junto a `Pineda de Mar`; conviene validar precision comercial.
  Dependencia: validacion del titular.
  Fase: `Fase 3`.
  Criterio de cierre: copy aprobado y unico.

## P3

- Documentar capturas visuales o QA manual complementaria desde navegador interactivo.
  Razon: util para Fase 4+ pero no bloqueante para este sprint documental.
  Dependencia: entorno de QA visual.
  Fase: `Fase 11`.
  Criterio de cierre: evidencias archivadas por viewport y reduced motion.
