# Fase 11 - Auditoria de accesibilidad

Fecha: `2026-07-22`

## Resumen

No se detectaron violaciones serias o criticas de Axe en las rutas publicas auditadas.

Rutas revisadas:

- `/`
- `/menu/`
- `/especiales/`
- `/nosotros/`
- `/contacto/`
- `/faq/`
- `/reservar/`
- `/aviso-legal/`
- `/privacidad/`
- `/cookies/`
- `/declaracion-de-accesibilidad/`
- `404`

## Axe

Resultado:

- `0` violaciones por ruta en la pasada manual automatizada con `axe-core` y Playwright.
- Los tests de accesibilidad del repositorio siguen verdes en unit/integration.

## WCAG manual

Verificaciones cerradas:

- foco visible en navegacion principal
- teclado en shell publico
- `skip link` operativo
- FAQ con acordeones accesibles
- formulario de reserva con labels, resumen de errores y foco al primer error
- consentimiento reversible y navegable por teclado
- contenido clave disponible sin depender de movimiento
- reduced motion funcional en reserva y shell

## Deuda abierta

- Falta pasada humana con lector de pantalla real (`NVDA` o `VoiceOver`) antes de lanzamiento.
- Los textos legales siguen siendo provisionales por validacion pendiente del titular, aunque accesibles en estructura y navegacion.
