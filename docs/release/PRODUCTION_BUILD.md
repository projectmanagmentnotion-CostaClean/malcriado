# Build de producción

## Requisitos y comando

Node 20.19 o superior y lockfile limpio.

```bash
npm ci
npm run qa
npm run release:build
npm run release:verify
```

`release:build` fuerza el dominio canónico, modo `contact`, API vacía, dev routes desactivadas, analítica desactivada y `noindex` desactivado. Después copia `dist/` y genera un ZIP ordenado, con fecha fija, permisos fijos y compresión nivel 9.

## Salidas

- `release/malcriado-production/`: únicamente archivos que se publican.
- `release/malcriado-production.zip`: contenido de la carpeta, sin directorio envolvente.
- `release/malcriado-production.sha256`: SHA-256 por archivo y del ZIP.

`release/` se ignora en Git; es un artefacto local reproducible. No contiene `src`, `.git`, `node_modules`, tests, informes, capturas, documentación interna ni archivos `.env`.

## Verificación

```powershell
$env:EXPECTED_RELEASE_SHA256="b43ef4ff6d395b820067641a15883a174256dfba9b7e16f061e6c87004ae997a"
npm run release:verify
```

Dos ejecuciones consecutivas deben producir el mismo hash si el árbol fuente y las dependencias bloqueadas no cambian.

## Artefacto de cierre — 2026-07-22

- Archivos publicables: 384.
- Tamaño ZIP: 25.340.269 bytes.
- SHA-256 ZIP: `b43ef4ff6d395b820067641a15883a174256dfba9b7e16f061e6c87004ae997a`.
- Source maps: 0.
- Marcadores `/dev/` o `__MALCRIADO_MOCK` en el artefacto: 0.
