# Matriz responsive móvil e iPad

## Familias implementadas

| Familia           | Rango       | Navegación | Composición                                          |
| ----------------- | ----------- | ---------- | ---------------------------------------------------- |
| Mobile compact    | 320–599 px  | Drawer     | Una columna, ritmo corto, CTA persistente            |
| Tablet portrait   | 600–899 px  | Drawer     | Dos zonas o dos columnas cuando mejora la lectura    |
| Tablet landscape  | 900–1199 px | Drawer     | Retículas editoriales asimétricas y panel contextual |
| Desktop protegido | ≥1200 px    | Horizontal | Composición estable existente                        |

La franja 480–599 mantiene la composición compacta para evitar un salto intermedio sin valor. Los tokens de gutter, header, targets, separación, tarjetas y hero viven en `src/styles/tokens/layout.css`.

## Comparación de altura documental

| Ruta / viewport    | Producción | Candidato |     Delta |
| ------------------ | ---------: | --------: | --------: |
| Home 390 × 844     |  13.338 px | 12.791 px |   −547 px |
| Carta 390 × 844    |  18.701 px | 17.534 px | −1.167 px |
| Home 768 × 1024    |  15.052 px | 12.305 px | −2.747 px |
| Carta 768 × 1024   |  18.831 px | 15.133 px | −3.698 px |
| Reserva 768 × 1024 |   4.786 px |  4.015 px |   −771 px |
| Carta 1024 × 768   |  14.020 px | 11.623 px | −2.397 px |

Home a 1024 crece 587 px porque ahora usa una composición tablet legible en vez de comprimir el layout desktop; es una decisión consciente. Reserva crece 96 px por el mismo motivo.

## Resultado

- 264/264 comprobaciones del candidato verdes.
- Cero overflow horizontal.
- Cero imágenes rotas.
- Cero targets primarios menores de 44 px en los viewports <1200.
- Cambio correcto de drawer a desktop en 1200 px.
