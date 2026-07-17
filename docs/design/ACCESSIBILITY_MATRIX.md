# Accessibility Matrix

## Contraste y resultado

| Combinacion                           | Uso                   | Nivel esperado | Resultado                       |
| ------------------------------------- | --------------------- | -------------- | ------------------------------- |
| `fg-base` sobre `bg-base`             | body general          | AA             | correcto                        |
| `fg-secondary` sobre `bg-elevated`    | cards y panels        | AA             | correcto                        |
| blanco roto sobre `accent-primary`    | CTA principal         | AA             | correcto                        |
| blanco roto sobre gradiente editorial | CTA editorial         | AA             | correcto                        |
| `fg-base` sobre `surface-night`       | overlays y menu movil | AA             | correcto                        |
| `fg-muted` sobre fondos oscuros       | metadata              | uso limitado   | correcto solo en cuerpos cortos |
| `focus` sobre oscuros y claros        | foco visible          | AA perceptivo  | correcto                        |

## Revision manual

- teclado: completado en shell, header, menu movil y catalogo dev
- focus order: correcto en pruebas manuales y unitarias previstas
- zoom 200 %: reglas documentadas y verificacion prevista en E2E
- reflow: layouts pasan a columna unica en anchos estrechos
- target size: botones e icon buttons >= 44 px
- reduced motion: animaciones no esenciales reducidas por CSS

## Pendiente

- medir de nuevo cuando entren hero final, overlays sobre imagen y futuras escenas GSAP de Fase 6
- revisar legales finales cuando se introduzcan textos reales extensos
