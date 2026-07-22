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
      language: "es",
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
      twitter: {
        card: "summary_large_image",
        title: "Malcriado | Cocina fusion frente al mar en Pineda de Mar",
        description:
          "Restaurante de cocina fusion latinoamericana y mediterranea frente al mar en Pineda de Mar.",
        imageAssetId: "asset-019",
      },
      structuredData: {
        type: "Restaurant",
        includeMenu: false,
        includeOffers: false,
        includeBreadcrumbs: false,
      },
      breadcrumbLabel: "Inicio",
      validationStatus: "VERIFIED",
      references: {
        sourceIds: [
          contentSources.siteHome.id,
          contentSources.contentInventory.id,
        ],
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
        "Carta en HTML de Malcriado con platos, bebidas y postres para consultar antes de reservar en Pineda de Mar.",
      canonicalPath: "/menu/",
      robots: "index, follow",
      language: "es",
      primaryKeyword: "carta malcriado pineda de mar",
      intent: "informational",
      entities: ["Malcriado", "Carta", "Pineda de Mar"],
      openGraph: {
        title: "Carta | Malcriado",
        description:
          "Carta en HTML de Malcriado con platos, bebidas y postres para consultar antes de reservar en Pineda de Mar.",
        type: "website",
        imageAssetId: "asset-024",
      },
      twitter: {
        card: "summary_large_image",
        title: "Carta | Malcriado",
        description:
          "Carta en HTML de Malcriado con platos, bebidas y postres para consultar antes de reservar en Pineda de Mar.",
        imageAssetId: "asset-024",
      },
      structuredData: {
        type: "WebPage",
        includeMenu: true,
        includeOffers: false,
      },
      breadcrumbLabel: "Carta",
      validationStatus: "VERIFIED",
      references: {
        sourceIds: [
          contentSources.siteMenu.id,
          contentSources.contentInventory.id,
        ],
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
        "Especiales y promociones de Malcriado. Solo se muestran ofertas activas con fechas claras.",
      canonicalPath: "/especiales/",
      robots: "index, follow",
      language: "es",
      primaryKeyword: "especiales malcriado",
      intent: "informational",
      entities: ["Malcriado", "Especiales"],
      openGraph: {
        title: "Especiales | Malcriado",
        description:
          "Especiales y promociones de Malcriado. Solo se muestran ofertas activas con fechas claras.",
        type: "website",
        imageAssetId: "asset-013",
      },
      twitter: {
        card: "summary_large_image",
        title: "Especiales | Malcriado",
        description:
          "Especiales y promociones de Malcriado. Solo se muestran ofertas activas con fechas claras.",
        imageAssetId: "asset-013",
      },
      structuredData: {
        type: "WebPage",
        includeMenu: false,
        includeOffers: true,
      },
      breadcrumbLabel: "Especiales",
      validationStatus: "VERIFIED",
      references: {
        sourceIds: [
          contentSources.currentSiteAudit.id,
          contentSources.contentInventory.id,
        ],
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
        "Historia, cocina de fusion y propuesta de Malcriado frente al mar en Pineda de Mar.",
      canonicalPath: "/nosotros/",
      robots: "index, follow",
      language: "es",
      primaryKeyword: "historia malcriado",
      intent: "informational",
      entities: ["Malcriado", "Hector", "Pineda de Mar"],
      openGraph: {
        title: "Nosotros | Malcriado",
        description:
          "Historia, cocina de fusion y propuesta de Malcriado frente al mar en Pineda de Mar.",
        type: "website",
        imageAssetId: "asset-026",
      },
      twitter: {
        card: "summary_large_image",
        title: "Nosotros | Malcriado",
        description:
          "Historia, cocina de fusion y propuesta de Malcriado frente al mar en Pineda de Mar.",
        imageAssetId: "asset-026",
      },
      structuredData: {
        type: "AboutPage",
        includeMenu: false,
        includeOffers: false,
      },
      breadcrumbLabel: "Nosotros",
      validationStatus: "VERIFIED",
      references: {
        sourceIds: [
          contentSources.siteNosotros.id,
          contentSources.contentInventory.id,
        ],
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
        "Solicitud de reserva en Malcriado con confirmacion manual, telefono y WhatsApp como apoyo.",
      canonicalPath: "/reservar/",
      robots: "index, follow",
      language: "es",
      primaryKeyword: "reservar malcriado",
      intent: "transactional",
      entities: ["Malcriado", "Reserva"],
      openGraph: {
        title: "Reservar | Malcriado",
        description:
          "Solicitud de reserva en Malcriado con confirmacion manual, telefono y WhatsApp como apoyo.",
        type: "website",
        imageAssetId: "asset-019",
      },
      twitter: {
        card: "summary_large_image",
        title: "Reservar | Malcriado",
        description:
          "Solicitud de reserva en Malcriado con confirmacion manual, telefono y WhatsApp como apoyo.",
        imageAssetId: "asset-019",
      },
      structuredData: {
        type: "WebPage",
        includeMenu: false,
        includeOffers: false,
      },
      breadcrumbLabel: "Reservar",
      validationStatus: "VERIFIED",
      references: {
        sourceIds: [
          contentSources.currentSiteAudit.id,
          contentSources.siteContacto.id,
        ],
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
      language: "es",
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
      twitter: {
        card: "summary_large_image",
        title: "Contacto | Malcriado",
        description:
          "Direccion, telefono, email y estado de horario de Malcriado en Pineda de Mar.",
        imageAssetId: "asset-019",
      },
      structuredData: {
        type: "ContactPage",
        includeMenu: false,
        includeOffers: false,
      },
      breadcrumbLabel: "Contacto",
      validationStatus: "VERIFIED",
      references: {
        sourceIds: [
          contentSources.siteContacto.id,
          contentSources.contentInventory.id,
        ],
      },
    },
  },
  faq: {
    pageId: "faq",
    metadata: {
      id: "seo-faq",
      path: "/faq/",
      title: "FAQ | Malcriado",
      description:
        "Preguntas frecuentes visibles de Malcriado sobre cocina, reserva, ubicacion, carta y consentimiento.",
      canonicalPath: "/faq/",
      robots: "index, follow",
      language: "es",
      primaryKeyword: "faq malcriado",
      intent: "informational",
      entities: ["Malcriado", "FAQ", "Reserva", "Pineda de Mar"],
      openGraph: {
        title: "FAQ | Malcriado",
        description:
          "Preguntas frecuentes visibles de Malcriado sobre cocina, reserva, ubicacion, carta y consentimiento.",
        type: "website",
        imageAssetId: "asset-019",
      },
      twitter: {
        card: "summary_large_image",
        title: "FAQ | Malcriado",
        description:
          "Preguntas frecuentes visibles de Malcriado sobre cocina, reserva, ubicacion, carta y consentimiento.",
        imageAssetId: "asset-019",
      },
      structuredData: {
        type: "WebPage",
        includeMenu: false,
        includeOffers: false,
        includeFaq: true,
      },
      breadcrumbLabel: "FAQ",
      validationStatus: "VERIFIED",
      references: {
        sourceIds: [
          contentSources.siteHome.id,
          contentSources.siteContacto.id,
          contentSources.currentSiteAudit.id,
        ],
      },
    },
  },
  legalAviso: {
    pageId: "legal-aviso",
    metadata: {
      id: "seo-legal-aviso",
      path: "/aviso-legal/",
      title: "Aviso legal | Malcriado",
      description:
        "Aviso legal informativo de Malcriado mientras se completa la revision final con el titular.",
      canonicalPath: "/aviso-legal/",
      robots: "noindex, follow",
      language: "es",
      primaryKeyword: "aviso legal malcriado",
      intent: "informational",
      entities: ["Malcriado", "Aviso legal"],
      openGraph: {
        title: "Aviso legal | Malcriado",
        description:
          "Aviso legal informativo de Malcriado mientras se completa la revision final con el titular.",
        type: "website",
        imageAssetId: null,
      },
      structuredData: {
        type: "WebPage",
        includeMenu: false,
        includeOffers: false,
      },
      breadcrumbLabel: "Aviso legal",
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
      description:
        "Politica de privacidad informativa de Malcriado sobre el funcionamiento actual de la web.",
      canonicalPath: "/privacidad/",
      robots: "noindex, follow",
      language: "es",
      primaryKeyword: "privacidad malcriado",
      intent: "informational",
      entities: ["Malcriado", "Privacidad"],
      openGraph: {
        title: "Privacidad | Malcriado",
        description:
          "Politica de privacidad informativa de Malcriado sobre el funcionamiento actual de la web.",
        type: "website",
        imageAssetId: null,
      },
      structuredData: {
        type: "WebPage",
        includeMenu: false,
        includeOffers: false,
      },
      breadcrumbLabel: "Privacidad",
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
      description:
        "Politica de cookies de Malcriado en espera de inventario real de terceros.",
      canonicalPath: "/cookies/",
      robots: "noindex, follow",
      language: "es",
      primaryKeyword: "cookies malcriado",
      intent: "informational",
      entities: ["Malcriado", "Cookies"],
      openGraph: {
        title: "Cookies | Malcriado",
        description:
          "Politica de cookies de Malcriado en espera de inventario real de terceros.",
        type: "website",
        imageAssetId: null,
      },
      structuredData: {
        type: "WebPage",
        includeMenu: false,
        includeOffers: false,
      },
      breadcrumbLabel: "Cookies",
      validationStatus: "VERIFIED",
      references: { sourceIds: [contentSources.siteCookies.id] },
    },
  },
  accessibility: {
    pageId: "legal-accessibility",
    metadata: {
      id: "seo-legal-accessibility",
      path: "/declaracion-de-accesibilidad/",
      title: "Declaracion de accesibilidad | Malcriado",
      description:
        "Declaracion de accesibilidad de Malcriado con el estado tecnico actual y las mejoras en curso.",
      canonicalPath: "/declaracion-de-accesibilidad/",
      robots: "noindex, follow",
      language: "es",
      primaryKeyword: "declaracion de accesibilidad malcriado",
      intent: "informational",
      entities: ["Malcriado", "Accesibilidad"],
      openGraph: {
        title: "Declaracion de accesibilidad | Malcriado",
        description:
          "Declaracion de accesibilidad de Malcriado con el estado tecnico actual y las mejoras en curso.",
        type: "website",
        imageAssetId: null,
      },
      structuredData: {
        type: "WebPage",
        includeMenu: false,
        includeOffers: false,
      },
      breadcrumbLabel: "Accesibilidad",
      validationStatus: "VERIFIED",
      references: { sourceIds: [contentSources.ownerChecklist.id] },
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
      language: "es",
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
      breadcrumbLabel: "404",
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
      description:
        "Catalogo interno de assets optimizados y originales para direccion artistica.",
      canonicalPath: "/dev/assets/",
      robots: "noindex, nofollow",
      language: "es",
      primaryKeyword: "dev assets malcriado",
      intent: "informational",
      entities: ["Malcriado", "Assets"],
      openGraph: {
        title: "Dev Assets | Malcriado",
        description:
          "Catalogo interno de assets optimizados y originales para direccion artistica.",
        type: "website",
        imageAssetId: null,
      },
      structuredData: {
        type: "WebPage",
        includeMenu: false,
        includeOffers: false,
        includeBreadcrumbs: false,
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
      description:
        "Panel interno de auditoria editorial, fuentes y estados de validacion.",
      canonicalPath: "/dev/content/",
      robots: "noindex, nofollow",
      language: "es",
      primaryKeyword: "dev content malcriado",
      intent: "informational",
      entities: ["Malcriado", "Content"],
      openGraph: {
        title: "Dev Content | Malcriado",
        description:
          "Panel interno de auditoria editorial, fuentes y estados de validacion.",
        type: "website",
        imageAssetId: null,
      },
      structuredData: {
        type: "WebPage",
        includeMenu: false,
        includeOffers: false,
        includeBreadcrumbs: false,
      },
      validationStatus: "VERIFIED",
      references: { sourceIds: [contentSources.contentInventory.id] },
    },
  },
  devDesignSystem: {
    pageId: "dev-design-system",
    metadata: {
      id: "seo-dev-design-system",
      path: "/dev/design-system/",
      title: "Dev Design System | Malcriado",
      description:
        "Catalogo interno del sistema de diseno, tokens, componentes y contraste.",
      canonicalPath: "/dev/design-system/",
      robots: "noindex, nofollow",
      language: "es",
      primaryKeyword: "dev design system malcriado",
      intent: "informational",
      entities: ["Malcriado", "Design System"],
      openGraph: {
        title: "Dev Design System | Malcriado",
        description:
          "Catalogo interno del sistema de diseno, tokens, componentes y contraste.",
        type: "website",
        imageAssetId: null,
      },
      structuredData: {
        type: "WebPage",
        includeMenu: false,
        includeOffers: false,
        includeBreadcrumbs: false,
      },
      validationStatus: "VERIFIED",
      references: {
        sourceIds: [
          contentSources.contentInventory.id,
          contentSources.assetManifest.id,
        ],
      },
    },
  },
};

export function getSeoPageByPath(path: string) {
  return (
    Object.values(seoPages).find((page) => page.metadata.path === path) ?? null
  );
}
