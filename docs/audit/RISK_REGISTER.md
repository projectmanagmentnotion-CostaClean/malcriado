# Risk Register

| Riesgo | Probabilidad | Impacto | Prioridad | Mitigación | Responsable sugerido | Fase |
|---|---|---|---|---|---|---|
| Derechos de imagen no confirmados | Alta | Alta | `P0` | Confirmación expresa del titular por asset/lote | Anderson | `Fase 2` |
| Vídeos públicos bloqueados por captcha | Alta | Media | `P1` | Solicitar originales o acceso alternativo | Anderson | `Fase 2` |
| Información gastronómica sin precios | Alta | Alta | `P0` | Validar carta real antes de modelarla | Anderson | `Fase 3` |
| Alérgenos ausentes | Alta | Alta | `P0` | No publicar claims dietéticos sin validación | Anderson | `Fase 3` |
| Horario desactualizado | Alta | Alta | `P0` | Confirmación por día y festivos | Anderson | `Fase 3` |
| `sample-page` indexable | Alta | Alta | `P0` | Retirar o redirigir | Implementación | `Fase 5` |
| Dependencia de WhatsApp como reserva principal | Alta | Alta | `P0` | Proveedor desacoplado y copia legal correcta | Producto/Anderson | `Fase 8` |
| Formulario actual sin disponibilidad real confirmada | Media | Alta | `P1` | Separar `solicitud enviada` de `reserva confirmada` | Producto | `Fase 8` |
| Rendimiento de vídeo en mobile | Media | Alta | `P1` | Poster, lazy-load y fallback estático | Frontend | `Fase 2` y `Fase 6` |
| Exceso de ScrollTrigger en futura reconstrucción | Media | Media | `P2` | Mantener progressive enhancement y budget por escena | Frontend | `Fase 10` |
| Accesibilidad degradada por JS obligatorio del formulario | Media | Alta | `P1` | Flujo de reserva accesible y no dependiente de JS pesado | Frontend | `Fase 8` |
| Consentimiento/cookies incompletos | Alta | Alta | `P0` | Inventario real de terceros y gestor reversible | Legal/Frontend | `Fase 9` |
| SEO local incoherente entre web y realidad | Media | Alta | `P1` | Fuente tipada única y validada para NAP/horarios | Producto | `Fase 3` y `Fase 5` |
| Contenido temporal mezclado con evergreen | Media | Media | `P2` | Modelar vigencia explícita en `offers` | Producto | `Fase 3` |
| Información legal incompleta | Alta | Alta | `P0` | No pasar a producción sin checklist cerrada | Anderson/Legal | `Fase 9` |
