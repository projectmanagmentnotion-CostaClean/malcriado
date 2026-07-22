# Image conversion report

- Las 98 previews se usaron solo para contacto y clasificacion.
- Los originales y temporales permanecen en `external-assets/` y `.gitignore`.
- No se añade JPEG original al bundle.
- La web sigue sirviendo AVIF con fallback WebP, `srcset`, `sizes`, dimensiones y lazy loading fuera de LCP.
- No se generaron derivados nuevos cuando el asset era repetido o ya estaba representado en el manifiesto.
- Correccion de esta fase: seleccionar una variante existente valida evita marcos vacios sin aumentar bytes o requests.
