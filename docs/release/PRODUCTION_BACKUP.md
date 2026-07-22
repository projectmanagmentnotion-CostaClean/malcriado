# Backup previo a producción

No se puede marcar este documento como ejecutado sin acceso operativo al hosting. El 2026-07-22 se comprobó la sesión disponible y `my.siteground.com` redirigió al formulario de inicio de sesión; no se introdujeron credenciales ni se modificó el hosting.

## Registro obligatorio

| Campo                             | Valor                          |
| --------------------------------- | ------------------------------ |
| Estado                            | `BLOCKED_NO_AUTHENTICATED_SESSION` |
| Fecha y hora Europe/Madrid        | 2026-07-22; hora exacta no registrada |
| Dominio                           | `malcriadobcn.com`             |
| Document root verificado          | pendiente                      |
| Método                            | SiteGround File Manager o SFTP |
| Archivo de backup                 | pendiente                      |
| SHA-256                           | pendiente                      |
| Ubicación fuera del document root | pendiente                      |
| Operador                          | pendiente                      |

## Procedimiento

1. Identificar el document root en Site Tools y registrarlo.
2. Comprimir todos los archivos actuales, incluidos dotfiles como `.htaccess`.
3. Descargar el archivo fuera del hosting y calcular SHA-256.
4. Si existe base de datos de la web anterior, exportarla desde Site Tools aunque la nueva web no use base de datos.
5. Conservar backup y exportación durante el despliegue y la ventana de estabilización.
6. Probar que el ZIP se puede listar/abrir antes de reemplazar archivos.

Sin los campos anteriores completos no se autoriza una acción destructiva en producción.
