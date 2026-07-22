# Motion design audit

- Menu conserva GSAP como enhancement: hero coordinado, reveal por capitulo y parallax moderado de imagen.
- El indice sticky reduce desplazamiento sin pinning narrativo largo.
- Los targets existen y son legibles antes de animar; no hay preloader en Carta o Reserva.
- Reserva permanece estable durante escritura.
- `gsap.context`, `matchMedia` y cleanup siguen activos.
- Reduced motion retorna el estado visible sin scrub, parallax ni retraso.
- Home mantiene el hero estable y carga el runtime GSAP al primer gesto de navegacion; el movimiento de escenas sigue siendo progressive enhancement sin competir con el LCP.

No se añadio una animacion universal. La variacion procede del color, escala, imagen y composicion de cada capitulo.
