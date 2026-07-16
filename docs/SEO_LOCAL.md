# SEO local y descubrimiento

## Objetivo

Posicionar Malcriado para búsquedas de alta intención relacionadas con restaurante de cocina fusión, comer frente al mar, cócteles, terraza y reservas en Pineda de Mar y el Maresme, sin crear contenido artificial ni páginas geográficas duplicadas.

## Entidad local

Mantener una fuente única y verificada para:

- Nombre comercial: Malcriado.
- Dirección: Passeig Marítim, 14, 08397 Pineda de Mar, Barcelona.
- Teléfono: +34 672 69 56 70.
- Email: info@malcriadobcn.com.
- Horarios reales y excepciones.
- Coordenadas.
- URL canónica.
- Enlaces oficiales de Instagram, WhatsApp y perfil de empresa.

No publicar horarios, servicios o ubicación sin validación final.

## Arquitectura de búsqueda

- `/`: restaurante de cocina fusión frente al mar en Pineda de Mar.
- `/carta/`: carta HTML completa y categorías.
- `/especiales/`: ofertas, platos y eventos vigentes.
- `/nosotros/`: historia, chef y propuesta culinaria.
- `/reservar/`: intención transaccional.
- `/contacto/`: ubicación, horario y cómo llegar.

## On-page

- Titles y descriptions únicos y orientados a intención real.
- Un H1 principal por página y jerarquía semántica.
- Texto visible, natural y específico; evitar relleno genérico.
- Enlazado interno entre platos, especiales y reserva.
- Alt text descriptivo sin forzar keywords.
- URLs estables, minúsculas y sin parámetros innecesarios.
- Canonical, sitemap XML, robots.txt y página 404 útil.

## Datos estructurados

Implementar JSON-LD validado para:

- `Restaurant` con NAP, geo, horario, rango de precio solo si se valida, tipo de cocina y reservas.
- `Menu`/`MenuSection` cuando la estructura y datos lo permitan.
- `Offer` o `Event` únicamente para contenido real y vigente.
- `BreadcrumbList` en páginas internas.

No incluir ratings agregados propios sin cumplir las políticas del buscador y sin una fuente elegible.

## Contenido local

Priorizar contenido útil:

- ubicación frente al mar y contexto de Pineda de Mar;
- cómo llegar a pie, coche o transporte público;
- terraza, grupos y ocasiones solo si son servicios reales;
- especiales de temporada;
- historia del chef Héctor y la fusión cultural;
- preguntas reales sobre reserva, horarios, niños, mascotas, accesibilidad y alérgenos, previa validación.

## Google Business Profile

Alinear nombre, dirección, teléfono, horario, carta, reservas y fotos. Añadir UTMs a enlaces cuando se configure medición. La web no debe contradecir el perfil.

## SEO técnico

- Render inicial indexable.
- Core Web Vitals dentro de objetivos.
- Imágenes con nombres útiles, dimensiones y variantes.
- No bloquear contenido detrás de animaciones.
- Redirecciones 301 desde URLs antiguas equivalentes.
- Monitorizar 404, cobertura, consultas locales y conversiones.

## Internacionalización

No crear idiomas incompletos. Si se aprueba catalán o inglés, cada versión debe tener traducción profesional, URLs propias, `hreflang`, metadatos y contenido completo.
