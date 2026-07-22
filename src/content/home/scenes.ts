import type { HomeScene } from "../../types/content";
import { contentSources } from "../shared/sources";

export const homeScenes: readonly HomeScene[] = [
  {
    id: "scene-preloader",
    slug: "preloader",
    purpose: "Presentar identidad y preparar el arranque editorial.",
    content: {
      eyebrow: "Identidad",
      heading: "Malcriado",
      copy: "La experiencia empieza en la marca, el producto y la reserva.",
    },
    media: [],
    ctas: [],
    theme: "identity",
    motionIntent: "reveal",
    editorialStatus: "VERIFIED",
    mobileVariant: null,
    references: {
      sourceIds: [
        contentSources.siteHome.id,
        contentSources.currentSiteAudit.id,
      ],
    },
  },
  {
    id: "scene-hero",
    slug: "hero",
    purpose: "Fijar propuesta, ubicacion y reserva desde el primer viewport.",
    content: {
      eyebrow: "Pineda de Mar · Frente al mar",
      heading: "Cocina fusion latinoamericana y mediterranea frente al mar.",
      copy: "Sabores latinos y mediterraneos, cocteles y una ubicacion frente al mar para comer, cenar o reservar con tiempo.",
    },
    media: [{ assetId: "asset-019", crop: "landscape", status: "VERIFIED" }],
    ctas: [{ label: "Reservar", href: "/reservar/", status: "VERIFIED" }],
    theme: "hero",
    motionIntent: "reveal",
    editorialStatus: "VERIFIED",
    mobileVariant: {
      eyebrow: "Pineda de Mar",
      heading: "Fusion frente al mar.",
      copy: "Sabores, mar y una reserva facil desde el primer gesto.",
    },
    references: {
      sourceIds: [
        contentSources.siteHome.id,
        contentSources.contentInventory.id,
      ],
    },
  },
  {
    id: "scene-special",
    slug: "especial-activo",
    purpose:
      "Reservar espacio para el especial activo cuando existan datos verificados.",
    content: {
      eyebrow: "Especial activo",
      heading: null,
      copy: "Si hoy no hay una promocion activa publicada, la carta y la reserva siguen siendo el centro de la experiencia.",
    },
    media: [],
    ctas: [
      { label: "Ver especiales", href: "/especiales/", status: "VERIFIED" },
    ],
    theme: "special",
    motionIntent: "booking-focus",
    editorialStatus: "PENDING_CONTENT",
    mobileVariant: null,
    references: {
      sourceIds: [
        contentSources.currentSiteAudit.id,
        contentSources.contentInventory.id,
      ],
    },
  },
  {
    id: "scene-fusion",
    slug: "declaracion-de-fusion",
    purpose: "Explicar la propuesta culinaria en clave editorial.",
    content: {
      eyebrow: "Fusion",
      heading: "Latinoamerica y Mediterraneo en la misma experiencia.",
      copy: "Una carta que mezcla platos latinos, mediterraneos y una forma de comer pensada para compartir junto al mar.",
    },
    media: [{ assetId: "asset-026", crop: "portrait", status: "VERIFIED" }],
    ctas: [],
    theme: "fusion",
    motionIntent: "layered",
    editorialStatus: "VERIFIED",
    mobileVariant: null,
    references: {
      sourceIds: [
        contentSources.siteHome.id,
        contentSources.siteMenu.id,
        contentSources.siteNosotros.id,
      ],
    },
  },
  {
    id: "scene-signature-dishes",
    slug: "platos-insignia",
    purpose: "Destacar platos y activos visuales ya auditados.",
    content: {
      eyebrow: "Platos insignia",
      heading: "Pulpo, nachos, pizzas y atun entre los platos mas buscados.",
      copy: "Una seleccion pensada para abrir boca, pasar a la carta y terminar en reserva.",
    },
    media: [
      { assetId: "asset-017", crop: "portrait", status: "VERIFIED" },
      { assetId: "asset-018", crop: "portrait", status: "VERIFIED" },
      { assetId: "asset-026", crop: "portrait", status: "VERIFIED" },
    ],
    ctas: [{ label: "Ver carta", href: "/menu/", status: "VERIFIED" }],
    theme: "featured-dishes",
    motionIntent: "horizontal-gallery",
    editorialStatus: "VERIFIED",
    mobileVariant: null,
    references: {
      sourceIds: [contentSources.siteMenu.id, contentSources.assetManifest.id],
    },
  },
  {
    id: "scene-coast",
    slug: "frente-al-mar",
    purpose: "Dar contexto local y emocional al restaurante.",
    content: {
      eyebrow: "Costa",
      heading: "Mesa, mar y Pineda de Mar como parte del relato.",
      copy: "Comer junto al mar forma parte de la experiencia y del ritmo con el que se vive Malcriado en Pineda de Mar.",
    },
    media: [{ assetId: "asset-019", crop: "landscape", status: "VERIFIED" }],
    ctas: [],
    theme: "coast",
    motionIntent: "quiet-reading",
    editorialStatus: "VERIFIED",
    mobileVariant: null,
    references: {
      sourceIds: [contentSources.siteHome.id, contentSources.siteNosotros.id],
    },
  },
  {
    id: "scene-night",
    slug: "cocteles-y-noche",
    purpose: "Subir energia visual sin inventar eventos ni promociones.",
    content: {
      eyebrow: "Cocteles y noche",
      heading: "Mojitos, margaritas y energia nocturna.",
      copy: "Cocteles, sobremesa larga y una carta pensada para seguir la noche frente al mar.",
    },
    media: [{ assetId: "asset-013", crop: "portrait", status: "VERIFIED" }],
    ctas: [{ label: "Ver bebidas", href: "/menu/", status: "VERIFIED" }],
    theme: "night",
    motionIntent: "layered",
    editorialStatus: "VERIFIED",
    mobileVariant: null,
    references: {
      sourceIds: [contentSources.siteMenu.id, contentSources.assetManifest.id],
    },
  },
  {
    id: "scene-story",
    slug: "historia",
    purpose:
      "Humanizar la marca con contenido verificable del chef y el origen.",
    content: {
      eyebrow: "Historia",
      heading:
        "Malcriado mezcla culturas y presenta a Hector al frente de la cocina visible.",
      copy: "La propuesta combina identidad propia, cocina de fusion y una experiencia pensada para reservar y volver.",
    },
    media: [],
    ctas: [{ label: "Conocer mas", href: "/nosotros/", status: "VERIFIED" }],
    theme: "story",
    motionIntent: "quiet-reading",
    editorialStatus: "VERIFIED",
    mobileVariant: null,
    references: {
      sourceIds: [
        contentSources.siteNosotros.id,
        contentSources.contentInventory.id,
      ],
    },
  },
  {
    id: "scene-menu",
    slug: "carta-visual",
    purpose: "Preparar la futura carta visual sin desacoplar la fuente HTML.",
    content: {
      eyebrow: "Carta",
      heading:
        "Platos, bebidas y postres para entrar por la carta y salir con una reserva.",
      copy: "Recorre la carta por categorias y llega al formulario con el plato, la categoria o el plan que te interesa.",
    },
    media: [{ assetId: "asset-024", crop: "square", status: "VERIFIED" }],
    ctas: [{ label: "Explorar carta", href: "/menu/", status: "VERIFIED" }],
    theme: "menu",
    motionIntent: "horizontal-gallery",
    editorialStatus: "VERIFIED",
    mobileVariant: null,
    references: {
      sourceIds: [
        contentSources.siteMenu.id,
        contentSources.contentInventory.id,
      ],
    },
  },
  {
    id: "scene-booking",
    slug: "reserva",
    purpose: "Cerrar el recorrido con una solicitud de reserva honesta.",
    content: {
      eyebrow: "Reserva",
      heading: "Solicitud de reserva, nunca confirmacion automatica.",
      copy: "WhatsApp y formulario siguen siendo canales de solicitud con confirmacion manual.",
    },
    media: [],
    ctas: [
      { label: "Reservar", href: "/reservar/", status: "VERIFIED" },
      {
        label: "WhatsApp",
        href: "https://wa.me/34672695670",
        status: "VERIFIED",
      },
    ],
    theme: "booking",
    motionIntent: "booking-focus",
    editorialStatus: "VERIFIED",
    mobileVariant: null,
    references: {
      sourceIds: [
        contentSources.currentSiteAudit.id,
        contentSources.siteContacto.id,
      ],
    },
  },
  {
    id: "scene-location",
    slug: "ubicacion-y-cierre",
    purpose: "Cerrar con direccion, contacto y horario pendiente de confirmar.",
    content: {
      eyebrow: "Ubicacion",
      heading: "Passeig Maritim, 14, Pineda de Mar.",
      copy: "Direccion, telefono y WhatsApp ya estan listos para ayudarte a reservar. El horario por dia se esta terminando de confirmar.",
    },
    media: [],
    ctas: [{ label: "Ver contacto", href: "/contacto/", status: "VERIFIED" }],
    theme: "location",
    motionIntent: "quiet-reading",
    editorialStatus: "VERIFIED",
    mobileVariant: null,
    references: {
      sourceIds: [
        contentSources.siteContacto.id,
        contentSources.ownerChecklist.id,
      ],
    },
  },
];
