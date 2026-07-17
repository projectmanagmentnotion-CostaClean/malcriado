# Menu SEO Strategy

## Objetivo

Convertir `/menu/` en una URL indexable y util sin depender de PDF, canvas ni assets de texto.

## Implementacion

- `title`: `Carta | Malcriado`
- `description`: carta HTML auditada con estados honestos
- canonical: `/menu/`
- breadcrumbs activos
- heading hierarchy con `h1` unico y `h2` por categoria
- enlaces internos a `contacto`, `reservar` y hashes de categoria

## JSON-LD

Se publica:

- `WebPage`
- `BreadcrumbList`
- `Menu`
- `MenuSection`
- `MenuItem`

Se omite:

- precios nulos
- alergenos no verificados
- ofertas inexistentes o expiradas

## Slugs y anchors

- pizza `Margarita` => `pizza-margarita`
- coctel `Margarita` => `margarita`
- anchors de item basados en `id`, no en slug
