# Matriz de validacion de alergenos

Estado global: `PENDIENTE_DE_VALIDACION`  
Fuente ejecutable: `src/content/menu/items.ts`

No se deben completar celdas por inferencia del nombre del plato. Validar receta, cada ingrediente/marca, fichas tecnicas y riesgo de contaminacion cruzada. Hasta cerrar una fila, `allergenStatus` permanece pendiente, `allergens` vacio y la web no muestra iconos ni schema.

Columnas obligatorias por item:

| Campo             | Valores                        |
| ----------------- | ------------------------------ |
| Item ID           | ID tipado de carta             |
| Gluten            | si / no / trazas / desconocido |
| Crustaceos        | si / no / trazas / desconocido |
| Huevos            | si / no / trazas / desconocido |
| Pescado           | si / no / trazas / desconocido |
| Cacahuetes        | si / no / trazas / desconocido |
| Soja              | si / no / trazas / desconocido |
| Leche             | si / no / trazas / desconocido |
| Frutos de cascara | si / no / trazas / desconocido |
| Apio              | si / no / trazas / desconocido |
| Mostaza           | si / no / trazas / desconocido |
| Sesamo            | si / no / trazas / desconocido |
| Sulfitos          | si / no / trazas / desconocido |
| Altramuces        | si / no / trazas / desconocido |
| Moluscos          | si / no / trazas / desconocido |
| Evidencia         | receta/ficha y fecha           |
| Aprobador         | nombre y fecha                 |

Matriz de seguimiento (los 14 grupos permanecen `unknown` hasta anexar la ficha detallada de la fila):

| Item ID                        | 14 grupos | Evidencia | Aprobador |
| ------------------------------ | --------- | --------- | --------- |
| item-gambas-ajillo             | unknown   | pendiente | pendiente |
| item-pulpo-chimichurri         | unknown   | pendiente | pendiente |
| item-nachos-malcriados         | unknown   | pendiente | pendiente |
| item-chicharrones-sinaloenses  | unknown   | pendiente | pendiente |
| item-tequenos-ud               | unknown   | pendiente | pendiente |
| item-infladita-res             | unknown   | pendiente | pendiente |
| item-fajitas-mixta             | unknown   | pendiente | pendiente |
| item-canelon-xxl               | unknown   | pendiente | pendiente |
| item-burrata                   | unknown   | pendiente | pendiente |
| item-ceviche-tradicional       | unknown   | pendiente | pendiente |
| item-tarta-atun                | unknown   | pendiente | pendiente |
| item-carpaccio-salmon-curado   | unknown   | pendiente | pendiente |
| item-ensalada-tomate-melocoton | unknown   | pendiente | pendiente |
| item-pizza-calabrese-picante   | unknown   | pendiente | pendiente |
| item-pizza-prosciutto          | unknown   | pendiente | pendiente |
| item-pizza-hawaiana            | unknown   | pendiente | pendiente |
| item-pizza-malcriada           | unknown   | pendiente | pendiente |
| item-pizza-margarita           | unknown   | pendiente | pendiente |
| item-sangria                   | unknown   | pendiente | pendiente |
| item-tinto-verano              | unknown   | pendiente | pendiente |
| item-sangria-litro             | unknown   | pendiente | pendiente |
| item-sangria-cava              | unknown   | pendiente | pendiente |
| item-margarita                 | unknown   | pendiente | pendiente |
| item-margarita-maracuya        | unknown   | pendiente | pendiente |
| item-margarita-fresa           | unknown   | pendiente | pendiente |
| item-mojito-clasico            | unknown   | pendiente | pendiente |
| item-mojito-sin-alcohol        | unknown   | pendiente | pendiente |
| item-mahou                     | unknown   | pendiente | pendiente |
| item-corona                    | unknown   | pendiente | pendiente |
| item-alhambra                  | unknown   | pendiente | pendiente |
| item-coca-cola                 | unknown   | pendiente | pendiente |
| item-fanta                     | unknown   | pendiente | pendiente |
| item-nestea                    | unknown   | pendiente | pendiente |
| item-tonica                    | unknown   | pendiente | pendiente |
| item-bitter-kas                | unknown   | pendiente | pendiente |
| item-red-bull                  | unknown   | pendiente | pendiente |
| item-vino-tinto                | unknown   | pendiente | pendiente |
| item-vino-blanco               | unknown   | pendiente | pendiente |
| item-vino-rosado               | unknown   | pendiente | pendiente |
| item-cava                      | unknown   | pendiente | pendiente |
| item-tarta-queso               | unknown   | pendiente | pendiente |
| item-tarta-tres-leches         | unknown   | pendiente | pendiente |
| item-merengon-fresa            | unknown   | pendiente | pendiente |
| item-coulant-chocolate         | unknown   | pendiente | pendiente |

Criterio de cierre automatizable: cada item debe tener evidencia y aprobador; solo entonces se cambia su estado a `VERIFIED` y se cargan exclusivamente los grupos confirmados.
