# Fase 8 Live Baseline

Fecha de auditoria: 2026-07-21
Entorno auditado: `http://127.0.0.1:5173/`
Referencia visual: capturas en `artifacts/phase-8-baseline/`

## URLs revisadas

- `/reservar/`
- `/reservar/?context=home-hero`
- `/reservar/?dish=pizza-margarita`
- `/reservar/?dish=margarita`
- `/reservar/?category=pizzas`
- `/reservar/?source=specials`
- query invalida con `dish/category/source`

## Estado visual actual

- Desktop: layout partido en dos columnas, con hero editorial a la izquierda y formulario a la derecha.
- Mobile: el contenido se apila correctamente, pero el hero queda corto y el formulario domina casi todo el recorrido.
- El footer es visible y funciona como cierre de pagina.
- La navegacion superior funciona y el menu movil aparece en mobile.
- El CTA principal es el boton `Enviar solicitud`; los canales alternativos existen pero no quedan jerarquizados como fallback operativo.

## Contexto y query params

- `?context=home-hero` muestra bloque de contexto de navegacion.
- `?dish=pizza-margarita` muestra `Margarita / Pizzas`.
- `?dish=margarita` muestra `Margarita / Cocteles`.
- `?category=pizzas` muestra contexto de carta por categoria.
- `?source=specials` no aporta valor visible adicional porque `source` todavia no se interpreta.
- Query invalida: el estado actual no rompe la pagina y no refleja HTML inyectado, pero tampoco informa claramente que ha ignorado parametros invalidos.

## Campos actuales

- Fecha
- Hora
- Comensales
- Nombre
- Contacto unico
- Notas
- Checkbox de privacidad

## Accesibilidad observada

- Semantica base correcta: `h1`, formulario, labels y footer.
- No existe resumen de errores.
- No existe foco programatico al primer error.
- No existe diferenciacion entre telefono y email.
- El contexto visible no puede limpiarse desde UI.
- El formulario usa validacion nativa minima y depende de placeholders del navegador para parte del feedback.

## Responsive y navegacion

- `localhost` y `127.0.0.1` funcionan correctamente en navegador fresco.
- Reload, back y forward ya estaban validados previamente.
- El menu movil abre y cierra bien, pero la reserva no tiene una version mobile especialmente optimizada para conversion.

## Consola y red

- Sin errores funcionales bloqueantes observados en el baseline.
- Sin fallos de red relevantes en la ruta base de reserva durante la auditoria manual.

## Hallazgos baseline

- P0: ninguno en el estado auditado.
- P1: la logica sigue acoplada a `ReservarPage.tsx` y el formulario no esta preparado para integracion real.
- P1: no hay validacion accesible centralizada ni adaptador de envio con payload rico.
- P2: `source` no se representa de forma consistente y no hay forma de limpiar contexto.
- P2: el campo `contacto` mezcla telefono y email y dificulta reglas claras de privacidad y validacion.
- P3: la jerarquia visual de fallback y politicas operativas puede ser mas clara.
