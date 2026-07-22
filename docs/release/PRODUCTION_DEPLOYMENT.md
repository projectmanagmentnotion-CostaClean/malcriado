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

## Ejecución verificada — 2026-07-22

- Dominio: `https://malcriadobcn.com/`.
- Document root confirmado: `malcriadobcn.com/public_html`.
- Artefacto: `release/malcriado-production.zip`, 25.340.269 bytes, SHA-256 `b43ef4ff6d395b820067641a15883a174256dfba9b7e16f061e6c87004ae997a`.
- Método: cuenta FTP temporal con TLS y certificado verificado para la subida al candidato; extracción y normalización con SiteGround File Manager.
- Intercambio: las entradas de WordPress se movieron a `public_html_before_launch_20260722_1528/` y las siete entradas verificadas del candidato se movieron a `public_html/`.
- Estructura final directa: `index.html`, `assets/`, `.htaccess`, `_redirects`, `robots.txt`, `sitemap.xml` y `site.webmanifest`.
- El ZIP de subida y la carpeta envolvente creada por File Manager se eliminaron del candidato antes del intercambio.
- La cuenta FTP temporal se eliminó al terminar y su credencial se descartó.
- Permisos observados: directorios `755`, archivos `644`.
- Caché dinámica purgada con confirmación de éxito. SiteGround CDN no estaba contratado/activo; no se activaron optimizaciones agresivas.
- HTTP redirige a HTTPS; `www` redirige al dominio sin `www`; no hay bucles. Los assets con hash tienen caché anual y se sirven comprimidos con Gzip.

Incidencia: justo después del intercambio, Home y Contacto seguían mostrando HTML antiguo mientras rutas no cacheadas ya servían el SPA. Se clasificó `P1` operativo, se purgó Dynamic Cache y la matriz completa quedó coherente. No fue necesario rollback.
