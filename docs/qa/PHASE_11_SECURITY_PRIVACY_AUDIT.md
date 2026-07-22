# Fase 11 - Seguridad y privacidad

Fecha: `2026-07-22`

## Reserva

- La web no comunica ninguna reserva como confirmada automaticamente.
- El formulario sigue hablando de `solicitud` y `confirmacion manual`.
- No hay `fetch`, SMTP ni endpoint real activo en frontend para reserva.
- No hay secretos embebidos en cliente.

## Consentimiento

- aceptar
- rechazar
- personalizar
- revisar preferencias posteriormente
- persistencia versionada en `localStorage`/`sessionStorage`
- terceros no esenciales bloqueados antes del consentimiento
- contenido externo activo en esta fase: mapa condicionado por consentimiento

## PII y logs

- No se detecto PII en URL de rutas publicas auditadas.
- No se detectaron analytics activos ni pixeles cargados antes del consentimiento.
- La busqueda repo-local no detecto secretos ni credenciales en `.env.example`, `src`, `public`, `README` ni `docs`.

## Terceros

- `Google Maps embed` bloqueado hasta consentimiento valido.
- No hay proveedor activo de analytics o marketing en esta fase.

## Deuda abierta

- Politicas legales siguen pendientes de cierre con datos reales del titular.
- Si en lanzamiento se activa analytics o marketing, debera reabrirse esta auditoria.
