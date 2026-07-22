# Revisión independiente de Fase 12B

Fecha: 2026-07-22

PR: `#14`

Head recibido: `21ce0a9c7edab904e51de0fb3f65baabd41b81c7`

## Veredicto

`GO` técnico condicionado únicamente a que el CI del head de revisión termine verde. El candidato mantiene reservas en modo `contact`, no despliega backend ni persiste PII. Producción permanece en `NO-GO` operativo hasta ejecutar y verificar el backup de SiteGround.

## Hallazgos

### P0

- Ninguno.

### P1

- Ninguno.

### P2 corregidos

1. El fallback secundario decía “confirmar por teléfono o WhatsApp”. Se cambió a “solicitar” para reservar la confirmación exclusivamente al equipo.
2. La inspección de ZIP, checksum, source maps y marcadores internos dependía de pasos manuales. Se añadió `npm run release:verify`, que compara byte a byte carpeta, ZIP y manifiesto y falla ante rutas o contenido prohibido.
3. Faltaba un gate Axe de producción autocontenido para Home/Reserva, móvil, escritorio, reduced motion, canonical, consola y red. Se añadió `npm run accessibility:axe`.
4. E2E ahora verifica copia al portapapeles, `mailto`, teléfono, URL interna sin PII y cero requests externos/backend al preparar la solicitud.
5. CI ejecuta la verificación del candidato en `quality` y Axe de producción en `e2e`, manteniendo Lighthouse como job independiente.

### P3 aceptados

- LCP de laboratorio superior a 2,5 s: Home `4.139 ms`, Reserva `3.693 ms`. La imagen LCP conserva prioridad alta, carga eager, variantes responsive y CLS 0; se requiere medición p75 en staging y valorar prerender si se confirma.
- Lighthouse CLI genera avisos `EPERM` al limpiar perfiles temporales en Windows después de producir informes válidos; exit code y presupuestos son verdes.
- Pruebas humanas pendientes en Safari/iOS, Android y NVDA/VoiceOver.
- Permanecen 86 warnings editoriales: 44 precios, 44 alérgenos, 38 descripciones y textos legales pendientes. No se sustituyen por datos inventados.
- El proveedor `api` es arquitectura futura inactiva. Requiere revisión independiente de backend, seguridad, retención y legal antes de activarse.

## Reservas y privacidad

- Producción fuerza `VITE_RESERVATION_MODE=contact` y URL API vacía.
- `ContactReservationProvider` valida con Zod y genera UUID/acciones; no ejecuta `fetch`, storage, Supabase, SMTP, webhook o persistencia.
- WhatsApp es la acción principal. Correo, copia y llamada son fallback explícito.
- La reserva sigue pendiente hasta confirmación personal del equipo.
- Alergias solo se incluyen con checkbox específico desmarcado por defecto.
- Nombre, teléfono, email, alergias y comentarios no entran en la URL interna, logs o analytics. El mensaje limitado aparece en `wa.me`/`mailto` únicamente después de validación y acción explícita del usuario; teléfono y email del cliente quedan excluidos.
- La analítica de reservas es un no-op y el build fuerza analytics desactivado.

## Artefacto

- El ZIP recibido coincidía con el SHA-256 esperado `7bca0b1c1dc13d01ec84fecd6d3a5aa272ed6e2252f20b9153c425b8a925568e` antes de las correcciones.
- ZIP final regenerado: `25.340.269` bytes, 384 archivos.
- SHA-256 final: `b43ef4ff6d395b820067641a15883a174256dfba9b7e16f061e6c87004ae997a`.
- Dos builds consecutivos produjeron el mismo hash final.
- Cero `src/`, `node_modules/`, `.git/`, tests, documentación interna, screenshots, informes Lighthouse, `.env`, source maps, rutas dev publicables, mocks o datos E2E.
- `robots.txt` conserva únicamente la regla defensiva `Disallow: /dev/`; las rutas dev sirven 404 y sus módulos no forman parte del build.

## Evidencia

- `npm ci`: 499 paquetes auditados, 0 vulnerabilidades.
- Unitarias/integración: 82/82.
- E2E: 45 aprobadas, 5 omitidas previstas.
- Axe: 0 violaciones en Home/Reserva desktop, móvil y reduced motion.
- Consola/page errors: 0.
- Requests externos inesperados antes de acción del usuario: 0.
- Bundle inicial: 183.835 bytes (`179,53 KiB`) de un presupuesto de 500 KiB.
- Lighthouse Home: `84/100/100/100`, LCP `4.139 ms`, CLS `0`.
- Lighthouse Reserva: `88/100/100/100`, LCP `3.693 ms`, CLS `0`.
- Canonical: `https://malcriadobcn.com/` y `https://malcriadobcn.com/reservar/`.
- Dev routes: 404 en producción.

## SiteGround

`.htaccess` incluye canonical HTTPS/sin `www`, exclusión de archivos/directorios existentes, fallback SPA y headers defensivos compatibles con módulos opcionales de Apache. Backup, despliegue, rollback y smoke tienen instrucciones ejecutables, pero el backup no se presenta como realizado. No se modificó SiteGround, DNS ni producción durante esta revisión.
