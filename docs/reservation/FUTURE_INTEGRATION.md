# Future Reservation Integration

Fecha: 2026-07-21

## Objetivo

Sustituir `MockReservationAdapter` por una integracion real sin rehacer la UI ni el dominio.

## Contrato objetivo

La integracion real debe implementar:

```ts
interface ReservationAdapter {
  submit(request: ReservationRequest): Promise<ReservationResult>;
}
```

## Requisitos minimos de la integracion real

- Endpoint o proveedor externo validado por titular.
- Idempotencia server-side.
- Proteccion antispam server-side.
- Persistencia o encaminamiento operativo real.
- Respuesta que distinga:
  - solicitud aceptada
  - rate limit
  - timeout
  - fallo operativo
- Sin confirmacion falsa de disponibilidad.

## Datos que deben viajar

- contacto
- fecha y hora
- comensales
- mensaje
- canal preferido
- contexto editorial/comercial
- consentimiento
- idempotency key

## Datos que no deben enviarse a analytics

- nombre
- telefono
- email
- texto libre
- idempotency key

## Checklist previo a produccion

- validar proveedor y encargado de tratamiento
- definir SLA operativo
- confirmar destinatarios reales
- validar politicas de retencion
- confirmar horarios y cierres
- anadir observabilidad sin PII
- QA con red real, timeout real y escenarios de concurrencia
