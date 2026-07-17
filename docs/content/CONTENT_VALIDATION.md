# Content Validation

## Scripts

- `npm run content:validate`
  Ejecuta validacion Zod y devuelve error solo si hay fallos estructurales.
- `npm run content:report`
  Imprime un resumen operativo del modelo editorial.

## Criterio actual

- `error`: estructura invalida, shape roto o fuente sin contrato.
- `warning`: contenido pendiente esperado en esta fase, como precios, alergenos o legales sin validar.

## Estado al cierre de Fase 3

- `0` errores.
- `92` warnings.

Los warnings actuales no bloquean la fase porque representan deuda editorial ya conocida y explicitamente modelada:

- precios pendientes;
- alergenos pendientes;
- categoria `Vermut` sin items recuperados;
- legales pendientes de validacion final.
