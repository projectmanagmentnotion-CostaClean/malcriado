# Despliegue en SiteGround

## Precondiciones obligatorias

1. Confirmar el dominio `malcriadobcn.com` y el document root exacto en Site Tools → Site → File Manager.
2. Completar y verificar `PRODUCTION_BACKUP.md` con fecha, ubicación y checksum.
3. Tener disponible `malcriado-production.zip` y validar su SHA-256.
4. Reservar una ventana con capacidad de rollback inmediato.

## File Manager

1. Abrir el document root confirmado; no asumir que es `public_html` si hay varios sitios.
2. Descargar el backup antes de reemplazar nada.
3. Subir el ZIP al document root y extraerlo allí. El ZIP no tiene carpeta envolvente.
4. Verificar que `index.html`, `.htaccess`, `_redirects`, `robots.txt`, `sitemap.xml` y `assets/` quedan en la raíz.
5. No subir `src`, `node_modules`, documentación ni `.env*`.

Por SFTP se copia el contenido de `release/malcriado-production/` al document root confirmado. Permisos recomendados: `644` archivos y `755` directorios.

## Apache, SSL y caché

`.htaccess` aplica fallback SPA, HTTP→HTTPS y `www`→dominio canónico. Comprobar que `mod_rewrite` está activo. En Site Tools → Security → SSL Manager, confirmar certificado válido; en HTTPS Enforce, forzar HTTPS una sola vez sin crear bucles.

Purgar Dynamic Cache y Memcached si estuviera activo. HTML no debe conservarse de forma prolongada; assets con hash pueden cachearse un año. Mantener Brotli/Gzip de SiteGround activos.

## Verificación inmediata

Abrir una ruta interna directamente y refrescarla, comprobar 404 lógica, canonical, recursos sin 404 y formulario. Ejecutar `PRODUCTION_SMOKE_TEST.md`. Si falla un criterio crítico, aplicar `PRODUCTION_ROLLBACK.md`.
