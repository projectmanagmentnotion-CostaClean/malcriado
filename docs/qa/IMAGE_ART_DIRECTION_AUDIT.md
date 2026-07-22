# Image art direction audit

## Hallazgo raiz

`EditorialImage` devuelve `null` si el asset no tiene la familia de crop solicitada. Home pedia `portrait` para `asset-026` y Nosotros hacia lo mismo; esos perfiles solo ofrecian `original`, `landscape`, `mobile` y `editorial`. El resultado era un marco vacio que parecia un placeholder.

## Correccion

- Home fusion: `asset-026`, crop `editorial`.
- Nosotros: `asset-017`, crop `portrait`, `1920x2400` servido en la comprobacion viva.
- Galeria Nosotros: `asset-017`, `asset-018`, `asset-024` con crops existentes.
- Home historia: `asset-018` para reducir bloques solo textuales.
- QA automatizado falla ahora ante `.media-frame__media:empty`.

## Fuente oficial Drive

Inventario: 100 archivos; 98 JPG y dos MP4. Las hojas de contacto prueban que la serie DSC corresponde a food truck/evento y no debe presentarse como sala o equipo del restaurante. Las series gastronomicas coinciden en gran parte con el universo ya optimizado; no se duplican archivos solo para rellenar.

No se integran videos originales de 126–187 MB. Se mantienen fuera de Git y del build.

## Revision independiente

- Los 100 registros (98 JPG y 2 MP4) se contrastaron con inventario, seleccion y hojas de contacto.
- No se añadieron originales Drive a `public/`; `external-assets/` sigue ignorado y no hay nombres DSC publicos.
- Las hojas de contacto son evidencia interna bajo `docs/` y no entran en el ZIP de produccion.
- Produccion conserva AVIF/WebP, `srcset`, `sizes`, dimensiones y lazy loading; `asset-019` mantiene variantes responsive y prioridad alta solo donde es LCP.
- No se integraron los dos videos ni se duplicaron assets para cubrir huecos visuales.
