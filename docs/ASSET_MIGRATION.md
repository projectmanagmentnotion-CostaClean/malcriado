# Auditoría y migración de assets

## Principio

Reutilizar logos, fotografías, vídeos, carta y contenidos actuales que pertenezcan a Malcriado o cuenten con autorización. No copiar código, tema, plugins ni recursos de terceros sin licencia.

## Inventario inicial observado

- Logo principal de Malcriado.
- Fotografías de platos: tartar de atún, ensaladilla, chicharrones, burrata, nachos, sushi, gambas, pulpo, arepas, mollejas, tacos y pizzas.
- Fotografías de bebidas: mojitos, margaritas, sangrías y cubos de cerveza.
- Contenido de historia del chef Héctor.
- Datos de contacto, ubicación y horario.
- Carta por categorías.
- Enlaces de Instagram y WhatsApp.

El inventario definitivo se generará descargando los archivos originales disponibles, no capturas de pantalla.

## Flujo obligatorio

1. Extraer URLs y metadatos de medios de la web actual.
2. Descargar originales con trazabilidad de URL y fecha.
3. Registrar propietario/licencia/permiso cuando proceda.
4. Detectar duplicados por hash y similitud visual.
5. Evaluar resolución, foco, ruido, compresión y encuadre.
6. Renombrar con slugs descriptivos.
7. Crear masters preservados y derivados web.
8. Generar AVIF/WebP/JPEG según compatibilidad.
9. Crear tamaños responsive y posters de vídeo.
10. Asociar alt text, rol decorativo y punto focal.
11. Añadir el asset al manifiesto.

## Estructura

```text
public/assets/
  brand/
  images/
    dishes/
    drinks/
    venue/
    people/
    offers/
  video/
  menu/
  social/
```

## Manifiesto

Crear `src/content/assets.ts` o un manifiesto JSON tipado con:

- id;
- ruta;
- tipo;
- dimensiones/duración;
- fuente original;
- fecha de captura;
- derechos verificados;
- alt text;
- punto focal;
- variantes;
- páginas de uso.

## Reglas de optimización

- Conservar master original fuera del bundle de producción.
- No reescalar por encima de la resolución útil.
- Declarar width/height o aspect-ratio.
- Usar calidad perceptual, no un porcentaje fijo universal.
- Vídeos sin audio cuando sean ambientales, con poster y carga diferida.
- No precargar galerías ni vídeos secundarios.
- Evitar repetir el mismo asset en múltiples tamaños descargados simultáneamente.

## Contenido pendiente de validación

- Precios actuales.
- Alérgenos e ingredientes.
- Horario actualizado y festivos.
- Ofertas vigentes.
- Fotos/vídeos nuevos no publicados.
- Servicios reales: terraza, grupos, mascotas, accesibilidad y eventos.
- Datos fiscales y jurídicos del titular.
