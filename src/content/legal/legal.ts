import type { LegalPageContent } from "../../types/content";
import { contentSources } from "../shared/sources";

export const legalPages: readonly LegalPageContent[] = [
  {
    id: "legal-aviso",
    title: "Aviso legal",
    path: "/aviso-legal/",
    summary:
      "Base legal pendiente de completar con razon social, NIF/CIF y domicilio legal.",
    body: null,
    status: "PENDING_VALIDATION",
    references: {
      sourceIds: [
        contentSources.siteAvisoLegal.id,
        contentSources.ownerChecklist.id,
      ],
    },
  },
  {
    id: "legal-privacidad",
    title: "Privacidad",
    path: "/privacidad/",
    summary:
      "La politica actual es generica y debe rehacerse sobre tratamientos reales.",
    body: null,
    status: "PENDING_VALIDATION",
    references: {
      sourceIds: [
        contentSources.sitePrivacidad.id,
        contentSources.ownerChecklist.id,
      ],
    },
  },
  {
    id: "legal-cookies",
    title: "Cookies",
    path: "/cookies/",
    summary:
      "No existe inventario final de cookies ni de terceros verificados.",
    body: null,
    status: "PENDING_VALIDATION",
    references: {
      sourceIds: [
        contentSources.siteCookies.id,
        contentSources.ownerChecklist.id,
      ],
    },
  },
];

export function getLegalPageByPath(path: string) {
  return legalPages.find((page) => page.path === path) ?? null;
}
