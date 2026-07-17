import type {
  BusinessContent,
  BusinessHoursDay,
  VerificationField,
} from "../../types/content";
import { contentSources } from "../shared/sources";

function field<T>(
  value: T | null,
  status: VerificationField<T>["status"],
  sourceIds: readonly string[],
  note?: string,
  expectedFrom?: string,
): VerificationField<T> {
  return {
    value,
    status,
    sourceIds,
    ...(note ? { note } : {}),
    ...(expectedFrom ? { expectedFrom } : {}),
  };
}

const pendingDay = (day: BusinessHoursDay["day"]): BusinessHoursDay => ({
  day,
  opensAt: null,
  closesAt: null,
  status: "PENDING_VALIDATION",
  note: "Current site only exposes one global schedule. Daily hours require owner confirmation.",
});

export const businessContent: BusinessContent = {
  identity: {
    commercialName: field("Malcriado", "VERIFIED", [
      contentSources.siteHome.id,
      contentSources.siteContacto.id,
    ]),
    seoName: field(
      "Malcriado",
      "VERIFIED",
      [contentSources.siteHome.id, contentSources.contentInventory.id],
      "The audited site uses Malcriado consistently as the visible brand.",
    ),
    shortDescription: field(
      "Restaurante de cocina fusion latinoamericana y mediterranea frente al mar en Pineda de Mar.",
      "VERIFIED",
      [contentSources.siteHome.id, contentSources.contentInventory.id],
    ),
    culinaryProposition: field(
      "Cocina fusion latinoamericana y mediterranea frente al mar.",
      "VERIFIED",
      [
        contentSources.siteHome.id,
        contentSources.siteMenu.id,
        contentSources.siteNosotros.id,
      ],
    ),
    currentLanguages: field(["es"], "VERIFIED", [contentSources.currentSiteAudit.id]),
    businessStatus: field("ACTIVE", "VERIFIED", [contentSources.currentSiteAudit.id]),
  },
  location: {
    publicAddress: field(
      "Passeig Maritim, 14, 08397 Pineda de Mar, Barcelona",
      "VERIFIED",
      [
        contentSources.siteHome.id,
        contentSources.siteContacto.id,
        contentSources.contentInventory.id,
      ],
    ),
    locality: field("Pineda de Mar", "VERIFIED", [
      contentSources.siteHome.id,
      contentSources.siteContacto.id,
    ]),
    province: field("Barcelona", "VERIFIED", [
      contentSources.siteHome.id,
      contentSources.siteContacto.id,
    ]),
    country: field("Espana", "VERIFIED", [contentSources.currentSiteAudit.id]),
    postalCode: field("08397", "VERIFIED", [
      contentSources.siteHome.id,
      contentSources.siteContacto.id,
    ]),
    coordinates: field<{ readonly latitude: number; readonly longitude: number }>(
      null,
      "PENDING_VALIDATION",
      [contentSources.ownerChecklist.id],
      "Coordinates were flagged as pending in the owner checklist and must be confirmed before production.",
      contentSources.ownerAnderson.label,
    ),
  },
  contact: {
    phone: field("+34 672 69 56 70", "VERIFIED", [
      contentSources.siteHome.id,
      contentSources.siteContacto.id,
      contentSources.contentInventory.id,
    ]),
    email: field("info@malcriadobcn.com", "VERIFIED", [
      contentSources.siteHome.id,
      contentSources.siteContacto.id,
      contentSources.contentInventory.id,
    ]),
    whatsapp: field("https://wa.me/34672695670", "VERIFIED", [
      contentSources.siteHome.id,
      contentSources.siteContacto.id,
      contentSources.contentInventory.id,
    ]),
    canonicalUrl: field("https://malcriadobcn.com/", "VERIFIED", [
      contentSources.siteHome.id,
      contentSources.currentSiteAudit.id,
    ]),
    socials: [
      {
        id: "instagram",
        label: "Instagram",
        platform: "instagram",
        href: field(
          "https://www.instagram.com/malcriado_pineda",
          "VERIFIED",
          [contentSources.siteHome.id, contentSources.contentInventory.id],
        ),
      },
      {
        id: "whatsapp",
        label: "WhatsApp",
        platform: "whatsapp",
        href: field("https://wa.me/34672695670", "VERIFIED", [
          contentSources.siteHome.id,
          contentSources.siteContacto.id,
        ]),
      },
    ],
  },
  hours: {
    summary: field(
      "Todos los dias 11.00am - 01.00am",
      "PENDING_VALIDATION",
      [contentSources.siteHome.id, contentSources.contentInventory.id],
      "The audited schedule appears only on the home page and is flagged as possibly outdated.",
      contentSources.ownerAnderson.label,
    ),
    timezone: "Europe/Madrid",
    byDay: [
      pendingDay("monday"),
      pendingDay("tuesday"),
      pendingDay("wednesday"),
      pendingDay("thursday"),
      pendingDay("friday"),
      pendingDay("saturday"),
      pendingDay("sunday"),
    ],
  },
  references: {
    sourceIds: [
      contentSources.siteHome.id,
      contentSources.siteContacto.id,
      contentSources.contentInventory.id,
      contentSources.ownerChecklist.id,
    ],
  },
};

export function getReadableAddress() {
  return businessContent.location.publicAddress.value ?? "Direccion pendiente";
}

export function getTelephoneHref() {
  const value = businessContent.contact.phone.value;
  return value ? `tel:${value.replace(/\s+/g, "")}` : null;
}

export function getWhatsappHref() {
  return businessContent.contact.whatsapp.value;
}

export function getEmailHref() {
  const value = businessContent.contact.email.value;
  return value ? `mailto:${value}` : null;
}

export function getFooterBusinessData() {
  return {
    name: businessContent.identity.commercialName.value ?? "Malcriado",
    address: getReadableAddress(),
    phone: businessContent.contact.phone.value,
    email: businessContent.contact.email.value,
  } as const;
}
