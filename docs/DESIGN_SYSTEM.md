# Sistema de diseño

## Dirección visual

Identidad gastronómica nocturna, cálida y editorial. El contraste debe venir de fotografía real de gran formato, tipografía masiva controlada y espacios amplios, no de ruido decorativo.

## Principios

- La comida y la experiencia son protagonistas.
- Tipografía display grande para emoción; tipografía de lectura sobria para claridad.
- Máximo contraste funcional en navegación, formularios y carta.
- Ritmo visual alternando escenas inmersivas y bloques de decisión compactos.
- Una acción principal inequívoca por viewport.

## Tokens obligatorios

Definir tokens para color, tipografía, escala fluida, espaciado, radios, bordes, elevación, capas, duración y easing. No introducir valores mágicos repetidos en componentes.

La escala tipográfica debe usar `clamp()` y límites por componente. Los titulares pueden ser masivos, pero nunca provocar overflow horizontal, solapar controles ni perder palabras esenciales.

## Componentes base

- Header y navegación móvil.
- Botón primario, secundario y enlace textual.
- Contenedor y sección.
- MediaFrame para imagen/vídeo.
- OfferCard.
- DishCard y MenuCategory.
- ReservationForm.
- Field, Select, DateField, ErrorMessage y SuccessState.
- Testimonial.
- BusinessInfo.
- ConsentManager.
- Dialog accesible.

## Estados

Todos los componentes interactivos deben documentar default, hover, focus-visible, active, disabled, loading, error y success. Hover nunca será el único indicador.

## Fotografía y vídeo

- Preservar el color natural de los platos.
- Evitar overlays que reduzcan legibilidad o calidad.
- Declarar encuadres por breakpoint mediante `object-position` documentado.
- No recortar elementos esenciales del plato.
- Usar posters dedicados en vídeo.

## Navegación

Header compacto, legible y estable. Puede transformarse con scroll, pero no desaparecer de forma imprevisible. La reserva permanece accesible en máximo un gesto.
