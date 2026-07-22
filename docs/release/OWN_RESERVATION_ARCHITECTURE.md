# Arquitectura propia de reservas

Fecha: `2026-07-22`

## Contrato

El frontend construye una solicitud Zod-compatible y la entrega a `ReservationProvider`. El proveedor usa `VITE_RESERVATION_API_URL` cuando existe; en su ausencia genera acciones explicitas de WhatsApp y correo y devuelve `action_required`. Ese fallback nunca afirma persistencia ni abre aplicaciones sin accion del usuario.

La respuesta positiva exacta del endpoint es: “Solicitud recibida. El equipo de Malcriado revisará la disponibilidad y te confirmará la reserva por teléfono, WhatsApp o correo.”

## Modulos

- `reservationTypes.ts`: estados `received`, `pending_review`, `confirmed`, `rejected`, `cancelled`.
- `reservationSchema.ts`: validacion server-side con Zod.
- `reservationRepository.ts`: contrato de persistencia y memoria solo para desarrollo local.
- `reservationNotification.ts`: mensajes codificados sin analytics.
- `reservationProvider.ts`: endpoint/fallback.
- `reservationApiHandler.ts`: POST, validacion, origen, rate limiting e inyeccion de repositorio/notificacion.

Cada solicitud recibe UUID no secuencial e idempotency key. Honeypot y tiempo minimo operan en cliente; el endpoint vuelve a validar el honeypot, el origen y el esquema. Los logs de infraestructura deben limitarse a referencia, estado, latencia y codigo de error, nunca payload completo.

## Backend elegido

Objetivo: Supabase Postgres + Edge Function para `/api/reservations`, con SMTP desde la funcion y secretos solo server-side. Motivo: SiteGround no soporta Node.js en hosting Shared ni Cloud según su documentacion oficial. Hasta disponer de proyecto, claves, dominio de funcion y SMTP, produccion debe permanecer en fallback WhatsApp/correo.

La clase `LocalDevelopmentReservationRepository` se limita a QA y no puede activarse como persistencia de produccion.
