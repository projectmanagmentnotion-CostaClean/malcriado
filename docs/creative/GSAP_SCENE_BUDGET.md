# GSAP Scene Budget

## Reglas base

- maximo recomendado de escenas inmersivas activas a la vez: 2
- maximo recomendado de triggers simultaneos en home desktop inicial: 18
- maximo recomendado de triggers simultaneos en home movil inicial: 10
- ninguna escena puede introducir pinning largo en movil

## Presupuesto por escena

| Escena          | Triggers maximos | Pinning          | Asset budget inicial    | Video    | Coste estimado | Fallback               | Cuando eliminar animacion                    |
| --------------- | ---------------- | ---------------- | ----------------------- | -------- | -------------- | ---------------------- | -------------------------------------------- |
| Preloader       | 0                | no               | logo + textura ligera   | no       | bajo           | desmontaje inmediato   | si oculta carga real                         |
| Hero            | 3                | no               | 1 visual principal      | opcional | medio          | estado final visible   | si degrada LCP o CTA                         |
| Especial activo | 2                | no               | 1 producto protagonista | no       | medio          | escena estatica        | si la oferta no esta verificada              |
| Fusion          | 3                | no               | 1-2 imagenes            | no       | medio          | texto editorial fijo   | si reduce legibilidad                        |
| Platos insignia | 4                | desktop opcional | 3-5 platos maximo       | no       | alto           | lista estatica         | si exige pinning largo o demasiados triggers |
| Costa           | 2                | no               | 1 panorama              | opcional | medio          | imagen fija            | si parece stock o pierde rendimiento         |
| Cocteles        | 2                | no               | 1-2 imagenes            | no       | medio          | layout estatico oscuro | si requiere blur o filtros caros             |
| Historia        | 1                | no               | 1 retrato + 1 apoyo     | no       | bajo           | contenido fijo         | si distrae de la lectura                     |
| Carta visual    | 2                | no               | previews ligeros        | no       | medio          | lista de categorias    | si depende de hover                          |
| Reserva         | 1                | no               | fondo ligero            | no       | bajo           | entrada simple         | si afecta la escritura o validacion          |

## Video

- solo en hero o costa si existe asset real validado
- poster obligatorio
- sin autoplay con audio
- desactivar o simplificar por capacidad, conexion o viewport

## Criterios de eliminacion

Eliminar o rediseñar una animacion si:

1. aumenta CLS o bloquea LCP
2. introduce overflow o scroll inestable
3. rompe teclado o foco
4. obliga a leer mientras el texto se mueve demasiado
5. añade mas de un trigger cuando una timeline local resuelve lo mismo
6. depende de filtros caros o blur animado
7. no aporta narrativa, orientacion ni conversion
