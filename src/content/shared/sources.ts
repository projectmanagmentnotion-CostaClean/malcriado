import type { ContentSource } from "../../types/content";

export const contentSources = {
  siteHome: {
    id: "site-home",
    label: "malcriadobcn.com home",
    kind: "website",
    url: "https://malcriadobcn.com/",
    owner: "Malcriado",
    notes: "Public home page audited in Phase 0.",
  },
  siteMenu: {
    id: "site-menu",
    label: "malcriadobcn.com menu",
    kind: "website",
    url: "https://malcriadobcn.com/menu/",
    owner: "Malcriado",
    notes: "Menu page audited in Phase 0 and summarized in content inventory.",
  },
  siteNosotros: {
    id: "site-nosotros",
    label: "malcriadobcn.com nosotros",
    kind: "website",
    url: "https://malcriadobcn.com/nosotros/",
    owner: "Malcriado",
    notes: "About page audited in Phase 0.",
  },
  siteContacto: {
    id: "site-contacto",
    label: "malcriadobcn.com contacto",
    kind: "website",
    url: "https://malcriadobcn.com/contacto/",
    owner: "Malcriado",
    notes: "Contact page audited in Phase 0.",
  },
  siteAvisoLegal: {
    id: "site-aviso-legal",
    label: "malcriadobcn.com aviso legal",
    kind: "website",
    url: "https://malcriadobcn.com/aviso-legal/",
    owner: "Malcriado",
    notes: "Legal page audited in Phase 0.",
  },
  sitePrivacidad: {
    id: "site-privacidad",
    label: "malcriadobcn.com declaracion de privacidad",
    kind: "website",
    url: "https://malcriadobcn.com/declaracion-de-privacidad/",
    owner: "Malcriado",
    notes: "Privacy page audited in Phase 0.",
  },
  siteCookies: {
    id: "site-cookies",
    label: "malcriadobcn.com politica de cookies",
    kind: "website",
    url: "https://malcriadobcn.com/politica-de-cookies/",
    owner: "Malcriado",
    notes: "Cookies page audited in Phase 0.",
  },
  siteDisclaimer: {
    id: "site-disclaimer",
    label: "malcriadobcn.com descargo de responsabilidad",
    kind: "website",
    url: "https://malcriadobcn.com/descargo-de-responsabilidad/",
    owner: "Malcriado",
    notes: "Disclaimer page audited in Phase 0.",
  },
  currentSiteAudit: {
    id: "doc-current-site-audit",
    label: "Current Site Audit",
    kind: "document",
    url: null,
    owner: "Codex",
    notes: "docs/audit/CURRENT_SITE_AUDIT.md",
  },
  contentInventory: {
    id: "doc-content-inventory",
    label: "Content Inventory",
    kind: "document",
    url: null,
    owner: "Codex",
    notes: "docs/content/CONTENT_INVENTORY.md",
  },
  ownerChecklist: {
    id: "doc-owner-checklist",
    label: "Owner Validation Checklist",
    kind: "document",
    url: null,
    owner: "Codex",
    notes: "docs/content/OWNER_VALIDATION_CHECKLIST.md",
  },
  assetManifest: {
    id: "doc-asset-manifest",
    label: "Asset Manifest",
    kind: "document",
    url: null,
    owner: "Codex",
    notes: "docs/assets/ASSET_MANIFEST.md",
  },
  ownerAnderson: {
    id: "owner-anderson",
    label: "Anderson",
    kind: "owner",
    url: null,
    owner: "Malcriado",
    notes: "Expected approver for prices, allergens, hours, legal and rights confirmations.",
  },
} as const satisfies Record<string, ContentSource>;

export const contentSourceList = Object.values(contentSources);

export function getContentSource(sourceId: string) {
  const source = contentSourceList.find((entry) => entry.id === sourceId);

  if (!source) {
    throw new Error(`Unknown content source: ${sourceId}`);
  }

  return source;
}
