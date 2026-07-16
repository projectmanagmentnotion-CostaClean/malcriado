# Accesibilidad, privacidad y requisitos UE/España

> Documento técnico de cumplimiento. No sustituye revisión jurídica profesional ni la adaptación a los datos reales del titular, proveedores y tratamientos.

## Marco de referencia

La producción debe considerar, como mínimo:

- RGPD: Reglamento (UE) 2016/679.
- LOPDGDD: Ley Orgánica 3/2018.
- LSSI-CE: Ley 34/2002 para información del prestador, comunicaciones y cookies.
- Directiva ePrivacy y criterio vigente de la AEPD sobre cookies.
- European Accessibility Act y su transposición española cuando resulte aplicable al servicio digital.
- WCAG 2.2 AA como objetivo técnico mínimo.
- EN 301 549 como referencia europea de accesibilidad TIC.
- Normas de consumo, precios, información alimentaria y alérgenos aplicables al restaurante.

Fuentes oficiales de referencia:

- https://eur-lex.europa.eu/eli/reg/2016/679/oj
- https://www.boe.es/buscar/act.php?id=BOE-A-2018-16673
- https://www.boe.es/buscar/act.php?id=BOE-A-2002-13758
- https://www.aepd.es/guias/guia-cookies.pdf
- https://eur-lex.europa.eu/eli/dir/2019/882/oj
- https://www.w3.org/TR/WCAG22/

## Páginas y contenidos legales

Antes de producción se deben completar con datos verificados:

- Aviso legal: titular, NIF/CIF, domicilio, contacto, registro cuando proceda y condiciones de uso.
- Política de privacidad: responsables, finalidades, bases jurídicas, destinatarios, transferencias, conservación y derechos.
- Política de cookies: inventario real, finalidades, terceros, duración y mecanismos de retirada.
- Declaración de accesibilidad: alcance, estado, limitaciones conocidas, contacto y procedimiento de reclamación si aplica.
- Condiciones de reserva, cancelación y tratamiento de solicitudes.

## Consentimiento de cookies

- Rechazar debe ser tan fácil y visible como aceptar.
- No activar analítica, marketing, mapas embebidos ni contenido equivalente antes del consentimiento cuando no sea esencial.
- No usar casillas premarcadas ni consentimiento por continuar navegando.
- Permitir configuración granular y retirada posterior.
- Registrar versión y decisión de consentimiento de forma proporcionada.
- Mantener funcionamiento básico al rechazar.

## Formulario de reserva

- Minimización de datos.
- Información de privacidad en primera capa junto al envío y enlace a información ampliada.
- Consentimiento separado para marketing; nunca condicionado a la reserva.
- Confirmación clara del estado: solicitud recibida, pendiente o confirmada.
- Canal seguro y política de conservación definida.
- Protección antispam respetuosa con accesibilidad y privacidad.
- No exponer datos personales en URLs, analítica o logs de cliente.

## Accesibilidad funcional

- HTML semántico y landmarks.
- Orden de encabezados lógico.
- Navegación completa por teclado.
- Foco visible y gestión correcta en menús, diálogos y errores.
- Contraste AA, texto redimensionable y reflow.
- Alternativas textuales y subtítulos/descripciones cuando proceda.
- Formularios con label, instrucciones, estados y errores programáticamente asociados.
- Control de movimiento, autoplay y contenido que parpadea.
- `prefers-reduced-motion` respetado en todas las escenas.
- Enlace para saltar al contenido.
- Idioma de página y cambios de idioma definidos.

## Información gastronómica

La carta debe prever información verificable de precios, impuestos, ingredientes relevantes, alérgenos y disponibilidad. No afirmar que un plato es apto para una dieta o libre de un alérgeno sin validación operativa del restaurante.

## Auditoría previa al lanzamiento

1. Inventario real de cookies y terceros.
2. Revisión de formularios y rutas de datos.
3. Pruebas WCAG manuales y automáticas.
4. Revisión de textos legales por responsable competente.
5. Validación de carta, precios y alérgenos por Malcriado.
6. Prueba de rechazo y retirada de consentimiento.
7. Prueba de descarga/borrado de datos según el proceso definido.
