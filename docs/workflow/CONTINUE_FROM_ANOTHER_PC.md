# Continuar desde otra PC

## Checkpoint

- Fase: `12B — candidato de producción por contacto`.
- Rama: `codex/phase-12b-production-launch`.
- Base inicial: merge de Fase 12A `31f7765e467e53ed96544f3b0a91da613caf97c1`.
- PR: `#14 Phase 12B: production launch with contact reservation mode`.
- Revisión independiente local: completada; no hacer merge hasta CI verde del head final y no desplegar sin backup real.

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
npm run release:verify
```

Genera `release/malcriado-production/`, `.zip` y `.sha256`; `release/` no se versiona. El build fuerza canonical de producción, reservas `contact`, API vacía, analytics/dev routes desactivados e indexación activa.

## Arquitectura vigente

- `ContactReservationProvider`: valida y prepara canales; no hace fetch o persistencia.
- `ApiReservationProvider`: futuro, inactivo sin URL y sin credenciales.
- `VITE_RESERVATION_MODE`: `contact`, `api` o `disabled`; producción usa `contact`.
- No existe Supabase, base de datos, SMTP, webhook o serverless.

## Operación pendiente

1. Confirmar CI remoto del head exacto.
2. Confirmar que PR #14 está `ready for review` sin hacer merge.
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
npm run accessibility:axe
npm run test:run
npm run build
npm run test:e2e
npm run qa
npm run release:verify
npm audit
git diff --check
```

Deuda residual: validación jurídica/comercial del titular, dispositivos reales/lector de pantalla, CWV de campo y API futura opcional.
