# Motion design audit

- Menu conserva GSAP como enhancement: hero coordinado, reveal por capitulo y parallax moderado de imagen.
- El indice sticky reduce desplazamiento sin pinning narrativo largo.
- Los targets existen y son legibles antes de animar; no hay preloader en Carta o Reserva.
- Reserva permanece estable durante escritura.
- `gsap.context`, `matchMedia` y cleanup siguen activos.
- Reduced motion retorna el estado visible sin scrub, parallax ni retraso.
- Home mantiene el hero estable y carga el runtime GSAP al primer gesto de navegacion; el movimiento de escenas sigue siendo progressive enhancement sin competir con el LCP.

No se añadio una animacion universal. La variacion procede del color, escala, imagen y composicion de cada capitulo.

## Revision independiente

- Navegacion directa, click de categoria, scroll, refresh y ruta con hash conservan contenido visible y estado activo.
- La escucha de scroll de Carta usa un unico `requestAnimationFrame`, se limpia al desmontar y no crea ScrollTriggers adicionales.
- El rail centra la categoria activa con movimiento `auto` bajo reduced motion.
- Los 28 escenarios extendidos encontraron cero elementos motion visibles con `opacity` casi cero y cero errores de consola/pagina.
