# Despliegue del sistema de reservas

## Variables frontend

```env
VITE_PUBLIC_SITE_URL=https://staging.malcriadobcn.com
VITE_STAGING_NOINDEX=true
VITE_RESERVATION_API_URL=https://staging.malcriadobcn.com/api/reservations
```

Si `VITE_RESERVATION_API_URL` queda vacia, la interfaz prepara WhatsApp y correo sin simular recepcion.

## Secretos backend (no Vite, no Git)

```text
SUPABASE_URL
SUPABASE_SERVICE_ROLE_KEY
RESERVATION_ALLOWED_ORIGIN
RESERVATION_RETENTION_DAYS
SMTP_HOST
SMTP_PORT
SMTP_USER
SMTP_PASSWORD
SMTP_FROM
RESERVATION_NOTIFY_TO
```

## Persistencia

Tabla `reservation_requests`: UUID primary key, idempotency key unique, estado controlado, campos cifrados o protegidos por RLS, timestamps y fecha de expiracion. No exponer SELECT/UPDATE anonimos. La Edge Function valida el payload, aplica limite por IP anonimizada, inserta como `received`, envia SMTP y devuelve `202`.

## Verificacion previa a activar endpoint

1. Configurar Supabase, tabla/RLS y Edge Function.
2. Configurar SMTP con SPF, DKIM y DMARC.
3. Probar 201/202, 400, 403, 422, 429 y fallo SMTP.
4. Probar idempotencia y expiracion de datos.
   El mismo `Idempotency-Key` debe devolver la misma referencia y generar una sola notificacion.
5. Verificar que los logs no contienen nombre, telefono, email, alergias ni comentarios.
6. Ejecutar smoke desde staging con origen exacto.

No activar `VITE_RESERVATION_API_URL` hasta completar estas comprobaciones.

El adaptador en memoria es solo una referencia ejecutable para tests. Supabase debe implementar el resultado atomico `created/existing` mediante constraint unica; no debe enviar SMTP en conflicto idempotente.
