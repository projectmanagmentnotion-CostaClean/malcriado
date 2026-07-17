# ADR 0001: Static-First Architecture

- Estado: `Accepted`

## Contexto

El proyecto parte de una reconstrucción nueva y no debe heredar backend, base de datos ni CMS del WordPress actual.

## Decisión

La primera versión se construirá como frontend estático con integración de reserva explícita y sustituible.

## Alternativas consideradas

- Reutilizar WordPress actual.
- Añadir backend propio desde Fase 1.
- Integrar un CMS desde el inicio.

## Consecuencias

- Mejor control de rendimiento, SEO y deuda técnica.
- El contenido comercial se modela localmente antes de evaluar un CMS.

## Riesgos

- Menor comodidad editorial inicial.
- Dependencia de una buena estrategia de contenido tipado.
