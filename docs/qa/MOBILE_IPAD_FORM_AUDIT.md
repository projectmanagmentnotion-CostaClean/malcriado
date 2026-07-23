# Auditoría de formularios móvil e iPad

## Reserva

- No se modificó proveedor, validación, Supabase, backend ni persistencia.
- El formulario conserva labels visibles, mensajes asociados y confirmación manual explícita.
- Mobile usa una columna.
- Tablet portrait usa hero/contexto + formulario en dos zonas.
- Tablet landscape mantiene panel contextual y formulario amplio.
- Inputs y acciones primarias tienen altura táctil mínima.
- No existe scroll interno doble.
- El mapa permanece bloqueado antes del consentimiento y la revocación sigue disponible.

## Canales

WhatsApp, correo, copia y llamada continúan siendo acciones explícitas. Preparar una solicitud no equivale a enviarla ni a confirmar mesa.

## Validación

- Tests unitarios de reserva existentes: verdes.
- E2E de flujo, contexto, consentimiento y mapa: incluidos en la suite completa.
- La matriz responsive no detectó overflow en Reserva en 22 viewports.

## Pendiente humano

Debe probarse el teclado virtual real en iOS/Android, especialmente con foco en los últimos campos y CTA. No se declara cerrada esa comprobación con emulación desktop.
