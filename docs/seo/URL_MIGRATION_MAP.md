# URL Migration Map

Fecha de propuesta: 2026-07-16

## Criterios

- No se crean URLs artificiales para repetir keywords.
- Se conserva la intención principal y se normalizan rutas según la arquitectura objetivo ya aprobada.
- Las plantillas `elementor-hf` no se tratan como páginas públicas finales.

| URL actual | Estado HTTP | Contenido principal | Intención | URL futura propuesta | Acción | Justificación | Riesgo SEO | Enlaces internos |
|---|---:|---|---|---|---|---|---|---:|
| `https://malcriadobcn.com/` | 200 | Home comercial, propuesta de valor, CTA reserva | Marca/local transaccional | `/` | `conservar` | Ya es la home principal y concentra autoridad | Bajo | 27 |
| `https://malcriadobcn.com/menu/` | 200 | Carta HTML actual | Navegacional/informacional | `/carta/` | `redirigir 301` | La IA objetivo usa `/carta/`; mantener contenido equivalente | Medio | 27 |
| `https://malcriadobcn.com/nosotros/` | 200 | Historia de Malcriado y del chef | Informacional/marca | `/nosotros/` | `conservar` | Encaja con la IA objetivo | Bajo | 27 |
| `https://malcriadobcn.com/contacto/` | 200 | Contacto y formulario | Navegacional/local | `/contacto/` | `conservar` | Contiene NAP y formulario | Bajo | 7 |
| `https://malcriadobcn.com/aviso-legal/` | 200 | Aviso legal | Legal | `/aviso-legal/` | `conservar` | URL clara y específica | Bajo | 7 |
| `https://malcriadobcn.com/declaracion-de-privacidad/` | 200 | Privacidad | Legal | `/privacidad/` | `redirigir 301` | Conviene una ruta más corta y estándar | Bajo | 8 |
| `https://malcriadobcn.com/politica-de-cookies/` | 200 | Cookies | Legal | `/cookies/` | `redirigir 301` | Ruta estándar para política de cookies | Bajo | 7 |
| `https://malcriadobcn.com/descargo-de-responsabilidad/` | 200 | Descargo adicional | Legal/auxiliar | `/aviso-legal/` o `PENDING` | `consolidar` | Posible solape con aviso legal | Medio | 7 |
| `https://malcriadobcn.com/sample-page/` | 200 | Página ejemplo WordPress | Basura indexable | `sin equivalente` | `retirar` | No debe migrarse al sitio nuevo | Alto | 9 |
| `https://malcriadobcn.com/elementor-hf/cta` | 200 -> home | Plantilla CTA | Ninguna | `sin equivalente` | `retirar` | No es página pública real | Medio | 0 |
| `https://malcriadobcn.com/elementor-hf/footer` | 200 -> home | Plantilla footer | Ninguna | `sin equivalente` | `retirar` | No es página pública real | Medio | 0 |

## URLs futuras recomendadas adicionales

| URL futura | Estado actual | Motivo |
|---|---|---|
| `/reservar/` | `MISSING` | La nueva arquitectura exige una URL transaccional dedicada |
| `/especiales/` | `MISSING` | Fase editorial prevista en roadmap |

## Observaciones

- Las pruebas puntuales sobre `/carta/`, `/reservar/`, `/especiales/`, `/cookies/` y `/privacy-policy/` devolvieron `403` en comprobaciones `HEAD`; no se han tomado como equivalencias reales sin validación adicional.
- La variante con slash final ya está normalizada por el sitio actual y debe mantenerse consistente en el destino.
