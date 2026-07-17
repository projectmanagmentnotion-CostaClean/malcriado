# Sistema de diseÃ±o

## DirecciÃ³n visual

Identidad gastronÃ³mica nocturna, cÃ¡lida y editorial. El contraste debe venir de fotografÃ­a real de gran formato, tipografÃ­a masiva controlada y espacios amplios, no de ruido decorativo.

## Principios

- La comida y la experiencia son protagonistas.
- TipografÃ­a display grande para emociÃ³n; tipografÃ­a de lectura sobria para claridad.
- MÃ¡ximo contraste funcional en navegaciÃ³n, formularios y carta.
- Ritmo visual alternando escenas inmersivas y bloques de decisiÃ³n compactos.
- Una acciÃ³n principal inequÃ­voca por viewport.

## Tokens obligatorios

Definir tokens para color, tipografÃ­a, escala fluida, espaciado, radios, bordes, elevaciÃ³n, capas, duraciÃ³n y easing. No introducir valores mÃ¡gicos repetidos en componentes.

La escala tipogrÃ¡fica debe usar `clamp()` y lÃ­mites por componente. Los titulares pueden ser masivos, pero nunca provocar overflow horizontal, solapar controles ni perder palabras esenciales.

## Componentes base

- Header y navegaciÃ³n mÃ³vil.
- BotÃ³n primario, secundario y enlace textual.
- Contenedor y secciÃ³n.
- MediaFrame para imagen/vÃ­deo.
- OfferCard.
- DishCard y MenuCategory.
- ReservationForm.
- Field, Select, DateField, ErrorMessage y SuccessState.
- Testimonial.
- BusinessInfo.
- ConsentManager.
- Dialog accesible.

## Estados

Todos los componentes interactivos deben documentar default, hover, focus-visible, active, disabled, loading, error y success. Hover nunca serÃ¡ el Ãºnico indicador.

## FotografÃ­a y vÃ­deo

- Preservar el color natural de los platos.
- Evitar overlays que reduzcan legibilidad o calidad.
- Declarar encuadres por breakpoint mediante `object-position` documentado.
- No recortar elementos esenciales del plato.
- Usar posters dedicados en vÃ­deo.

## NavegaciÃ³n

Header compacto, legible y estable. Puede transformarse con scroll, pero no desaparecer de forma imprevisible. La reserva permanece accesible en mÃ¡ximo un gesto.

## Estado de Fase 4

- tokens implementados en `src/styles/tokens/`
- tipografia autocontenida con licencia abierta
- header visual con estados preparados y menu movil editorial
- componentes base para CTA, media, platos, ofertas, estados y formularios
- catalogo interno `/dev/design-system/`
- documentacion especifica en `docs/design/`
