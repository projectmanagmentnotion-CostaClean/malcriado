# Reservation Privacy

Fecha: 2026-07-21

## Alcance actual

La ruta `/reservar/` gestiona solicitudes de reserva, no reservas confirmadas. El frontend solo debe recoger los datos minimos necesarios para tramitar una solicitud manual.

## Datos tratados en frontend

- Nombre
- Telefono
- Correo electronico opcional o requerido solo si el usuario prefiere respuesta por email
- Fecha
- Hora
- Numero de personas
- Mensaje libre
- Preferencia de canal
- Consentimiento de privacidad
- Contexto comercial no personal de origen (`dish`, `category`, `offer`, `context`, `source`)

## Principios aplicados

- Consentimiento explicito no premarcado.
- Sin marketing separado mientras no exista necesidad aprobada.
- Sin PII en query params.
- Sin PII en analytics de frontend.
- Sin secretos ni credenciales en cliente.
- Sin afirmaciones de disponibilidad en tiempo real.

## URL y contexto

- Los query params permitidos son editoriales y comerciales, no personales.
- Los valores invalidos deben ignorarse.
- El contexto debe poder limpiarse desde la propia UI.

## Analytics

La instrumentacion de reserva solo puede registrar:

- canal preferido
- numero de personas
- presencia de mensaje
- tags de contexto no personal

No puede registrar:

- nombre
- telefono
- email
- texto libre del mensaje

## Integracion futura

La integracion real debe revisar antes de pasar a produccion:

- base juridica exacta
- politica de conservacion
- encargado de tratamiento
- canal operativo real de confirmacion
- medidas server-side de antispam
- copia final de privacidad validada por titular y asesor competente
