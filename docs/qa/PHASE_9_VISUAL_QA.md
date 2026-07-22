# Fase 9 Visual QA

Fecha: 2026-07-21

## Superficies revisadas

- `/nosotros/`
- `/contacto/`
- `/faq/`
- `/aviso-legal/`
- `/privacidad/`
- `/cookies/`
- `/declaracion-de-accesibilidad/`

## Matriz responsive

Verificada en preview de produccion:

- `320x900`
- `390x844`
- `768x900`
- `1440x900`

Resultado:

- `0` overflows horizontales
- `0` cortes de `h1`
- `0` canonicals ausentes

## Desktop

- `Nosotros` mantiene hero visual amplio, copy editorial y bloques sin cardification excesiva.
- `Contacto` gana una segunda escena util con llegada, mapa condicionado y CTA claros.
- `FAQ` funciona como pagina de contenido indexable, no como modal ni overlay.
- Legales y accesibilidad siguen el lenguaje editorial del sitio sin simular completitud juridica.

## Mobile

- CTA y bloques principales se apilan sin colisiones.
- El banner de consentimiento se mantiene legible y no rompe el layout.
- El CTA persistente de reserva se recoloca por encima del safe area.

## Lighthouse de produccion

Artefactos:

- `docs/qa/phase9-lighthouse-contacto.json`
- `docs/qa/phase9-lighthouse-faq.json`

Resultados:

| Ruta         | Performance | Accessibility | Best Practices | SEO   | FCP     | LCP     | TBT    | CLS     |
| ------------ | ----------- | ------------- | -------------- | ----- | ------- | ------- | ------ | ------- |
| `/contacto/` | `86`        | `100`         | `100`          | `100` | `2.6 s` | `3.6 s` | `0 ms` | `0.004` |
| `/faq/`      | `86`        | `100`         | `100`          | `100` | `2.6 s` | `3.6 s` | `0 ms` | `0.004` |

## Deuda aceptada

- El rendimiento en estas rutas es aceptable para el cierre de fase, pero no es el techo final y puede pulirse en Fase 10.
- Los textos legales siguen dependiendo de validacion del titular.
