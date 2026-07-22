# Continuar desde otra PC

## Checkpoint

- Fase: `12C — verificación de producción`.
- Producción: `https://malcriadobcn.com/`, publicada el 2026-07-22 16:12 CEST.
- Base desplegada: `main` `8d16c4fc99c8be03bfd69a0f726ddac39fa472e9`.
- Rama documental: `codex/phase-12c-production-verification`.
- Estado: `GO`; no hay P0/P1 abiertos.
- Próximos hitos: control a 24 horas el 2026-07-23 y a 7 días el 2026-07-29.

## Retomar

```bash
git clone https://github.com/projectmanagmentnotion-CostaClean/malcriado.git
cd malcriado
git fetch --all --prune
git switch codex/phase-12c-production-verification
npm ci
```

## Producción y rollback

- Document root: `malcriadobcn.com/public_html`.
- Build: SHA-256 `b43ef4ff6d395b820067641a15883a174256dfba9b7e16f061e6c87004ae997a`.
- Backup SiteGround: `production-before-launch-20260722-1528`.
- Backup local: `backups/production-before-launch-20260722-1528.zip`, SHA-256 `479fe7dbe6c8d04d1337f6206289e9c184531c9fd6ed3016a140d26ca4beac`.
- Web anterior preservada en `malcriadobcn.com/public_html_before_launch_20260722_1528/`.
- Runbook: `docs/release/PRODUCTION_BACKUP.md` y `docs/release/PRODUCTION_ROLLBACK.md`.

La cuenta FTP temporal del despliegue fue eliminada. No conservar ni recrear credenciales salvo una nueva operación autorizada.

## Arquitectura vigente

- Producción usa `ContactReservationProvider` en modo `contact`.
- No existe persistencia, Supabase, base de datos, SMTP, webhook o serverless.
- WhatsApp, correo, copia y llamada son acciones explícitas; preparar no equivale a enviar ni confirmar.
- `ApiReservationProvider` sigue inactivo y desacoplado para una fase futura.

## Verificación registrada

- Playwright remoto: 45 passed / 5 skipped.
- Axe remoto: 0 violaciones en Home/Reserva, desktop, móvil y reduced motion.
- Lighthouse remoto: Home móvil 91, Reserva móvil 92, Home desktop 99, Reserva desktop 77; accesibilidad, buenas prácticas y SEO 100; CLS 0.
- Incidente resuelto: HTML antiguo servido por Dynamic Cache justo después del intercambio; purga confirmada y repetición verde.

No iniciar cambios funcionales como parte del seguimiento. Si el control post-lanzamiento detecta un P0/P1 real, aplicar rollback o abrir una rama correctiva independiente.
