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
      copy: "La experiencia arranca desde la marca y no desde un loader ficticio.",
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
      copy: "Propuesta verificada desde la home y la carta auditadas en Fase 0.",
    },
    media: [{ assetId: "asset-019", crop: "landscape", status: "VERIFIED" }],
    ctas: [{ label: "Reservar", href: "/reservar/", status: "VERIFIED" }],
    theme: "hero",
    motionIntent: "reveal",
    editorialStatus: "VERIFIED",
    mobileVariant: {
      eyebrow: "Pineda de Mar",
      heading: "Fusion frente al mar.",
      copy: "Version movil resumida del mensaje principal.",
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
      copy: "No se ha recuperado una oferta vigente verificable; la escena debe renderizar estado pendiente.",
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
      eyebrow: "Fusión",
      heading: "Latinoamerica y Mediterraneo en la misma experiencia.",
      copy: "La fusión culinaria es el claim central repetido en home, menu y nosotros.",
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
      heading: "Pulpo, nachos, pizza y atun como primera seleccion editorial.",
      copy: "La seleccion actual usa solo platos con traza publica y assets aceptados.",
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
      copy: "La experiencia frente al mar esta verificada como posicionamiento y contexto local.",
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
      copy: "La carta recuperada y el manifiesto de assets permiten construir esta escena sin blur ficticio ni ofertas inventadas.",
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
        "Malcriado se presenta como una fusion de culturas con autoria de Héctor.",
      copy: "La biografia ampliada y el nombre completo del chef siguen pendientes de confirmacion.",
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
        "Categorias reales ya recuperadas: calientes, frios, pizzas, cocteles, vinos y postres.",
      copy: "La navegacion futura debe salir del modelo tipado, no de tarjetas hardcodeadas.",
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
      copy: "El horario por dia y las coordenadas siguen pendientes de validacion del titular.",
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
