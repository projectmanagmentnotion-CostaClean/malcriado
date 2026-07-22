# Despliegue de staging sin tocar produccion

## Estrategia

Publicar `dist/` en `staging.malcriadobcn.com` o en una preview temporal aislada. No reemplazar `public_html` del dominio principal. SiteGround no ejecuta Node.js; sirve el frontend estatico y el endpoint se aloja externamente.

## Build reproducible

```text
npm ci
npm run qa
npm run test:e2e
npm run build
npm run lighthouse:ci
```

Construir con `VITE_PUBLIC_SITE_URL` de staging y `VITE_STAGING_NOINDEX=true`. Ademas del meta robots, configurar cabecera `X-Robots-Tag: noindex, nofollow` y bloquear robots en la raiz de staging. Mantener canonical hacia produccion.

## SiteGround

1. Crear subdominio desde Site Tools y directorio separado.
2. Crear backup manual en `Site Tools > Security > Backups`; descargar archivos/base cuando el plan lo permita.
3. Subir un artefacto `dist/` identificado por commit mediante SFTP/File Manager.
4. Instalar SSL para el subdominio y activar HTTPS Enforce.
5. Confirmar DNS del subdominio y esperar propagacion.
6. Vaciar cache/CDN solo para staging.
7. Verificar rutas directas, refresh, 404 y `_redirects`/rewrite equivalente en Apache.

Referencias operativas consultadas: SiteGround KB sobre [Node.js](https://www.siteground.com/kb/node-js-available), [backups](https://www.siteground.com/kb/backup-service/), [DNS](https://www.siteground.com/kb/manage-dns-records-site-tools/) y [SSL](https://www.siteground.com/kb/manage-ssl-certificates-site-tools).

## Rollback

Conservar el artefacto anterior y su hash. Para rollback, restaurar exclusivamente el directorio del subdominio o volver a subir el artefacto previo; despues purgar cache y repetir smoke. La produccion actual no debe modificarse.

## Smoke

- `curl -I` confirma HTTPS, `X-Robots-Tag` y cache esperado
- todas las rutas publicas cargan por URL directa y refresh
- 404 visible y no indexable
- formulario, errores, honeypot y fallback funcionan
- no aparece “reserva confirmada” tras el envio inicial
- WhatsApp requiere clic y contiene referencia
- Axe, teclado, 320/390/768/1440 y reduced motion
- comprobar Chrome/Edge/Firefox y al menos iOS Safari/Android Chrome reales
- confirmar los tres checks remotos independientes: `quality`, `e2e` y `lighthouse`
