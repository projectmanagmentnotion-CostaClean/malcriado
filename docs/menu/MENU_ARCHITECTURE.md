# Menu Architecture

## Objetivo

Publicar una carta HTML indexable, navegable por hash y desacoplada del layout visual.

## Estructura

- `src/content/menu/categories.ts`: capitulos tipados
- `src/content/menu/items.ts`: platos y bebidas tipados
- `src/content/menu/menu.ts`: ensamblado del dominio
- `src/lib/menu/menuPresentation.ts`: reglas de publicacion, featured item, slugs y anchors
- `src/pages/MenuPage.tsx`: composicion editorial publica
- `src/motion/menu/useMenuPageMotion.ts`: motion moderado por seccion

## Reglas de publicacion

- solo se publican categorias `PUBLIC` con items recuperados
- `Vermut` permanece fuera de la carta publica hasta tener contenido util
- los anchors de categoria usan `menu-category-${category.slug}`
- los anchors de plato usan `menu-item-${item.id}`
- los enlaces de reserva contextual usan `dish`, `category` y `context`

## Conteos actuales

- categorias publicas: `9`
- categorias ocultas: `1`
- items publicos recuperados: `44`
- featured media: `11`

## Integridad de identidad publica

- slugs de item unicos
- slugs de categoria unicos
- ids de anchors desacoplados del slug ambiguo del plato
- validacion bloqueante para categorias sin id valido
- validacion operativa para slugs duplicados
