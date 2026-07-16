import type {
  BusinessIdentity,
  MenuCategory,
  OfferStatus,
} from "@/types/content";
import { PENDING_CONTENT } from "@/types/content";

export const businessIdentity: BusinessIdentity = {
  name: "Malcriado",
  address: "Passeig Maritim, 14, 08397 Pineda de Mar, Barcelona",
  phone: "+34 672 69 56 70",
  email: "info@malcriadobcn.com",
  instagramUrl: "https://www.instagram.com/malcriado_pineda",
  whatsappReservationUrl: "https://wa.me/34672695670",
  openingHours: null,
};

export const temporaryHeroAsset = {
  src: "/assets/source/food/tartar-de-atun.webp",
  alt: "Plato provisional verificado de Malcriado",
  width: 1600,
  height: 900,
};

export const menuCategories: readonly MenuCategory[] = [
  { slug: "entrantes", label: "Entrantes", description: PENDING_CONTENT },
  { slug: "sushi", label: "Sushi", description: PENDING_CONTENT },
  { slug: "principales", label: "Principales", description: PENDING_CONTENT },
  { slug: "cocteles", label: "Cocteles", description: PENDING_CONTENT },
];

export const offerStatus: OfferStatus = {
  type: "pending",
  message: PENDING_CONTENT,
};

export const legalPages = {
  avisoLegal: {
    title: "Aviso legal",
    body: "PENDING_CONTENT",
  },
  privacidad: {
    title: "Privacidad",
    body: "PENDING_CONTENT",
  },
  cookies: {
    title: "Cookies",
    body: "PENDING_CONTENT",
  },
} as const;
