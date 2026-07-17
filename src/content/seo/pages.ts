import type { LocalSeoPage } from "../../types/content";
import { contentSources } from "../shared/sources";

export const seoPages: Record<string, LocalSeoPage> = {
  home: {
    pageId: "home",
    metadata: {
      id: "seo-home",
      path: "/",
      title: "Malcriado | Cocina fusion frente al mar en Pineda de Mar",
      description:
        "Restaurante de cocina fusion latinoamericana y mediterranea frente al mar en Pineda de Mar.",
      canonicalPath: "/",
      robots: "index, follow",
      primaryKeyword: "restaurante de cocina fusion en Pineda de Mar",
      intent: "informational",
      entities: ["Malcriado", "Pineda de Mar", "cocina fusion"],
      openGraph: {
        title: "Malcriado | Cocina fusion frente al mar en Pineda de Mar",
        description:
          "Restaurante de cocina fusion latinoamericana y mediterranea frente al mar en Pineda de Mar.",
        type: "website",
        imageAssetId: "asset-019",
      },
      structuredData: {
        type: "Restaurant",
        includeMenu: false,
        includeOffers: false,
      },
      validationStatus: "VERIFIED",
      references: {
        sourceIds: [contentSources.siteHome.id, contentSources.contentInventory.id],
      },
    },
  },
  menu: {
    pageId: "menu",
    metadata: {
      id: "seo-menu",
      path: "/menu/",
      title: "Carta | Malcriado",
      description:
        "Carta HTML de Malcriado con categorias reales auditadas y estados explicitos para precios y alergenos pendientes.",
      canonicalPath: "/menu/",
      robots: "index, follow",
      primaryKeyword: "carta malcriado pineda de mar",
      intent: "informational",
      entities: ["Malcriado", "Carta", "Pineda de Mar"],
      openGraph: {
        title: "Carta | Malcriado",
        description:
          "Carta HTML de Malcriado con categorias reales auditadas y estados explicitos para precios y alergenos pendientes.",
        type: "website",
        imageAssetId: "asset-024",
      },
      structuredData: {
        type: "Restaurant",
        includeMenu: true,
        includeOffers: false,
      },
      validationStatus: "VERIFIED",
      references: {
        sourceIds: [contentSources.siteMenu.id, contentSources.contentInventory.id],
      },
    },
  },
  offers: {
    pageId: "offers",
    metadata: {
      id: "seo-offers",
      path: "/especiales/",
      title: "Especiales | Malcriado",
      description:
        "Estado editorial de especiales y ofertas. No se publican promociones sin vigencia verificada.",
      canonicalPath: "/especiales/",
      robots: "index, follow",
      primaryKeyword: "especiales malcriado",
      intent: "informational",
      entities: ["Malcriado", "Especiales"],
      openGraph: {
        title: "Especiales | Malcriado",
        description:
          "Estado editorial de especiales y ofertas. No se publican promociones sin vigencia verificada.",
        type: "website",
        imageAssetId: "asset-013",
      },
      structuredData: {
        type: "WebPage",
        includeMenu: false,
        includeOffers: true,
      },
      validationStatus: "VERIFIED",
      references: {
        sourceIds: [contentSources.currentSiteAudit.id, contentSources.contentInventory.id],
      },
    },
  },
  story: {
    pageId: "story",
    metadata: {
      id: "seo-story",
      path: "/nosotros/",
      title: "Nosotros | Malcriado",
      description:
        "Historia, propuesta culinaria y relato editorial de Malcriado a partir del contenido publico auditado.",
      canonicalPath: "/nosotros/",
      robots: "index, follow",
      primaryKeyword: "historia malcriado",
      intent: "informational",
      entities: ["Malcriado", "Héctor", "Pineda de Mar"],
      openGraph: {
        title: "Nosotros | Malcriado",
        description:
          "Historia, propuesta culinaria y relato editorial de Malcriado a partir del contenido publico auditado.",
        type: "website",
        imageAssetId: "asset-026",
      },
      structuredData: {
        type: "WebPage",
        includeMenu: false,
        includeOffers: false,
      },
      validationStatus: "VERIFIED",
      references: {
        sourceIds: [contentSources.siteNosotros.id, contentSources.contentInventory.id],
      },
    },
  },
  booking: {
    pageId: "booking",
    metadata: {
      id: "seo-booking",
      path: "/reservar/",
      title: "Reservar | Malcriado",
      description:
        "Solicitud de reserva de Malcriado con confirmacion manual y canales alternativos verificados.",
      canonicalPath: "/reservar/",
      robots: "index, follow",
      primaryKeyword: "reservar malcriado",
      intent: "transactional",
      entities: ["Malcriado", "Reserva"],
      openGraph: {
        title: "Reservar | Malcriado",
        description:
          "Solicitud de reserva de Malcriado con confirmacion manual y canales alternativos verificados.",
        type: "website",
        imageAssetId: "asset-019",
      },
      structuredData: {
        type: "Restaurant",
        includeMenu: false,
        includeOffers: false,
      },
      validationStatus: "VERIFIED",
      references: {
        sourceIds: [contentSources.currentSiteAudit.id, contentSources.siteContacto.id],
      },
    },
  },
  contact: {
    pageId: "contact",
    metadata: {
      id: "seo-contact",
      path: "/contacto/",
      title: "Contacto | Malcriado",
      description:
        "Direccion, telefono, email y estado de horario de Malcriado en Pineda de Mar.",
      canonicalPath: "/contacto/",
      robots: "index, follow",
      primaryKeyword: "contacto malcriado pineda de mar",
      intent: "navigational",
      entities: ["Malcriado", "Pineda de Mar", "Contacto"],
      openGraph: {
        title: "Contacto | Malcriado",
        description:
          "Direccion, telefono, email y estado de horario de Malcriado en Pineda de Mar.",
        type: "website",
        imageAssetId: "asset-019",
      },
      structuredData: {
        type: "Restaurant",
        includeMenu: false,
        includeOffers: false,
      },
      validationStatus: "VERIFIED",
      references: {
        sourceIds: [contentSources.siteContacto.id, contentSources.contentInventory.id],
      },
    },
  },
  legalAviso: {
    pageId: "legal-aviso",
    metadata: {
      id: "seo-legal-aviso",
      path: "/aviso-legal/",
      title: "Aviso legal | Malcriado",
      description: "Aviso legal de Malcriado en estado pendiente de validacion juridica.",
      canonicalPath: "/aviso-legal/",
      robots: "index, follow",
      primaryKeyword: "aviso legal malcriado",
      intent: "informational",
      entities: ["Malcriado", "Aviso legal"],
      openGraph: {
        title: "Aviso legal | Malcriado",
        description: "Aviso legal de Malcriado en estado pendiente de validacion juridica.",
        type: "website",
        imageAssetId: null,
      },
      structuredData: {
        type: "WebPage",
        includeMenu: false,
        includeOffers: false,
      },
      validationStatus: "VERIFIED",
      references: { sourceIds: [contentSources.siteAvisoLegal.id] },
    },
  },
  legalPrivacidad: {
    pageId: "legal-privacidad",
    metadata: {
      id: "seo-legal-privacidad",
      path: "/privacidad/",
      title: "Privacidad | Malcriado",
      description: "Politica de privacidad de Malcriado en estado pendiente de validacion.",
      canonicalPath: "/privacidad/",
      robots: "index, follow",
      primaryKeyword: "privacidad malcriado",
      intent: "informational",
      entities: ["Malcriado", "Privacidad"],
      openGraph: {
        title: "Privacidad | Malcriado",
        description: "Politica de privacidad de Malcriado en estado pendiente de validacion.",
        type: "website",
        imageAssetId: null,
      },
      structuredData: {
        type: "WebPage",
        includeMenu: false,
        includeOffers: false,
      },
      validationStatus: "VERIFIED",
      references: { sourceIds: [contentSources.sitePrivacidad.id] },
    },
  },
  legalCookies: {
    pageId: "legal-cookies",
    metadata: {
      id: "seo-legal-cookies",
      path: "/cookies/",
      title: "Cookies | Malcriado",
      description: "Politica de cookies de Malcriado en espera de inventario real de terceros.",
      canonicalPath: "/cookies/",
      robots: "index, follow",
      primaryKeyword: "cookies malcriado",
      intent: "informational",
      entities: ["Malcriado", "Cookies"],
      openGraph: {
        title: "Cookies | Malcriado",
        description: "Politica de cookies de Malcriado en espera de inventario real de terceros.",
        type: "website",
        imageAssetId: null,
      },
      structuredData: {
        type: "WebPage",
        includeMenu: false,
        includeOffers: false,
      },
      validationStatus: "VERIFIED",
      references: { sourceIds: [contentSources.siteCookies.id] },
    },
  },
  notFound: {
    pageId: "not-found",
    metadata: {
      id: "seo-not-found",
      path: "/404",
      title: "404 | Malcriado",
      description: "La ruta solicitada no existe.",
      canonicalPath: "/404",
      robots: "noindex, nofollow",
      primaryKeyword: "404 malcriado",
      intent: "navigational",
      entities: ["Malcriado", "404"],
      openGraph: {
        title: "404 | Malcriado",
        description: "La ruta solicitada no existe.",
        type: "website",
        imageAssetId: null,
      },
      structuredData: {
        type: "WebPage",
        includeMenu: false,
        includeOffers: false,
      },
      validationStatus: "VERIFIED",
      references: { sourceIds: [contentSources.currentSiteAudit.id] },
    },
  },
  devAssets: {
    pageId: "dev-assets",
    metadata: {
      id: "seo-dev-assets",
      path: "/dev/assets/",
      title: "Dev Assets | Malcriado",
      description: "Catalogo interno de assets optimizados y originales para direccion artistica.",
      canonicalPath: "/dev/assets/",
      robots: "noindex, nofollow",
      primaryKeyword: "dev assets malcriado",
      intent: "informational",
      entities: ["Malcriado", "Assets"],
      openGraph: {
        title: "Dev Assets | Malcriado",
        description: "Catalogo interno de assets optimizados y originales para direccion artistica.",
        type: "website",
        imageAssetId: null,
      },
      structuredData: {
        type: "WebPage",
        includeMenu: false,
        includeOffers: false,
      },
      validationStatus: "VERIFIED",
      references: { sourceIds: [contentSources.assetManifest.id] },
    },
  },
  devContent: {
    pageId: "dev-content",
    metadata: {
      id: "seo-dev-content",
      path: "/dev/content/",
      title: "Dev Content | Malcriado",
      description: "Panel interno de auditoria editorial, fuentes y estados de validacion.",
      canonicalPath: "/dev/content/",
      robots: "noindex, nofollow",
      primaryKeyword: "dev content malcriado",
      intent: "informational",
      entities: ["Malcriado", "Content"],
      openGraph: {
        title: "Dev Content | Malcriado",
        description: "Panel interno de auditoria editorial, fuentes y estados de validacion.",
        type: "website",
        imageAssetId: null,
      },
      structuredData: {
        type: "WebPage",
        includeMenu: false,
        includeOffers: false,
      },
      validationStatus: "VERIFIED",
      references: { sourceIds: [contentSources.contentInventory.id] },
    },
  },
};

export function getSeoPageByPath(path: string) {
  return Object.values(seoPages).find((page) => page.metadata.path === path) ?? null;
}
