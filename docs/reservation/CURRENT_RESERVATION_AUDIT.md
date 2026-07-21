# Current Reservation Audit

Fecha: 2026-07-21
Ruta auditada: `/reservar/`

## Arquitectura actual

- La pagina de reserva reside en `src/pages/ReservarPage.tsx`.
- La pagina mezcla render, parser de contexto, lectura de `FormData`, envio y mensajes de estado en un solo archivo.
- El envio depende de `src/services/booking/BookingProvider.ts` con un provider mock.
- No existe feature module dedicada para reserva ni contratos de dominio orientados a integracion real.

## Campos y UX actuales

- Nombre
- Contacto unico
- Fecha
- Hora
- Comensales
- Notas
- Consentimiento de privacidad

Limitaciones:

- No separa telefono y email.
- No hay canal preferido.
- No hay honeypot.
- No hay control contextual claro.
- No hay resumen de errores.

## Validacion

- Predomina la validacion HTML nativa.
- No hay normalizacion de espacios.
- No hay reglas centrales para nombres internacionales, telefono internacional o condicion de email.
- No existe tiempo minimo anti-bot.
- No existe validacion del contexto aparte de resolver si un slug coincide con contenido local.

## Contexto

- Soporta `context`, `dish` o `item`, `category`, `offer`.
- No soporta `source` de forma efectiva.
- La resolucion de platos evita confundir `pizza-margarita` y `margarita`, pero esa logica esta embebida en la pagina.
- No existe boton para limpiar contexto.

## Privacidad

- Hay un unico checkbox con copy provisional.
- No hay separacion explicita entre finalidad de gestion de reserva y posibles comunicaciones futuras.
- No hay contrato que garantice ausencia de PII en analytics.

## Envio e integracion

- El resultado actual siempre es mock y devuelve `pending`.
- El payload actual es plano y demasiado pobre para una integracion real.
- No hay interfaz estable de adaptador orientada a proveedor futuro.

## Fallbacks

- Existen canales alternativos via contacto y WhatsApp.
- No hay jerarquia entre fallback comercial, fallback tecnico y fallback legal.

## Accesibilidad

- Base semantica correcta.
- Falta foco en primer error.
- Falta resumen de errores.
- Falta `aria-describedby` consistente.
- Falta control accesible de personas con stepper dedicado.

## Responsive

- La ruta es funcional en desktop y mobile.
- La arquitectura actual no facilita adaptar conversion, contenido contextual ni microcopys por breakpoint.

## SEO

- La URL es indexable y tiene contenido HTML.
- El formulario no bloquea indexacion, pero tampoco aporta estructura de datos ni semantica de negocio para la reserva.

## Antispam

- Sin honeypot.
- Sin tiempo minimo.
- Sin estrategia de integracion server-side futura documentada.

## Riesgos

- El acoplamiento actual complica cambiar a un endpoint real sin tocar la pagina completa.
- Las reglas de negocio pendientes no tienen contenedor tipado donde evolucionar.
- La mezcla de telefono y email dificulta consentimiento y validacion.

## Severidad

- P0: ninguno.
- P1: arquitectura monolitica y payload insuficiente para integracion real.
- P1: ausencia de validacion accesible centralizada.
- P1: ausencia de antispam basico.
- P2: `source` sin trazabilidad visible y sin clear action.
- P2: privacidad y analytics no formalizados.
- P3: oportunidades de mejora editorial y de conversion en mobile.

## Criterio de cierre de Fase 8

- Feature modular bajo `src/features/reservation/`.
- Tipos de dominio propios y adaptador estable.
- Contexto validado para `dish`, `category`, `offer`, `context`, `source`.
- Formulario breve y accesible con telefono, email condicional, fecha, hora, personas, mensaje, canal preferido y consentimiento.
- Honeypot y tiempo minimo activos.
- Errores centralizados con foco y resumen.
- Payload listo para futura integracion real sin afirmar disponibilidad.
