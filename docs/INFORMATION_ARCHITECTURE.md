# Arquitectura de información

## Navegación principal

1. Inicio
2. Carta
3. Especiales
4. Nosotros
5. Reservar

Contacto, ubicación, horarios y páginas legales permanecen accesibles en footer y contexto. En móvil, “Reservar” será la acción dominante y persistente sin tapar contenido.

## Inicio: secuencia narrativa

1. **Hero**: promesa, localización, vídeo/foto principal y CTA.
2. **Ahora en Malcriado**: especial activo más relevante.
3. **Platos estrella**: selección reducida de alto impacto.
4. **La fusión**: explicación breve latinoamericana–mediterránea.
5. **Experiencia frente al mar**: ambiente, terraza y contexto.
6. **Carta exploratoria**: acceso por categorías.
7. **Historia de Héctor**: autoría y autenticidad.
8. **Prueba social**: reseñas verificadas y enlazadas.
9. **Reserva**: formulario completo.
10. **Ubicación y horario**: mapa opcional tras consentimiento, dirección y rutas.

## Carta

La carta debe existir en HTML semántico y ser filtrable sin perder indexabilidad. Categorías actuales a validar:

- Platos calientes.
- Platos fríos.
- Pizzas.
- Vermut.
- Sangrías.
- Cócteles.
- Cervezas.
- Refrescos.
- Vinos.
- Postres.

Cada plato admite nombre, descripción, precio, imagen, alérgenos, etiquetas dietéticas y disponibilidad. Ningún dato se inventa.

## Especiales

Orden: activo hoy, esta semana, temporada y próximos eventos. Cada pieza debe tener vigencia visible, condiciones y CTA de reserva precontextualizado.

## Reserva

El formulario debe poder abrirse como página y como sección. El estado del formulario se conserva durante la sesión. El usuario nunca debe perder sus datos por una animación, cambio de orientación o navegación accidental.

## Contenido estructurado

```text
src/content/
  business.ts
  navigation.ts
  menu.ts
  offers.ts
  testimonials.ts
  faq.ts
  legal.ts
```

Todos los datos comerciales compartidos se importan desde una única fuente tipada.
