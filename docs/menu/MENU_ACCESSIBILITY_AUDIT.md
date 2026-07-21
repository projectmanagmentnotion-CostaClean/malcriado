# Menu Accessibility Audit

Fecha: 2026-07-21
Entorno: `preview` en `http://127.0.0.1:4173/`

## Axe

Escenarios auditados:

- `/menu/`
- `/especiales/`
- `/menu/#menu-category-pizzas`
- `/reservar/?context=featured-dish&dish=pulpo-al-chimichurri&category=cat-hot-dishes`
- `/contacto/`
- menu movil abierto

Resultado:

- `0` violaciones serias
- `0` violaciones criticas
- `0` violaciones moderadas en el escenario de menu movil abierto tras envolver su contenido en un landmark `nav`

## Revision manual

- jerarquia: `h1` unico por ruta y `h2` por categoria en carta
- navegacion por categorias: `nav` con hash links visibles
- foco: visible y consistente
- menu movil: abre, cierra con `Escape`, trap de foco y retorno al boton
- menu movil: contenido envuelto en landmark navegable sin romper `role="dialog"`
- estado de precio pendiente: visible en texto, no solo por color
- estado de alergeno pendiente: visible en texto, no solo por icono
- reservar: labels, mensajes y checkbox presentes

## Riesgos restantes

- falta pasada humana con NVDA o VoiceOver
- el zoom al 200 % se ha emulado por CSS zoom en QA automatizada, no sustituye una pasada manual del navegador final
