# Current Site Audit

Fecha de auditoría: 2026-07-16

## Alcance y método

- Fuente auditada: `https://malcriadobcn.com/`
- Fuentes complementarias públicas: `robots.txt`, `sitemap_index.xml`, `page-sitemap.xml`, `elementor-hf-sitemap.xml`, `wp-json/wp/v2/pages`, `wp-json/wp/v2/media`
- Método: rastreo reproducible con [../../scripts/phase0/generate_phase0_inventory.py](../../scripts/phase0/generate_phase0_inventory.py), revisión de HTML renderizado y comprobaciones HTTP puntuales con `curl.exe`
- Límite operativo detectado: algunos recursos públicos devuelven desafío `SG-Captcha` o `403/202` según patrón de acceso, por lo que ciertos datos quedan marcados como `PENDING`

## Hechos verificados

- WordPress sigue siendo la plataforma pública actual.
- `robots.txt` público observado manualmente permite rastreo global y expone `https://malcriadobcn.com/sitemap_index.xml`.
- El sitemap público lista 9 páginas indexables y 2 URLs de plantilla `elementor-hf`.
- La home, el menú, contacto, nosotros y las páginas legales responden `200`.
- `elementor-hf/cta` y `elementor-hf/footer` redirigen a la home.
- Hay una `sample-page` pública e indexable.
- La reserva depende de CTA a WhatsApp y de un formulario `WPForms` en `/contacto/`.
- El formulario de contacto requiere JavaScript para completarse.
- Todas las páginas auditadas declaran `lang="es"` y un bloque JSON-LD de Yoast.

## URLs auditadas

| URL origen                                             | Estado final | URL final                                               | Title                                        | Canonical                                               | H1                                                                       | Observaciones                                  |
| ------------------------------------------------------ | -----------: | ------------------------------------------------------- | -------------------------------------------- | ------------------------------------------------------- | ------------------------------------------------------------------------ | ---------------------------------------------- |
| `https://malcriadobcn.com/`                            |          200 | `https://malcriadobcn.com/`                             | `Inicio - Malcriado...`                      | `https://malcriadobcn.com/`                             | `Vive la Fusión de Sabores Frente al Mar en la Costa Brava \| MALCRIADO` | Home principal con CTA a menú y WhatsApp       |
| `https://malcriadobcn.com/menu`                        |          200 | `https://malcriadobcn.com/menu/`                        | `Menú - Malcriado...`                        | `https://malcriadobcn.com/menu/`                        | `Explora el Menú de Malcriado`                                           | Carta HTML, sin precios visibles               |
| `https://malcriadobcn.com/nosotros`                    |          200 | `https://malcriadobcn.com/nosotros/`                    | `Sobre Nosotros - Malcriado...`              | `https://malcriadobcn.com/nosotros/`                    | `Conoce un Poco Más de Malcriado`                                        | Historia del restaurante y del chef Héctor     |
| `https://malcriadobcn.com/contacto`                    |          200 | `https://malcriadobcn.com/contacto/`                    | `Contacto - Malcriado...`                    | `https://malcriadobcn.com/contacto/`                    | `Conecta con Nosotros`                                                   | Formulario `POST`, teléfono, email, dirección  |
| `https://malcriadobcn.com/aviso-legal`                 |          200 | `https://malcriadobcn.com/aviso-legal/`                 | `Aviso Legal - Malcriado...`                 | `https://malcriadobcn.com/aviso-legal/`                 | `PENDING`                                                                | El contenido visible usa `h3`, no `h1`         |
| `https://malcriadobcn.com/declaracion-de-privacidad`   |          200 | `https://malcriadobcn.com/declaracion-de-privacidad/`   | `Declaración de Privacidad - Malcriado...`   | `https://malcriadobcn.com/declaracion-de-privacidad/`   | `PENDING`                                                                | Política genérica, no validada con titular     |
| `https://malcriadobcn.com/politica-de-cookies`         |          200 | `https://malcriadobcn.com/politica-de-cookies/`         | `Politica de Cookies - Malcriado...`         | `https://malcriadobcn.com/politica-de-cookies/`         | `PENDING`                                                                | Falta inventario real de cookies               |
| `https://malcriadobcn.com/descargo-de-responsabilidad` |          200 | `https://malcriadobcn.com/descargo-de-responsabilidad/` | `Descargo de Responsabilidad - Malcriado...` | `https://malcriadobcn.com/descargo-de-responsabilidad/` | `PENDING`                                                                | Página legal adicional                         |
| `https://malcriadobcn.com/sample-page`                 |          200 | `https://malcriadobcn.com/sample-page/`                 | `Sample Page - Malcriado...`                 | `https://malcriadobcn.com/sample-page/`                 | `PENDING`                                                                | Página residual de WordPress, indexable        |
| `https://malcriadobcn.com/elementor-hf/cta`            |          200 | `https://malcriadobcn.com`                              | `Inicio - Malcriado...`                      | `https://malcriadobcn.com/`                             | `Vive la Fusión...`                                                      | URL de plantilla, no debe migrarse como página |
| `https://malcriadobcn.com/elementor-hf/footer`         |          200 | `https://malcriadobcn.com`                              | `Inicio - Malcriado...`                      | `https://malcriadobcn.com/`                             | `Vive la Fusión...`                                                      | URL de plantilla, no debe migrarse como página |

## Metadatos y SEO técnico

