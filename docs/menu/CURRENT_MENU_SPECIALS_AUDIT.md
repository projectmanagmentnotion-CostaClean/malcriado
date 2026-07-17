# Current Menu And Specials Audit

Fecha: 2026-07-17
Branch: `codex/phase-7-menu-and-specials`
Baseline viva: `http://127.0.0.1:5175/`
Preview de produccion auditado: `http://127.0.0.1:4173/`
Estado auditado: cierre tecnico local de Fase 7

## Resumen ejecutivo

La Fase 7 ya entrega una carta HTML indexable y una pagina de especiales editorialmente honesta. El shell visual abierto se mantiene en `home`, `menu`, `nosotros`, `reservar`, `contacto`, legales y `404`.

Estado local confirmado:

- `/menu/` reconstruida como carta HTML por capitulos reales;
- `/especiales/` reconstruida con estados `active`, `upcoming`, `expired` y `empty`;
- `Vermut` tratada como categoria oculta;
- slug duplicado `margarita` resuelto con `pizza-margarita`;
- JSON-LD ampliado para `Menu`, `MenuSection`, `MenuItem` y `Offer` activo;
- deep links operativos por categoria y plato;
- reserva contextual conservada;
- 42 tests unitarios/integracion verdes;
- 25 E2E verdes y 4 skips justificados;
- `content:validate`: `0` errores, `130` warnings;
- sin errores de consola ni de red en la auditoria de preview;
- Axe sin violaciones en los escenarios auditados.

## Metricas reales del modelo

- categorias totales: `10`
- categorias publicas: `9`
- categorias ocultas: `1`
- categorias ocultas: `Vermut`
- platos: `44`
- platos con imagen: `11`
- platos sin imagen: `33`
- precios verificados: `0`
- precios pendientes: `44`
- alergenos verificados: `0`
- alergenos pendientes: `44`
- descripciones pendientes: `38`
- ofertas activas: `0`
- ofertas proximas: `0`
- ofertas expiradas: `0`
- slugs duplicados: `0`

## Cambios bloqueantes resueltos

1. La carta ya no depende de cards repetidas ni de una composicion provisional.
2. Los enlaces de categoria usan hashes estables y verificables.
3. `Vermut` deja de aparecer como categoria publica vacia.
4. El slug `margarita` ya no colisiona entre pizza y coctel.
5. La capa SEO estructurada publica `Menu` y `Offer` solo cuando procede.
6. Especiales no publica promociones ficticias en ausencia de datos verificados.

## Warning delta

- baseline Fase 6: `92`
- estado intermedio al ampliar auditoria: `131`
- estado final local Fase 7: `130`

Explicacion del delta:

- `+38` warnings nuevos por descripciones pendientes, deuda editorial antigua recien medida en Fase 7
- `+1` warning nuevo por slug duplicado `margarita`, introducido al exponer identidad publica reutilizable
- `-1` warning final porque el slug duplicado se resolvio en esta fase

## Riesgos que siguen abiertos

- no hay precios verificados;
- no hay alergenos verificados;
- 38 descripciones siguen pendientes;
- las 3 paginas legales siguen pendientes de validacion;
- `Vermut` sigue sin items recuperados;
- no existe oferta real activa en datos tipados;
- la publicacion remota del draft PR depende de credenciales GitHub.
