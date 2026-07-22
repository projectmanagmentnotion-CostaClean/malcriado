# Fase 12B — lanzamiento de producción

## Alcance

Fase 12B entrega un candidato publicable sin backend: reservas en modo `contact`, build reproducible, paquete SiteGround, checksums y procedimientos de backup, despliegue, rollback y monitorización. No crea Supabase, base de datos, SMTP, webhook ni función serverless.

## Decisiones de lanzamiento

- Modo de reserva de producción: `VITE_RESERVATION_MODE=contact`.
- La validación Zod y el UUID se ejecutan en el navegador.
- Preparar la solicitud no realiza `fetch`, no persiste PII y no representa éxito remoto.
- WhatsApp es la acción principal; correo, copia y llamada son alternativas explícitas.
- Las alergias solo entran en el mensaje con consentimiento específico, desmarcado por defecto.
- `/dev/*` devuelve la página 404 en producción y sus módulos no forman parte del build.
- Source maps públicos desactivados; analítica desactivada; indexación de producción activa.

## Estado de cierre

- Código y documentación: implementados en `codex/phase-12b-production-launch`.
- Paquete: `release/malcriado-production.zip`.
- Inventario: 384 archivos publicables.
- ZIP final tras revisión independiente: 25.340.269 bytes; SHA-256 `b43ef4ff6d395b820067641a15883a174256dfba9b7e16f061e6c87004ae997a`.
- Reproducibilidad: dos empaquetados consecutivos con el mismo SHA-256 final; carpeta, entradas ZIP y manifiesto se verifican byte a byte con `npm run release:verify`.
- Despliegue: solo se considera realizado si existe backup operativo y se registra la URL y hora en `PRODUCTION_SMOKE_TEST.md`.
- Merge: bloqueado hasta revisión independiente, CI verde y verificación del paquete.

## Evidencia de QA local — 2026-07-22

- `npm run qa`: verde; 82/82 pruebas unitarias.
- Playwright de producción: 45 aprobadas, 5 omitidas de forma prevista.
- Lighthouse CI: exit 0. Home 84/100 y Reserva 88/100 en rendimiento; accesibilidad, buenas prácticas y SEO 100/100 en ambas rutas.
- LCP de laboratorio: Home 4.148 ms y Reserva 3.689 ms. En ambos casos el elemento es `asset-019` (`landscape-960.avif`); la imagen ya es eager, responsive y `fetchpriority=high`, sin CLS. Se mantiene como deuda P3 de medición prerender/campo, no como motivo para ocultar contenido.
- Bundle inicial: 183.835 bytes (179,53 KiB), dentro del presupuesto de 500 KiB.
- `npm audit`: 0 vulnerabilidades.
- Artefacto: 0 source maps y 0 marcadores de rutas o mocks de desarrollo.
- Axe de producción: 0 violaciones en Home/Reserva, desktop, móvil y reduced motion; 0 errores de consola o requests externos inesperados.
- CI remoto conserva `quality`, `e2e` y `lighthouse` independientes; `quality` verifica el SHA final y `e2e` incluye Axe de producción.

La revisión independiente se registra en `docs/qa/PHASE_12B_INDEPENDENT_REVIEW.md`. El hash recibido `7bca0b1c...` fue correcto antes de corregir el copy ambiguo “confirmar”; esa corrección genera legítimamente el hash final indicado arriba.

## Deuda que no bloquea el paquete

- Integración API futura, documentada pero inactiva.
- Pruebas humanas en Safari/iOS, Android y lector de pantalla real.
- Métricas p75 de campo, disponibles únicamente después de recibir tráfico real.
- Sustitución de datos jurídicos ausentes tras revisión del titular; no se inventan ni se muestran huecos.
