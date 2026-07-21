# Reservation State Matrix

Fecha: 2026-07-21

## Estados de la UI

### `idle`

- Mensaje inicial del formulario.
- Sin bloqueo del formulario.

### `submitting`

- Boton principal deshabilitado.
- Copia de envio en curso.
- Previene doble clic y doble submit.

### `success`

- Se ha registrado una solicitud.
- Nunca comunica mesa confirmada.
- Variante principal: `pending_confirmation`.
- Variante secundaria: `duplicate_ignored`.

### `offline`

- La conexion no permite enviar.
- Se ofrece reintento y canales alternativos.

### `timeout`

- El canal no responde dentro de la ventana mock.
- Reintento disponible.

### `rate_limited`

- Se ha alcanzado un limite temporal de intentos.
- Reintento disponible con `retryAfterSeconds`.

### `error`

- Error genericamente recuperable de proveedor mock.
- Reintento disponible.

## Codigos del resultado

- `pending_confirmation`
- `duplicate_ignored`
- `offline`
- `timeout`
- `rate_limited`
- `provider_error`

## Reglas UX

- Ningun estado comunica confirmacion automatica.
- Los estados de error mantienen los datos introducidos.
- El contexto visible se conserva y puede limpiarse.
- El boton principal solo se desactiva durante `submitting`.
- Los errores validos del formulario reciben foco y resumen accesible.
