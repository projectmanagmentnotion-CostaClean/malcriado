# ADR 0005: Current Site Assets as Migration Source

- Estado: `Accepted`

## Contexto

La web actual es la única fuente autorizada de marca, fotografía, vídeo y contenido público existente.

## Decisión

Se usarán solo assets públicos trazables del sitio actual como fuente inicial de migración, preservando originales y documentando derechos/pending.

## Alternativas consideradas

- Descargar masivamente toda la librería del WordPress.
- Rehacer sin inventario de origen.

## Consecuencias

- Trazabilidad clara por URL y hash.
- Menor riesgo de arrastrar recursos de terceros o basura técnica.

## Riesgos

- Algunos recursos pueden estar bloqueados por captcha.
- Puede haber assets útiles no enlazados públicamente aún.

