# Continuar desde otra PC

## Checkpoint

- Fase: `12B — candidato de producción por contacto`.
- Rama: `codex/phase-12b-production-launch`.
- Base inicial: merge de Fase 12A `31f7765e467e53ed96544f3b0a91da613caf97c1`.
- PR: abrir como draft con título `Phase 12B: production launch with contact reservation mode` tras commit/push.
- No hacer merge ni desplegar sin revisión independiente, CI verde, paquete verificado y backup real.

## Retomar

```bash
git clone https://github.com/projectmanagmentnotion-CostaClean/malcriado.git
cd malcriado
git fetch --all --prune
git switch codex/phase-12b-production-launch
npm ci
copy .env.example .env
npm run qa
```

## Producción reproducible

```bash
npm run release:build
```

Genera `release/malcriado-production/`, `.zip` y `.sha256`; `release/` no se versiona. El build fuerza canonical de producción, reservas `contact`, API vacía, analytics/dev routes desactivados e indexación activa.

## Arquitectura vigente

- `ContactReservationProvider`: valida y prepara canales; no hace fetch o persistencia.
- `ApiReservationProvider`: futuro, inactivo sin URL y sin credenciales.
- `VITE_RESERVATION_MODE`: `contact`, `api` o `disabled`; producción usa `contact`.
- No existe Supabase, base de datos, SMTP, webhook o serverless.

## Operación pendiente

1. Confirmar CI remoto del head exacto.
2. Revisión independiente del draft PR.
3. Acceder a SiteGround y completar `docs/release/PRODUCTION_BACKUP.md`.
4. Solo con backup verificado, subir el contenido del ZIP y purgar caché.
5. Ejecutar `docs/release/PRODUCTION_SMOKE_TEST.md` y registrar URL/hora/evidencia.

## Gates

```bash
npm run format:check
npm run lint
npm run typecheck
npm run content:validate
npm run content:report
npm run assets:verify
npm run routes:validate
npm run seo:validate
npm run bundle:budget
npm run test:run
npm run build
npm run test:e2e
npm run qa
npm audit
git diff --check
```

Deuda residual: validación jurídica/comercial del titular, dispositivos reales/lector de pantalla, CWV de campo y API futura opcional.
