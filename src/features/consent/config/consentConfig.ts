import type {
  ConsentCategoryDefinition,
  ConsentPreferences,
  ThirdPartyService,
} from "../domain/consentTypes";

export const CONSENT_VERSION = "2026-07-21-phase-9";
export const CONSENT_STORAGE_KEY = `malcriado:consent:${CONSENT_VERSION}`;
export const CONSENT_SESSION_KEY = `malcriado:consent:session:${CONSENT_VERSION}`;

export const defaultConsentPreferences: ConsentPreferences = {
  necessary: true,
  analytics: false,
  marketing: false,
  externalMedia: false,
};

export const consentCategories: readonly ConsentCategoryDefinition[] = [
  {
    id: "necessary",
    label: "Necesarias",
    description:
      "Permiten funciones basicas del sitio y el guardado tecnico minimo de preferencias.",
    required: true,
  },
  {
    id: "external_media",
    label: "Contenido externo",
    description:
      "Activa elementos como mapas embebidos de terceros solo despues de una decision explicita.",
    required: false,
  },
  {
    id: "analytics",
    label: "Analitica",
    description:
      "Reservada para futura medicion consentida. No hay analitica activa en esta fase.",
    required: false,
  },
  {
    id: "marketing",
    label: "Marketing",
    description:
      "Reservada para futuros pixels o publicidad. No hay marketing activo en esta fase.",
    required: false,
  },
];

export const thirdPartyServices: readonly ThirdPartyService[] = [
  {
    id: "google-maps-embed",
    name: "Mapa interactivo de ubicacion",
    provider: "Google Maps",
    category: "external_media",
    loadStrategy: "blocked_until_consent",
    implementationStatus: "ACTIVE",
    notes:
      "El iframe solo se monta tras consentimiento valido para contenido externo.",
  },
  {
    id: "future-analytics",
    name: "Analitica pendiente",
    provider: "PENDING_VALIDATION",
    category: "analytics",
    loadStrategy: "not_configured",
    implementationStatus: "PENDING_VALIDATION",
    notes:
      "No existe proveedor activo en frontend. Se mantiene bloqueado hasta validacion del titular.",
  },
  {
    id: "future-marketing",
    name: "Marketing pendiente",
    provider: "PENDING_VALIDATION",
    category: "marketing",
    loadStrategy: "not_configured",
    implementationStatus: "PENDING_VALIDATION",
    notes:
      "No existe pixel ni proveedor activo en frontend. Se mantiene bloqueado hasta validacion del titular.",
  },
];
