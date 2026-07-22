# Fase 11 - SEO e indexacion

Fecha: `2026-07-22`

## Validaciones ejecutadas

- `npm run routes:validate`
- `npm run seo:generate`
- `npm run seo:validate`
- comprobacion manual en preview de produccion

## Robots

Archivo: [robots.txt](/C:/Users/USUARIO/Documents/malcriado/public/robots.txt)

- `Allow: /`
- `Disallow: /dev/`
- sitemap publicado en `https://malcriadobcn.com/sitemap.xml`

## Canonical y robots por ruta

- `/`: canonical `https://malcriadobcn.com/`, `index, follow`
- `/menu/`: canonical `https://malcriadobcn.com/menu/`, `index, follow`
- `/especiales/`: canonical `https://malcriadobcn.com/especiales/`, `index, follow`
- `/nosotros/`: canonical `https://malcriadobcn.com/nosotros/`, `index, follow`
- `/contacto/`: canonical `https://malcriadobcn.com/contacto/`, `index, follow`
- `/faq/`: canonical `https://malcriadobcn.com/faq/`, `index, follow`
- `/reservar/`: canonical `https://malcriadobcn.com/reservar/`, `index, follow`
- `/aviso-legal/`: canonical `https://malcriadobcn.com/aviso-legal/`, `noindex, follow`
- `/privacidad/`: canonical `https://malcriadobcn.com/privacidad/`, `noindex, follow`
- `/cookies/`: canonical `https://malcriadobcn.com/cookies/`, `noindex, follow`
- `/declaracion-de-accesibilidad/`: canonical `https://malcriadobcn.com/declaracion-de-accesibilidad/`, `noindex, follow`
- `404`: canonical `https://malcriadobcn.com/404`, `noindex, nofollow`

## Schema

- `FAQPage` solo aparece en `/faq/`.
- No se detecto `FAQPage` fuera de la ruta visible correspondiente.

## Redirects

Archivo: [public/_redirects](/C:/Users/USUARIO/Documents/malcriado/public/_redirects)

Redirects relevantes:

- `/declaracion-de-privacidad/` -> `/privacidad/`
- `/politica-de-cookies/` -> `/cookies/`
- `/descargo-de-responsabilidad/` -> `/aviso-legal/`
- `/declaracion-accesibilidad/` -> `/declaracion-de-accesibilidad/`
- `/sample-page/` -> `/404`

## Resultado

- SEO tecnico verde en validadores del proyecto.
- Canonicals estables y coherentes.
- `FAQPage` visible y acotado.
- Rutas `/dev/` siguen fuera de indexacion publica.
