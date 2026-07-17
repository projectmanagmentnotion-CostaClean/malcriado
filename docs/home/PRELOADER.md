# Preloader

Fecha: 2026-07-17
Estado: `v1 implementada`

## Objetivo

Abrir la home con una identidad breve y controlada sin fabricar carga falsa ni bloquear el acceso al hero.

## Implementacion actual

- componente: `src/components/home/HomePreloader.tsx`
- activacion por sesion: `sessionStorage` con clave `malcriado-home-preloader-seen`
- timeout de seguridad: `2200 ms` en `src/pages/HomePage.tsx`
- texto:
  - `Pineda de Mar`
  - `MALCRIADO`
  - `Cocina fusion frente al mar.`
- salida gestionada por GSAP en `src/motion/home/useHomePageMotion.ts`

## Reglas actuales

- solo aparece una vez por sesion
- si GSAP falla al cargar, el preloader se cierra igual
- si no hay entorno de browser no se fuerza
- en `prefers-reduced-motion`, se cierra sin depender de timeline GSAP
- en entorno de test, se marca como completado para no contaminar la validacion
- si falla o se retrasa la secuencia visual, el timeout desmonta el estado

## Riesgos pendientes

- todavia falta medir visualmente si aporta suficiente valor frente a entrar directo al hero
- falta decidir si debe mantenerse en movil o reducirse aun mas
- si interfiere con LCP percibido real, debe rebajarse o eliminarse
