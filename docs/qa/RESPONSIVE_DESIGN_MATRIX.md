# Responsive design matrix

## Cobertura

`320x568`, `360x800`, `375x812`, `390x844`, `412x915`, `430x932`, `768x1024`, `820x1180`, `1024x768`, `1280x720`, `1366x768`, `1440x900`, `1536x864`, `1920x1080` y `2560x1440`.

| Rango     | Composicion                                  | Navegacion                           | Media                                | Resultado    |
| --------- | -------------------------------------------- | ------------------------------------ | ------------------------------------ | ------------ |
| 320–430   | Una columna, tipografia contenida            | Menu movil + indice Carta horizontal | Crops verticales y alturas limitadas | Sin overflow |
| 768–820   | Apilado editorial                            | Rail tactil                          | Imagenes a ancho util                | Sin overflow |
| 1024–1536 | Dos/tres columnas segun escena               | Header desktop y Carta sticky        | Imagen protagonista                  | Conforme     |
| 1920–2560 | Contenedor wide, lineas de lectura limitadas | Header estable                       | Sin ampliacion sobre variante util   | Conforme     |

Reduced motion mantiene todo el contenido visible y elimina scrub/parallax. La revision independiente repitio Home, Carta, Nosotros y Reserva en `844x390`, `1180x820`, `1280x560`, y viewports CSS equivalentes a zoom 125/150/200 (`1152x720`, `960x600`, `720x450`): 28/28 sin overflow, imagen rota, contenido animado oculto ni error de pagina. Queda una pasada humana en navegador y hardware real como P3.

En Carta, el salto a Pizzas deja tanto la seccion como su `h2` por debajo de header + rail sticky; el chip activo usa `aria-current="location"` y el rail horizontal lo mantiene visible.
