# Continuar desde otra PC

## Checkpoint

- Fase: `13 — rediseño visual en producción`.
- Producción: `https://malcriadobcn.com/`, rediseño publicado el 2026-07-23 10:21 CEST.
- Base desplegada: `main` `8ee7ebb93ee1eecf0dbd7b0c78deae77a75b0116`.
- Rama documental: `codex/visual-redesign-production-verification`.
- Estado: `GO`; no hay P0/P1 abiertos y no se ejecuto rollback.
- Próximo hito: CWV p75 y validacion humana Safari/iOS, Android y lector de pantalla.

## Retomar

```bash
git clone https://github.com/projectmanagmentnotion-CostaClean/malcriado.git
cd malcriado
git fetch --all --prune
git switch codex/visual-redesign-production-verification
npm ci
```

## Producción y rollback

- Document root: `malcriadobcn.com/public_html`.
- Build: SHA-256 `801eda53fc0bec3dd3b16224b4c2fd1b7f4dd1397843fe3c9df2d3099f7cecc6`.
- Backup SiteGround: `production-before-visual-redesign-20260723-0948.zip`.
- Backup local: `backups/production-before-visual-redesign-20260723-0948.zip`, SHA-256 `02f1943aa2fe23af9ba1cf518d077aac6aac5f9fd4a76b1159edabd3c036eac2`.
- Version anterior preservada en `malcriadobcn.com/public_html_before_visual_redesign_20260723_0948/`.
- Runbook: `docs/release/PRODUCTION_BACKUP.md` y `docs/release/PRODUCTION_ROLLBACK.md`.

La cuenta FTP temporal del despliegue fue eliminada. No conservar ni recrear credenciales salvo una nueva operación autorizada.

## Arquitectura vigente

- Producción usa `ContactReservationProvider` en modo `contact`.
- No existe persistencia, Supabase, base de datos, SMTP, webhook o serverless.
- WhatsApp, correo, copia y llamada son acciones explícitas; preparar no equivale a enviar ni confirmar.
- `ApiReservationProvider` sigue inactivo y desacoplado para una fase futura.

## Verificación registrada

- Playwright remoto: 45 passed / 5 skipped.
- Axe remoto: 24/24 auditorias, 0 violaciones.
- Matriz visual remota: 28/28 escenarios extendidos.
- Lighthouse remoto: Home móvil 93, Reserva móvil 92, Home desktop 99, Reserva desktop 100; accesibilidad, buenas prácticas y SEO 100; CLS 0.
- Dynamic Cache purgada con confirmacion de SiteGround; cero P0/P1.

No iniciar cambios funcionales como parte del seguimiento. Si el control post-lanzamiento detecta un P0/P1 real, aplicar rollback o abrir una rama correctiva independiente.

## Cierre Fase 13 - QA visual

- Rama: `codex/pure-visual-design-qa`.
- Base: `main` `15696c88e1071fdb3d57257c946ce82d80041b20`.
- App local: `http://127.0.0.1:5173/` mientras siga abierta esta sesion.
- Matriz visual: `180/180` verde, Chromium emulado, 12 rutas y 15 viewports; extension independiente `28/28` verde.
- Cambios principales: Carta full-width con indice sticky; Home mas directo; Nosotros fotografico; Reserva con mapa consentido y enlace externo a Google.
- Assets oficiales: 100 inventariados, 98 previews y hojas de contacto; originales en `external-assets/` excluidos de Git.
- El rediseño esta desplegado; no se modificaron reservas, datos, DNS, SEO funcional ni backend.
- Revision independiente: Axe `24/24`, sticky Carta y ciclo de consentimiento del mapa verdes; cero P0/P1/P2 abiertos.
- Artefacto desplegado: 384 entradas, SHA-256 `801eda53fc0bec3dd3b16224b4c2fd1b7f4dd1397843fe3c9df2d3099f7cecc6`.

Para retomar:

```bash
git fetch --all --prune
git switch codex/visual-redesign-production-verification
npm ci
npm run qa
npm run qa:visual:independent
```
