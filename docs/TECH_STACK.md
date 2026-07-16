# Tech Stack

## Base

- Vite + React + TypeScript estricto en ESM.
- React Router para rutas estaticas provisionales.
- CSS global con tokens y capas utilitarias simples, sin Tailwind ni libreria de componentes.
- GSAP + `@gsap/react` como base de motion progresivo.
- `react-helmet-async` para metadatos y canonical.
- Zod para validacion tipada de variables de entorno.

## Calidad

- ESLint con `typescript-eslint`, `jsx-a11y`, `react-hooks` y compatibilidad Prettier.
- Vitest + Testing Library + `jest-dom`.
- `axe-core` para smoke checks de accesibilidad.
- Playwright para humo E2E en escritorio y viewport movil.

## Restricciones

- Sin backend, CMS, base de datos, analitica ni terceros no esenciales.
- Contenido comercial no verificado queda en `PENDING_CONTENT` o `null`.
- La capa de reserva es reemplazable mediante `src/services/booking`.
