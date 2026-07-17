# Phase 7 Warning Delta

Fecha: 2026-07-17
Baseline Fase 6: `92`
Estado ampliado inicial Fase 7: `131`
Estado final local Fase 7: `130`

## Tabla de delta

| Categoria                | Baseline anterior | Estado ampliado inicial | Estado final | Delta final vs 92 | Causa                                                                            | Archivo o contenido afectado                                    | Deuda antigua o nueva                          | Prioridad | Fase de resolucion                        | Criterio de cierre                                        |
| ------------------------ | ----------------: | ----------------------: | -----------: | ----------------: | -------------------------------------------------------------------------------- | --------------------------------------------------------------- | ---------------------------------------------- | --------- | ----------------------------------------- | --------------------------------------------------------- |
| Categoria vacia          |                 1 |                       1 |            1 |                 0 | `Vermut` existe en la fuente, pero sin items recuperados                         | `src/content/menu/categories.ts`                                | antigua                                        | `P2`      | Fase 7/Fase 9                             | recuperar items reales o retirar categoria de la fuente   |
| Precios pendientes       |                44 |                      44 |           44 |                 0 | no hay precios verificados en la fuente auditada                                 | `src/content/menu/items.ts`                                     | antigua                                        | `P0`      | fase posterior con validacion del titular | 44 precios verificados o explicitamente retirados         |
| Alergenos pendientes     |                44 |                      44 |           44 |                 0 | no hay tabla de alergenos verificada                                             | `src/content/menu/items.ts`                                     | antigua                                        | `P0`      | fase posterior con validacion del titular | alergenos cargados sin inferencias                        |
| Descripciones pendientes |                 0 |                      38 |           38 |               +38 | Fase 7 amplifica la auditoria y expone deuda editorial antes no medida           | `src/content/menu/items.ts`, `MenuPage.tsx`                     | antigua recien medida                          | `P1`      | fase editorial posterior                  | 38 descripciones confirmadas o explicitamente descartadas |
| Slug duplicado           |                 0 |                       1 |            0 |                 0 | colision entre pizza `Margarita` y coctel `Margarita` al reutilizar slug publico | `src/content/menu/items.ts`, `src/lib/menu/menuPresentation.ts` | nueva detectada en Fase 7 y resuelta en Fase 7 | `P1`      | Fase 7                                    | slugs unicos y tests verdes                               |
| Legales pendientes       |                 3 |                       3 |            3 |                 0 | aviso legal, privacidad y cookies sin validacion juridica final                  | `src/content/legal/*`                                           | antigua                                        | `P0`      | Fase 9                                    | checklist legal cerrada                                   |

## Conclusiones

1. El salto `92 -> 131` no fue ruido: `38` warnings vienen de medir descripciones pendientes y `1` de un slug realmente duplicado.
2. El warning nuevo accidental de slug ya esta corregido.
3. El estado final `130` deja visible deuda antigua, pero no oculta ni maquilla contenido no verificado.
