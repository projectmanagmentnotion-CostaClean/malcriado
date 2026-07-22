# Rollback de producción

## Activación

Revertir inmediatamente ante pantalla en blanco, error 500, rutas internas o recursos críticos rotos, canonical incorrecto, formulario inutilizable, menú móvil o consentimiento roto, regresión grave de accesibilidad o caída importante de rendimiento.

## Procedimiento

1. Poner en pausa nuevas subidas y registrar hora/síntoma.
2. Mover los archivos del candidato a una carpeta fechada dentro del espacio operativo; no sobrescribir el backup.
3. Restaurar el backup verificado en el mismo document root, incluidos dotfiles.
4. Restaurar base de datos anterior solo si la web sustituida la necesitaba y fue modificada.
5. Purgar cachés de SiteGround/CDN y comprobar HTTPS.
6. Probar inicio, una ruta interna, reserva/contacto y consola.
7. Registrar causa, responsable y decisión antes de reintentar.

Objetivo operativo: volver al estado anterior verificable en menos de 15 minutos. El modo de reservas de este candidato no escribe datos remotos, por lo que no necesita migración o rollback de datos.
