# Home Scene Implementation

Fecha: 2026-07-17
Estado: `implementado en codigo y cerrado con QA local`

## Archivos principales

- `src/pages/HomePage.tsx`
- `src/components/home/HomePreloader.tsx`
- `src/motion/home/useHomePageMotion.ts`
- `src/motion/config/gsap.ts`
- `src/styles/index.css`

## Escenas implementadas

1. `hero`
   - titular multilinea masivo
   - CTA principal de reserva
   - CTA operativo de WhatsApp
   - bloque de direccion / horario / tipo de reserva
   - media editorial con overlay

2. `especial-activo`
   - estado honesto cuando no hay oferta verificable
   - CTA a especiales
   - CTA alternativo a reserva

3. `declaracion-de-fusion`
   - manifiesto editorial
   - statement tipografico de apoyo
   - media vertical de fusion

4. `platos-insignia`
   - rail de platos destacados desde contenido tipado
   - CTA a carta y reserva contextual
   - nota operativa de assets reutilizables

5. `frente-al-mar`
   - escena full-bleed de respiracion
   - CTA de como llegar y contacto

6. `cocteles-y-noche`
   - cambio cromatico y chips de ambiente
   - media vertical

7. `historia`
   - lead de historia
   - perfil del chef visible
   - cards de story blocks

8. `carta-visual`
   - categorias reales desde `menuContent`
   - grid de acceso editorial

9. `reserva`
   - panel estable de conversion
   - copy que evita falsa confirmacion

10. `ubicacion-y-cierre`

- direccion
- contacto
- canales de apoyo

## Motion implementado

- reveal inicial del hero
- reveal por escena con `ScrollTrigger`
- parallax suave en medios marcados con `data-scene-media`
- rail de platos con ligero desplazamiento en desktop
- preloader corto solo en primera visita de sesion
- cambio de `data-theme` del header por escena

## Degradacion aplicada

- en `test` no corre la capa de motion
- en `reduced motion` no se crean reveals ni parallax
- el contenido sigue renderizado en HTML completo
- no hay pinning largo ni dependencia de video

## Pendiente de la siguiente iteracion

- pasada humana con lector de pantalla real
- validacion editorial y legal de contenido pendiente
- posibles iteraciones de video cuando exista origen utilizable
