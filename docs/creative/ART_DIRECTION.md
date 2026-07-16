# Art Direction

## Concepto

Malcriado debe sentirse como una cena que empieza con luz de costa y termina con energia nocturna. No es una web de restaurante neutral. Es una experiencia editorial y cinematografica donde la reserva es el desenlace natural de una secuencia visual.

## Personalidad

- fusion
- atrevida
- sensual sin caer en artificio
- mediterranea urbana
- social
- texturizada
- nocturna

## Narrativa

La home debe progresar desde identidad y deseo inmediato hacia producto, atmosfera y conversion:

1. identidad y preloader
2. hero audiovisual
3. especial activo
4. declaracion de fusion
5. platos insignia
6. experiencia frente al mar
7. cocteles y noche
8. historia y chef
9. carta visual
10. reserva

## Paleta inicial

- charcoal profundo: `#0e0a09`
- negro humo: `#171111`
- marfil calido: `#f2e8da`
- arena salina: `#c8b39d`
- terracota picante: `#c2512d`
- rojo tuna: `#8b1e1a`
- teal costa nocturna: `#1d5a5d`
- dorado tenue: `#b78a42`

La paleta debe alternar escenas oscuras y respiraciones claras sin volver a un fondo uniforme de principio a fin.

## Tipografia

- display: titulares masivos con contraste alto, proporciones condensadas o de caracter editorial.
- texto: una serif o sans con buena lectura prolongada.
- el sistema debe permitir titulares de 2 a 5 lineas con `clamp()` y cortes intencionales.

No usar una unica escala rutinaria ni apilar cajas con el mismo ritmo.

## Tratamiento fotografico

- prioridad a platos reales y ambiente real del negocio
- escalas grandes y recortes agresivos cuando la calidad del asset lo soporte
- full-bleed selectivo
- mezcla de detalle macro y escenas ambientales
- color extraido del plato para contaminar fondos o overlays
- evitar mosaicos pequeños sin impacto

## Reglas de composicion

- cada escena debe tener una tension distinta
- alternar masas oscuras, imagen protagonista y grandes vacios
- evitar repetir siempre texto a un lado e imagen al otro
- usar capas y profundidad con moderacion
- integrar el logo como fuente de formas, mascaras o detalles, no como decoracion repetitiva

## Sistema de texturas

- grano sutil
- degradados con baja opacidad
- planos de color contaminados por el plato o la escena
- bordes suaves o mascaras derivadas del logo cuando haya una funcion narrativa

No usar ruido pesado, brillos genericos ni ornamentos sin relacion con marca.

## Ritmo visual

- apertura fuerte
- primer CTA visible desde el inicio
- cambio temprano de escena con el especial
- alternancia entre inmersion y pausas legibles
- subida de intensidad en platos y cocteles
- desaceleracion en historia
- cierre limpio y estable en reserva

## Direccion de movimiento

- entradas firmes pero suaves
- capas con profundidad antes que efectos
- `transform` y `opacity` como base
- `clip-path` medido solo donde aporte revelado real
- scrub solo en escenas que ganen narrativa con ello
- microinteracciones discretas en CTA, navegacion y previews

## Home scenes

### Preloader

- identidad de logo o palabra MALCRIADO
- salida directa al hero
- omisible en visitas posteriores
- reduced motion: sin secuencia, solo arranque inmediato

### Hero

- alto completo
- foto o video real
- titular de gran escala
- CTA principal y secundario
- scroll cue sutil

### Especial activo

- cambio cromatico claro
- producto dominante
- vigencia visible
- CTA contextual

### Declaracion de fusion

- texto grande
- ritmo editorial
- capas o imagenes que mutan con scroll

### Platos insignia

- narrativa secuencial, no grid
- pinned solo si el coste real lo permite en desktop
- version movil sin pinning largo

### Costa

- respiracion
- espacio negativo
- profundidad lenta

### Cocteles y noche

- contraste oscuro
- brillo puntual
- energia sin filtros caros

### Historia

- tono humano
- motion mas pausado

### Carta visual

- categorias con composicion potente
- preview accesible

### Reserva

- estabilidad total
- GSAP solo para entrada y contexto

## Movil

- escenas mas cortas
- menos capas simultaneas
- tipografia igualmente protagonista
- priorizar hero, especial, carta y reserva
- evitar pinning prolongado

## Reduced motion

- sin scrub
- sin parallax
- sin pinning no esencial
- transiciones simples
- mismo contenido y misma jerarquia

## Ejemplos de uso

- titular enorme sobre fotografia oscura con CTA visible
- transicion de terracota a teal entre comida y mar
- card editorial de plato con descripcion breve e indexable

## Antiuso

- secciones clonadas
- `fade-up` universal
- fondos planos repetidos
- blur animado fuerte
- sliders sin contexto narrativo
- formularios que se mueven mientras el usuario escribe
