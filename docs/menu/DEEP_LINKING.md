# Deep Linking

## Categoria

- formato: `/menu/#menu-category-${category.slug}`
- ejemplo: `/menu/#menu-category-pizzas`

## Plato

- formato: `menu-item-${item.id}`
- el anchor usa `id` para evitar colisiones de slug

## Reserva contextual

- `context`: origen de navegacion
- `dish`: slug unico del plato
- `category`: slug o id de categoria
- `offer`: reservado para ofertas activas verificadas

## Garantias

- `pizza-margarita` y `margarita` ya no colisionan
- `findMenuItemBySlug` devuelve identidad unica
- Playwright valida el deep link de categoria
