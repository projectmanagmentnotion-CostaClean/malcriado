# Checklist de entrega al titular

## Identidad y legal

- [ ] razon social o nombre completo del titular
- [ ] NIF/CIF
- [ ] domicilio legal
- [ ] responsable del tratamiento
- [ ] email formal para derechos RGPD
- [ ] proveedor de hosting y encargados
- [ ] plazo de conservacion de solicitudes
- [ ] revision juridica de aviso, privacidad y cookies

## Operacion

- [ ] validar horario por dia, festivos y cierres excepcionales
- [ ] aprobar cada precio e IVA aplicable
- [ ] aprobar nombre, descripcion y disponibilidad de cada producto
- [ ] completar alergenos a partir de recetas y fichas tecnicas
- [ ] documentar contaminacion cruzada y protocolo del personal
- [ ] elegir zonas, aforo, antelacion y ventana maxima de reserva

## Reservas

- [ ] crear proyecto Supabase y credenciales server-side
- [ ] configurar SMTP y destinatarios
- [ ] aprobar retencion y proceso de borrado
- [ ] probar confirmacion, rechazo y cancelacion por el equipo
- [ ] verificar fallback WhatsApp/correo en moviles reales

## Lanzamiento

- [ ] confirmar CI remoto verde por separado: quality, E2E y Lighthouse
- [ ] revisar artefactos Lighthouse y CWV de staging
- [ ] aprobar staging y QA humano
- [ ] validar NVDA/VoiceOver
- [ ] validar iOS Safari, Android Chrome, Firefox y Edge
- [ ] aprobar backup y rollback
- [ ] dar GO expreso antes de tocar `malcriadobcn.com`
