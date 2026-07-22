# Modo de reservas por contacto

## Flujo público

1. La persona completa el formulario y acepta la información de privacidad.
2. El cliente sanea y valida los datos; el proveedor vuelve a validarlos con Zod.
3. Se genera una referencia UUID con `crypto.randomUUID()` y se muestra abreviada.
4. El estado pasa a `prepared_for_contact`. En este punto nada ha salido del navegador.
5. La persona revisa el mensaje visible y elige WhatsApp o correo. También puede copiarlo o llamar.

El estado público es **Solicitud preparada**. Nunca equivale a reserva confirmada, disponibilidad garantizada, dato almacenado ni mensaje enviado.

## Datos por canal

El mensaje incluye referencia abreviada, nombre, fecha, hora, personas, zona, ocasión opcional y comentarios no sensibles. No incluye correo, teléfono de la persona, fingerprint, session ID, idempotency key, analytics ni contexto interno.

Las alergias o intolerancias solo se incluyen cuando existe texto y se ha marcado: “Incluir en el mensaje la información sobre alergias o intolerancias que he indicado.” El control inicia desmarcado.

## Privacidad y persistencia

- No se usa `fetch` en `ContactReservationProvider`.
- No se usa localStorage, sessionStorage, cookies o IndexedDB para reservas.
- No existe endpoint simulado, base de datos, SMTP ni webhook.
- Los enlaces `wa.me` y `mailto:` se construyen únicamente tras la validación y requieren acción explícita.
- El consentimiento de cookies se almacena por separado y no contiene datos de reserva.

## Configuración

```dotenv
VITE_RESERVATION_MODE=contact
VITE_RESERVATION_API_URL=
```

`api` selecciona el adaptador futuro y falla de forma segura sin URL. `disabled` desactiva la preparación y remite al teléfono público.
