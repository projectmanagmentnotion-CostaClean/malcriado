# Reservation Architecture

Fecha: 2026-07-21
Estado: en desarrollo activo de Fase 8

## Objetivo

La reserva se implementa como un flujo de solicitud accesible, contextual y desacoplado del proveedor final. La web nunca comunica confirmacion automatica ni disponibilidad en tiempo real.

## Estructura

La feature vive en `src/features/reservation/` y se separa por responsabilidades:

- `domain/`
  Tipos de negocio y contrato del flujo.
- `config/`
  Reglas tipadas en `PENDING_VALIDATION` para antelacion, horarios, cierres y limites.
- `context/`
  Parser y resolucion segura de `dish`, `category`, `offer`, `context` y `source`.
- `validation/`
  Normalizacion, validacion accesible, fingerprint e idempotency key.
- `adapters/`
  Contrato `ReservationAdapter` y `MockReservationAdapter` preparada para sustituirse por integracion real.
- `state/`
  Orquestacion del formulario, reintentos, deduplicacion y estados de envio.
- `ui/`
  Formulario, panel de contexto, resumen de errores, stepper de comensales y panel de estados.
- `analytics/`
  Payload no personal y sin texto libre.

## Flujo

1. `ReservarPage` lee query params.
2. `parseReservationContext()` valida y resuelve el contexto visible.
3. `useReservationForm()` mantiene estado, antispam y deduplicacion.
4. `validateReservationFormValues()` normaliza entradas y produce errores accesibles.
5. `buildReservationRequest()` construye payload tipado con fingerprint e idempotency key.
6. `MockReservationAdapter.submit()` resuelve modo de respuesta y protege repeticiones por idempotency key.
7. La UI muestra `submitting`, `success`, `offline`, `timeout`, `rate_limited` o `error`.

## Dominio

Tipos principales:

- `ReservationRequest`
- `ReservationContext`
- `ReservationContact`
- `ReservationDateTime`
- `ReservationPreferences`
- `ReservationConsent`
- `ReservationSubmission`
- `ReservationResult`
- `ReservationError`

## Adaptador mock

`MockReservationAdapter` ya soporta:

- `success`
- `error`
- `timeout`
- `offline`
- `rate_limited`

Tambien deduplica por `idempotencyKey` y devuelve `duplicate_ignored` cuando ya existe una solicitud equivalente aceptada.

## Seguridad funcional

- Sin PII en query params.
- Sin PII en analytics.
- Sin logs del payload completo.
- Honeypot.
- Tiempo minimo de envio.
- Doble clic y doble submit bloqueados.
- Idempotency key estable por fingerprint y sesion.

## Limites actuales

- Sigue siendo mock: no hay endpoint real, ni proveedor real, ni validacion server-side.
- Los horarios operativos siguen en `PENDING_VALIDATION`.
- La confirmacion manual sigue siendo obligatoria.
