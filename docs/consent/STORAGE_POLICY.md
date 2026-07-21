# Consent Storage Policy

Fecha: 2026-07-21

## Claves versionadas

- consentimiento persistente:
  - `malcriado:consent:2026-07-21-phase-9`
- estado de visualizacion de UI:
  - `malcriado:consent:session:2026-07-21-phase-9`

## Datos guardados

La decision persistente contiene:

- `version`
- `source`
  - `accept_all`
  - `reject_all`
  - `customize`
- `updatedAt`
- `preferences`
  - `necessary`
  - `externalMedia`
  - `analytics`
  - `marketing`

## Politica aplicada

- solo almacenamiento de primera parte
- sin datos personales
- sin identificadores publicitarios
- versionado explicito para invalidar decisiones antiguas si cambia el modelo
- lectura segura: si la estructura no coincide, se descarta

## Notas

- El preloader de home mantiene su propia preferencia tecnica separada del consentimiento.
- Esta politica debe revisarse otra vez cuando entren terceros reales o analitica consentida.
