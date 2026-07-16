# ADR 0004: Reservation Provider Abstraction

- Estado: `Accepted`

## Contexto

El sitio actual mezcla CTA a WhatsApp con un formulario `WPForms` cuya operativa real no está verificada.

## Decisión

La nueva web separará la interfaz de reserva del proveedor real mediante una capa de abstracción.

## Alternativas consideradas

- Fijar WhatsApp como solución definitiva.
- Acoplar el frontend a un proveedor específico desde el inicio.

## Consecuencias

- Permite cambiar de proveedor sin reescribir la UI.
- Facilita distinguir `solicitud enviada` de `reserva confirmada`.

## Riesgos

- Requiere definir contrato y estados desde Fase 8.
- Si el titular no decide proveedor a tiempo, la puesta en producción se bloquea.

