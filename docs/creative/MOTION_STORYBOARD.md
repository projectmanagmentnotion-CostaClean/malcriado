# Motion Storyboard

## Escena 1 - Preloader

- proposito: presentar identidad y ocultar solo la preparacion critica real
- contenido: logo o palabra MALCRIADO con textura
- composicion inicial: pantalla casi negra con centro dominante
- progreso durante scroll: no aplica; transicion temporal corta
- composicion final: hero plenamente visible
- interaccion: opcional omitir en visitas repetidas
- GSAP utilizado: timeline corta, opacidad, mascara o `clip-path`
- ScrollTriggers: ninguno
- variante movil: misma idea con menor duracion
- reduced motion: sin secuencia, desmontaje inmediato
- riesgos: alargar carga o tapar mal rendimiento
- criterio de aceptacion: no bloquea ni retrasa el contenido esencial

## Escena 2 - Hero audiovisual

- proposito: fijar deseo, marca y reserva desde el primer viewport
- contenido: audiovisual real, titular, CTA, scroll cue
- composicion inicial: logo y titular sobre fotografia dominante
- progreso durante scroll: leve salida del titular y cambio del header
- composicion final: transicion limpia hacia especial activo
- interaccion: CTA principal y secundario
- GSAP utilizado: reveal de capas, letras, escala ligera del fondo
- ScrollTriggers: cambio de estado del header, salida del hero
- variante movil: menos capas y tipografia refluida
- reduced motion: estado final visible desde el inicio
- riesgos: exceso de capas o perdida de contraste
- criterio de aceptacion: informacion esencial visible sin esperar a la animacion

## Escena 3 - Especial activo

- proposito: mostrar rapidamente la razon actual para reservar
- contenido: oferta activa, vigencia, CTA contextual
- composicion inicial: contraste fuerte frente al hero
- progreso durante scroll: revelado lateral o `clip-path`
- composicion final: producto asentado y CTA legible
- interaccion: CTA de reserva con precontexto
- GSAP utilizado: timeline coordinada, parallax moderado por capas
- ScrollTriggers: entrada y salida de escena
- variante movil: apilado corto sin pin largo
- reduced motion: aparicion simple
- riesgos: publicar datos no verificados o parallax excesivo
- criterio de aceptacion: la oferta solo se muestra con datos reales verificados

## Escena 4 - Declaracion de fusion

- proposito: explicar identidad culinaria
- contenido: texto masivo, fotografia, ingredientes, fuego, costa
- composicion inicial: frase dominante con una imagen de apoyo
- progreso durante scroll: cambio de palabras, fondos o imagen
- composicion final: puente hacia platos insignia
- interaccion: lectura y desplazamiento natural
- GSAP utilizado: scrub controlado, capas, cambios de opacidad
- ScrollTriggers: una escena principal y subcapas agrupadas
- variante movil: menos cambios simultaneos
- reduced motion: secuencia estatica con misma jerarquia
- riesgos: texto dificil de leer
- criterio de aceptacion: lectura intacta a 200 por ciento y con teclado

## Escena 5 - Platos insignia

- proposito: convertir producto en relato
- contenido: varios platos reales con texto sincronizado
- composicion inicial: primer plato dominante
- progreso durante scroll: cambio de plato, texto y fondo
- composicion final: ultimo plato conduce a costa o cocteles
- interaccion: navegacion contextual o CTA a carta
- GSAP utilizado: timeline por progreso, `matchMedia`, posible pin desktop
- ScrollTriggers: uno principal de escena y triggers internos minimos
- variante movil: lista editorial o carrusel accesible
- reduced motion: lista estatica
- riesgos: demasiados triggers o pinning largo
- criterio de aceptacion: todo el contenido sigue indexable y navegable sin JS

## Escena 6 - Experiencia frente al mar

- proposito: aportar emocion y contexto local
- contenido: vista, mesa, costa, texto amplio
- composicion inicial: apertura del espacio
- progreso durante scroll: capas lentas y transicion cromatica
- composicion final: descanso previo a la noche
- interaccion: lectura y continuidad
- GSAP utilizado: capas lentas, desplazamiento vertical corto
- ScrollTriggers: uno principal
- variante movil: imagen fuerte y menos profundidad
- reduced motion: escena fija
- riesgos: usar imagen no validada o recurrir a efecto postal generico
- criterio de aceptacion: se siente local y propia, no stock

## Escena 7 - Cocteles y noche

- proposito: subir energia y deseo social
- contenido: cocteles, brillos, ambiente nocturno
- composicion inicial: entrada oscura y luminosa
- progreso durante scroll: capas translúcidas, reflejos controlados
- composicion final: enlace hacia historia o carta
- interaccion: CTA o enlace a carta de bebidas
- GSAP utilizado: opacidad, rotacion minima, profundidad
- ScrollTriggers: entrada de capas y cambios de header
- variante movil: menos efectos, mas foco en imagen
- reduced motion: sin rotacion ni capas flotantes
- riesgos: blur caro y perdida de rendimiento
- criterio de aceptacion: buen contraste y sin jank en movil

## Escena 8 - Historia y chef

- proposito: humanizar la marca
- contenido: retrato, texto editorial, gesto grafico
- composicion inicial: imagen humana dominante
- progreso durante scroll: movimiento pausado
- composicion final: salida serena hacia carta
- interaccion: lectura prolongada
- GSAP utilizado: aparicion por capas, desplazamiento corto
- ScrollTriggers: uno principal
- variante movil: retrato superior y texto apilado
- reduced motion: contenido fijo
- riesgos: tono corporativo frio
- criterio de aceptacion: lectura comoda y tono humano

## Escena 9 - Carta visual

- proposito: anticipar la carta completa con identidad visual
- contenido: categorias, previews y CTA
- composicion inicial: nombres masivos, previews parciales
- progreso durante scroll: cambios por categoria
- composicion final: CTA claro a la carta HTML
- interaccion: hover, focus, touch equivalentes
- GSAP utilizado: transiciones de preview y microinteracciones
- ScrollTriggers: minimos o nulos
- variante movil: tarjetas o carrusel accesible
- reduced motion: previews estaticos
- riesgos: depender de hover
- criterio de aceptacion: funciona con touch y teclado

## Escena 10 - Reserva

- proposito: cerrar la narrativa y convertir
- contenido: formulario, contexto breve, vias alternativas
- composicion inicial: bloque estable y legible
- progreso durante scroll: solo entrada o cambio de fondo
- composicion final: confirmacion visual de solicitud
- interaccion: formulario y CTA alternativos
- GSAP utilizado: opacidad y desplazamiento corto
- ScrollTriggers: uno opcional de entrada
- variante movil: prioridad absoluta a usabilidad
- reduced motion: sin animacion funcional
- riesgos: mover el formulario durante escritura
- criterio de aceptacion: estabilidad completa y confirmacion no engañosa
