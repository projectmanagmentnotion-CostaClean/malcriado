# Backup previo a producción

## Registro ejecutado

| Campo | Valor |
| --- | --- |
| Estado | `VERIFIED_RESTORABLE` |
| Fecha y hora Europe/Madrid | 2026-07-22 15:28–15:34 CEST |
| Dominio | `malcriadobcn.com` |
| Document root | `malcriadobcn.com/public_html` |
| Web anterior | WordPress (`index.php`, `.htaccess`, `wp-content/`) |
| Backup de SiteGround | `production-before-launch-20260722-1528` |
| Backup local | `backups/production-before-launch-20260722-1528.zip` |
| SHA-256 local | `479fe7dbe6c8d04d1337f6206289e9c184531c9fd6ed3016a140d26ca4beac` |
| Tamaño local | 491.740.260 bytes |
| Copia extraída | `backups/production-before-launch-20260722-1528/` |
| Copia fuera del document root | `/malcriadobcn.com/production-before-launch-20260722-1528.zip` |

El ZIP local se abrió y listó correctamente: 24.731 entradas. La copia extraída contiene 21.208 archivos y 758.023.461 bytes. Se comprobaron expresamente `public_html/index.php`, `public_html/.htaccess` y `public_html/wp-content/`.

SiteGround confirmó que el backup manual permite restaurar todos los archivos y bases de datos, solo archivos, solo bases de datos o e-mail. No se ejecutó una restauración destructiva; se verificaron el backup, sus controles de restauración y la ruta operativa.

## Rollback preparado

Durante el intercambio, las 24 entradas de la web anterior se movieron a `/malcriadobcn.com/public_html_before_launch_20260722_1528/`. La carpeta conserva `index.php`, `.htaccess`, `wp-content/` y el resto de WordPress.

Rollback inmediato:

1. Vaciar `malcriadobcn.com/public_html` moviendo fuera las siete entradas del build estático.
2. Mover las 24 entradas de `public_html_before_launch_20260722_1528/` de vuelta a `public_html/`.
3. Purgar la caché dinámica y comprobar Home, SSL y rutas internas.
4. Si el rollback por archivos no es suficiente, restaurar el backup manual desde Site Tools → Seguridad → Backups.

Los backups deben conservarse durante la ventana de estabilización y no contienen nuevas solicitudes de reserva: el modo publicado no persiste datos.
