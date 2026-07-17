import type { NavigationLink } from "@/types/content";

export const mainNavigation: readonly NavigationLink[] = [
  {
    id: "nav-home",
    label: "Inicio",
    path: "/",
    priority: 1,
    context: "primary",
    behavior: "internal",
    status: "VERIFIED",
  },
  {
    id: "nav-menu",
    label: "Carta",
    path: "/menu/",
    priority: 2,
    context: "primary",
    behavior: "internal",
    status: "VERIFIED",
  },
  {
    id: "nav-offers",
    label: "Especiales",
    path: "/especiales/",
    priority: 3,
    context: "primary",
    behavior: "internal",
    status: "VERIFIED",
  },
  {
    id: "nav-story",
    label: "Nosotros",
    path: "/nosotros/",
    priority: 4,
    context: "primary",
    behavior: "internal",
    status: "VERIFIED",
  },
  {
    id: "nav-booking",
    label: "Reservar",
    path: "/reservar/",
    priority: 5,
    context: "primary",
    behavior: "internal",
    status: "VERIFIED",
  },
];

export const mobileNavigation = mainNavigation.map((link) => ({
  ...link,
  context: "mobile" as const,
}));

export const footerNavigation: readonly NavigationLink[] = [
  ...mainNavigation.map((link) => ({ ...link, context: "footer" as const })),
  {
    id: "nav-contact",
    label: "Contacto",
    path: "/contacto/",
    priority: 6,
    context: "footer",
    behavior: "internal",
    status: "VERIFIED",
  },
];

export const legalNavigation: readonly NavigationLink[] = [
  {
    id: "legal-aviso",
    label: "Aviso legal",
    path: "/aviso-legal/",
    priority: 1,
    context: "legal",
    behavior: "internal",
    status: "VERIFIED",
  },
  {
    id: "legal-privacy",
    label: "Privacidad",
    path: "/privacidad/",
    priority: 2,
    context: "legal",
    behavior: "internal",
    status: "VERIFIED",
  },
  {
    id: "legal-cookies",
    label: "Cookies",
    path: "/cookies/",
    priority: 3,
    context: "legal",
    behavior: "internal",
    status: "VERIFIED",
  },
];

export const legacyNavigation: readonly NavigationLink[] = [
  {
    id: "legacy-privacy",
    label: "Declaracion de privacidad",
    path: "/declaracion-de-privacidad/",
    priority: 1,
    context: "legacy",
    behavior: "internal",
    status: "PENDING_VALIDATION",
  },
  {
    id: "legacy-disclaimer",
    label: "Descargo de responsabilidad",
    path: "/descargo-de-responsabilidad/",
    priority: 2,
    context: "legacy",
    behavior: "internal",
    status: "PENDING_VALIDATION",
  },
];
