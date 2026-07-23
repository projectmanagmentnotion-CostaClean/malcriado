# Visual route matrix

| Ruta                             | Foco primario      | Hallazgo principal                 | Resolucion                                            | Nota   |
| -------------------------------- | ------------------ | ---------------------------------- | ----------------------------------------------------- | ------ |
| `/`                              | Hero y reserva     | Titulo/soporte demasiado denso     | Hero simplificado, CTA visible, fotografia restaurada | 89/100 |
| `/menu/`                         | Categoria y precio | Cajas repetidas, scroll sin indice | Capitulos editoriales + indice sticky activo          | 90/100 |
| `/especiales/`                   | Estado comercial   | Composicion correcta               | Se conserva                                           | 86/100 |
| `/nosotros/`                     | Relato de marca    | Hero sin imagen efectiva           | Crop valido + galeria                                 | 89/100 |
| `/contacto/`                     | Telefono/mapa      | Jerarquia estable                  | Se conserva mapa consentido                           | 88/100 |
| `/faq/`                          | Pregunta/respuesta | Buena lectura, cierre largo        | Se conserva                                           | 88/100 |
| `/reservar/`                     | Datos y CTA        | Apariencia administrativa          | Layout editorial + mapa/reseñas externo               | 88/100 |
| `/aviso-legal/`                  | Lectura            | Linea y jerarquia correctas        | Conforme                                              | 86/100 |
| `/privacidad/`                   | Lectura            | Linea y jerarquia correctas        | Conforme                                              | 86/100 |
| `/cookies/`                      | Preferencias       | Decision reversible visible        | Conforme                                              | 86/100 |
| `/declaracion-de-accesibilidad/` | Lectura            | Estructura coherente               | Conforme                                              | 86/100 |
| `/ruta-inexistente/`             | Recuperacion       | CTA y salida correctos             | Conforme                                              | 87/100 |

Todas las rutas se probaron en los 15 viewports definidos; 180 comprobaciones de `status`, `h1`, imagen rota, frame vacio y overflow.

La revision independiente añadio 28 comprobaciones sobre Home, Carta, Nosotros y Reserva en landscape movil/tablet, viewport bajo, zoom emulado 125/150/200 y reduced motion. Tambien ejecuto Axe en las 12 rutas a 390x844 y 1440x900: 24/24 auditorias sin violaciones tras corregir los contrastes de Carta y Nosotros.

## Produccion — 2026-07-23

La misma matriz se ejecuto contra `https://malcriadobcn.com` tras purgar Dynamic Cache:

- rutas publicas, acceso directo, refresh y 404 logica: conformes;
- Home, Carta, Nosotros y Reserva: 28/28 escenarios extendidos;
- Axe: 24/24 auditorias sin violaciones;
- Carta sticky y categoria activa: conformes;
- mapa consentido y revocable: conforme;
- cero overflow, imagenes rotas, contenido oculto por motion, errores de consola, PII o requests externas inesperadas.

El resultado remoto mantiene las notas visuales aprobadas y no abre P0, P1 ni P2.
