# ADR 0002: Content as Typed Local Data

- Estado: `Accepted`

## Contexto

La web actual mezcla copy, menú y datos legales con estructura WordPress/Elementor no reutilizable.

## Decisión

Todo el contenido comercial y legal migrable se modelará como datos locales tipados (`business`, `menu`, `offers`, `legal`, `faq`).

## Alternativas consideradas

- Mantener el contenido embebido en componentes.
- Crear un CMS ligero desde la primera entrega.

## Consecuencias

- Fuente única de verdad.
- Menor riesgo de duplicación entre páginas.

## Riesgos

- Requiere disciplina de modelado.
- Obliga a validar primero los datos con el titular.
