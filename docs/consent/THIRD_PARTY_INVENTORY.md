# Third Party Inventory

Fecha: 2026-07-21

## Inventario actual

| Servicio                      | Proveedor            | Categoria        | Estado               | Estrategia                     |
| ----------------------------- | -------------------- | ---------------- | -------------------- | ------------------------------ |
| mapa interactivo de ubicacion | Google Maps          | `external_media` | `ACTIVE`             | bloqueado hasta consentimiento |
| analitica futura              | `PENDING_VALIDATION` | `analytics`      | `PENDING_VALIDATION` | no configurado                 |
| marketing futuro              | `PENDING_VALIDATION` | `marketing`      | `PENDING_VALIDATION` | no configurado                 |

## Lo que no carga en esta fase

- Google Analytics
- Google Tag Manager
- Meta Pixel
- plataformas de chat de terceros
- reproductores de video de terceros
- widgets sociales embebidos

## Implicacion tecnica

- La unica carga condicional real en frontend es el iframe de Google Maps.
- El resto del inventario se documenta para evitar activaciones implicitas en fases futuras sin pasar por consentimiento.