- `robots.txt`: observado manualmente con `Disallow:` vacío y `Sitemap: https://malcriadobcn.com/sitemap_index.xml`
- Sitemap index: `page-sitemap.xml`, `elementor-hf-sitemap.xml`
- Canonicals: consistentes en las 9 páginas públicas auditadas
- Idioma: `es`
- JSON-LD: 1 bloque Yoast por página auditada
- Open Graph: presente en todas las páginas auditadas
- Favicon/logo estructurado: `cropped-logo-malcriado-pineda-de-mar-favicon.png`, `cropped-logo-malcriado-pineda-de-mar.png`

## Navegación e internal linking

- Menú principal visible: `Inicio`, `Sobre Nosotros`, `Menú`, `Contacto`
- CTA dominante: `¡Reserva tu mesa ahora!`
- Enlace externo principal de reserva: WhatsApp
- Red social oficial enlazada: Instagram `https://www.instagram.com/malcriado_pineda`
- Footer y header repiten la misma navegación base

## Contacto y negocio

- Dirección pública: `Passeig Marítim, 14, 08397 Pineda de Mar, Barcelona`
- Teléfono público: `+34 672 69 56 70`
- Email público: `info@malcriadobcn.com`
- Horario publicado en home: `Todos los días 11.00am - 01.00am`

## Formulario y reserva

- No existe una página pública dedicada a `/reservar/` dentro del sitemap actual.
- La vía principal de reserva visible es WhatsApp.
- `/contacto/` contiene un formulario `POST` de `WPForms`.
- El contenido renderizado del formulario muestra el mensaje `Por favor, activa JavaScript en tu navegador para completar este formulario.`
- Estado verificado: hay envío potencial, pero no se ha verificado disponibilidad real ni backend operativo del formulario.

## Carta y contenido gastronómico recuperado

### Categorías visibles en `/menu/`

- `Platos Calientes`
- `Platos Fríos`
- `Pizzas`
- `Vermut`
- `Sangrías`
- `Cócteles`
- `Cervezas`
- `Refrescos`
- `Vinos`
- `Postres`

### Ejemplos de platos y bebidas visibles

- Calientes: `Gambas al Ajillo`, `Pulpo al Chimichurri`, `Nachos Malcriados`, `Tequeños`, `Canelón XXL`
- Fríos: `Burrata`, `Ceviche Tradicional`, `Tarta de Atún`, `Carpaccio de Salmón Curado`
- Pizzas: `Calabrese Picante`, `Prosciutto`, `Hawaiana`, `La Malcriada`, `Margarita`
- Cócteles: `Mojito Clásico`, `Mojito sin Alcohol`, `Margarita`, `Maracuyá`, `Fresa`
- Postres: `Merengón de Fresa`, `Tarta tres Leches`, `Tarta de Queso`, `Coulant de Chocolate`

### Datos no visibles o no verificables

- Precios actuales
- Alérgenos
- Ingredientes detallados
- Promociones vigentes con fechas
- Política real de reservas y cancelaciones

## Assets, vídeo y documentos

- Assets recuperados y aceptados: 27
- Logos/favicons aceptados: 2
- Imágenes de comida/bebida aceptadas: 24
- Asset gráfico propio pendiente de clasificación final: 1
- PDFs públicos detectados: ninguno
- Vídeos públicos referenciados en `home`: 2 MP4
- Estado de los MP4: `PENDING`, las URLs responden desafío `SG-Captcha` (`202 Accepted`) al intentar acceso directo

## 404, redirecciones y URLs pendientes

- Redirecciones verificadas: todas las URLs sin slash final acaban en la variante con slash
- Redirecciones especiales: `elementor-hf/cta` y `elementor-hf/footer` acaban en la home
- Páginas 404 verificadas: `PENDING`
- Observación: varias rutas candidatas fuera del sitemap (`/carta/`, `/reservar/`, `/especiales/`, `/cookies/`, `/privacy-policy/`) devolvieron `403` en comprobaciones puntuales `HEAD`, por lo que no se han clasificado como `404` confirmadas

## Hallazgos priorizados

### Crítico

- `sample-page` sigue pública, indexable y con contenido de ejemplo de WordPress.
- La reserva pública depende de WhatsApp y de un formulario cuya operativa real no está verificada.
- Los vídeos referenciados en `home` no son descargables de forma estable por desafío `SG-Captcha`, lo que bloquea su migración limpia.

### Alto

- Las páginas legales publicadas usan texto genérico y no contienen los datos societarios completos exigibles para producción.
- Varias páginas legales carecen de `H1` real en el DOM visible.
- No hay precios ni alérgenos visibles en la carta HTML actual.

### Medio

- Las URLs de plantilla `elementor-hf/*` aparecen en sitemap y deben consolidarse fuera del futuro mapa indexable.
- El formulario actual depende de JavaScript para completarse.
- La navegación principal no incluye una URL pública específica para reserva, especiales ni contacto enriquecido.

### Bajo

- Duplicidad visual de activos de sushi detectada por hash.
- Inconsistencia editorial menor: `Politica de Cookies` sin tilde en title/slug visible.
- El asset `Mjoitos-fresa-y-maracuya-malcriado.webp` requiere validación de nombre y clasificación final.

## Pendientes explícitos

- `PENDING`: confirmar si los MP4 son assets autorizados para reutilización.
- `PENDING`: confirmar si el horario `Todos los días 11.00am - 01.00am` sigue vigente.
- `PENDING`: validar precios, alérgenos y servicios reales con el titular.
- `PENDING`: revisar 404 reales con una sesión menos agresiva o desde navegador interactivo si se necesita evidencia adicional.
