# Integración futura con Supabase

Este documento es diseño, no infraestructura aplicada. No existe proyecto, credencial, migración remota, tabla, Edge Function ni dato de ejemplo de Supabase.

## Límite de arquitectura

El formulario depende del contrato estable `ReservationProvider.submit(request, context)`. El cambio futuro consiste en configurar `VITE_RESERVATION_MODE=api` y un endpoint público propio; los componentes del formulario no cambian y no conocen Supabase.

## Modelo propuesto

Tabla `reservations` con `id uuid primary key`, datos mínimos cifrados/protegidos, `status` (`received`, `pending_review`, `confirmed`, `rejected`, `cancelled`), `idempotency_key unique`, `created_at` y `updated_at`. La retención y eliminación deben definirse con el responsable jurídico antes de crearla.

## Seguridad prevista

- RLS activa y acceso anónimo directo a tabla denegado.
- Escritura únicamente mediante Edge Function o API equivalente.
- Validación Zod en servidor, origin allowlist, honeypot, rate limiting e idempotencia.
- Service role solo en secreto del servidor; nunca `VITE_*` ni bundle cliente.
- Respuesta pública mínima: referencia y estado recibido, sin eco de PII.
- Logs estructurados sin nombre, teléfono, correo, notas o alergias.
- Notificación desacoplada y reintentable; una sola notificación por idempotency key.

## Variables futuras

Cliente: `VITE_RESERVATION_MODE=api` y `VITE_RESERVATION_API_URL`. Servidor: URL del proyecto, service role, allowlist, límites y proveedor de notificación, siempre en secretos del entorno.

## Criterios antes de activar

Revisión jurídica, DPA y retención aprobados; RLS probado; rate limit verificado; borrado operativo; backup; monitorización; pruebas E2E; staging; y rollback a `contact` ensayado.
