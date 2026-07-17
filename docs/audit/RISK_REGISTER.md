# Risk Register

| Riesgo | Probabilidad | Impacto | Prioridad | Mitigacion | Responsable sugerido | Fase |
|---|---|---|---|---|---|---|
| Derechos de imagen no confirmados | Media | Alta | `P0` | Mantener excluidos del pipeline productivo los assets en `PENDING_RIGHTS` hasta confirmacion expresa del titular | Anderson | `Fase 2` |
| Videos publicos bloqueados por captcha | Alta | Media | `P1` | Solicitar originales o acceso alternativo; el pipeline local ya esta listo pero no puede generar posters sin los MP4 reales | Anderson | `Fase 2` |
| Informacion gastronomica sin precios | Alta | Alta | `P0` | Validar carta real antes de modelarla | Anderson | `Fase 3` |
| Alergenos ausentes | Alta | Alta | `P0` | No publicar claims dieteticos sin validacion | Anderson | `Fase 3` |
| Horario desactualizado | Alta | Alta | `P0` | Confirmacion por dia y festivos | Anderson | `Fase 3` |
| Warnings editoriales permanentes ignorados en CI | Media | Media | `P1` | Mantener `content:validate` con errores bloqueantes y `content:report` como visibilidad operativa de warnings | Frontend | `Fase 3` |
| `sample-page` indexable | Alta | Alta | `P0` | Retirar o redirigir | Implementacion | `Fase 5` |
| Dependencia de WhatsApp como reserva principal | Alta | Alta | `P0` | Proveedor desacoplado y copia legal correcta | Producto/Anderson | `Fase 8` |
| Formulario actual sin disponibilidad real confirmada | Media | Alta | `P1` | Separar `solicitud enviada` de `reserva confirmada` | Producto | `Fase 8` |
| Rendimiento de video en mobile | Media | Alta | `P1` | Poster, lazy-load, pausa por viewport y fallback estatico cuando los originales esten disponibles | Frontend | `Fase 2` y `Fase 6` |
| Seleccion editorial incorrecta de crops o assets destacados | Media | Media | `P2` | Revision en `/dev/assets/`, manifiesto con focal points y documento `ART_DIRECTION_CROPS.md` | Frontend/Producto | `Fase 2` y `Fase 6` |
| Exceso de ScrollTrigger en futura reconstruccion | Media | Media | `P2` | Mantener progressive enhancement y budget por escena | Frontend | `Fase 10` |
| Accesibilidad degradada por JS obligatorio del formulario | Media | Alta | `P1` | Flujo de reserva accesible y no dependiente de JS pesado | Frontend | `Fase 8` |
| Consentimiento/cookies incompletos | Alta | Alta | `P0` | Inventario real de terceros y gestor reversible | Legal/Frontend | `Fase 9` |
| SEO local incoherente entre web y realidad | Media | Alta | `P1` | Fuente tipada unica y validada para NAP/horarios | Producto | `Fase 3` y `Fase 5` |
| Contenido temporal mezclado con evergreen | Media | Media | `P2` | Modelar vigencia explicita en `offers` | Producto | `Fase 3` |
| Informacion legal incompleta | Alta | Alta | `P0` | No pasar a produccion sin checklist cerrada | Anderson/Legal | `Fase 9` |
