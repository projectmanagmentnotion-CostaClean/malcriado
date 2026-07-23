# Image usage map

| Ruta/escena      | Asset                   | Funcion                | Carga           |
| ---------------- | ----------------------- | ---------------------- | --------------- |
| Home hero        | `asset-019`             | LCP y plato insignia   | eager/high      |
| Home especial    | `asset-017`             | Producto vertical      | lazy            |
| Home fusion      | `asset-026` editorial   | Declaracion visual     | lazy            |
| Home noche       | `asset-013`             | Coctel                 | lazy            |
| Home historia    | `asset-018`             | Evidencia gastronomica | lazy            |
| Nosotros hero    | `asset-017` portrait    | Apertura visible       | eager           |
| Nosotros galeria | `asset-017/018/024`     | Ritmo y variedad       | lazy            |
| Reserva          | `asset-019`             | Contexto de marca      | eager/high      |
| Carta            | Assets tipados por item | Capitulo/producto      | lazy salvo hero |

La repeticion de `asset-019` queda limitada a aperturas de alta conversion; una futura sesion real de local/equipo es preferible a usar food truck fuera de contexto.

La revision independiente confirma que `asset-019` es el LCP exacto de Home y Reserva y mantiene preload por ruta, AVIF responsive, fallback WebP, `fetchpriority="high"`, dimensiones y `sizes="100vw"`. No se usa en la galeria de Nosotros ni se añaden originales Drive o contact sheets al build.
