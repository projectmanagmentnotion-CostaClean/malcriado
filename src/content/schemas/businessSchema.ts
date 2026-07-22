import { z } from "zod";
import {
  contentReferenceSchema,
  verificationFieldSchema,
  verificationStatusSchema,
} from "./sharedSchema";

const languageFieldSchema = verificationFieldSchema(
  z.array(z.string().min(2)).min(1),
);
const stringFieldSchema = verificationFieldSchema(z.string().min(1));

const businessHoursDaySchema = z.object({
  day: z.enum([
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ]),
  label: z.string().min(1),
  intervals: z
    .array(
      z.object({
        opensAt: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/),
        closesAt: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/),
      }),
    )
    .max(2),
  status: verificationStatusSchema,
  note: z.string().optional(),
});

export const businessSchema = z.object({
  identity: z.object({
    commercialName: stringFieldSchema,
    seoName: stringFieldSchema,
    shortDescription: stringFieldSchema,
    culinaryProposition: stringFieldSchema,
    currentLanguages: languageFieldSchema,
    businessStatus: verificationFieldSchema(
      z.enum(["ACTIVE", "SEASONAL", "PENDING_OPENING"]),
    ),
  }),
  location: z.object({
    publicAddress: stringFieldSchema,
    locality: stringFieldSchema,
    province: stringFieldSchema,
    country: stringFieldSchema,
    postalCode: stringFieldSchema,
    coordinates: verificationFieldSchema(
      z.object({
        latitude: z.number().finite(),
        longitude: z.number().finite(),
      }),
    ),
  }),
  contact: z.object({
    phone: stringFieldSchema,
    email: verificationFieldSchema(z.string().email()),
    whatsapp: verificationFieldSchema(z.string().url()),
    canonicalUrl: verificationFieldSchema(z.string().url()),
    socials: z.array(
      z.object({
        id: z.string().min(1),
        label: z.string().min(1),
        platform: z.enum(["instagram", "whatsapp", "phone", "email", "other"]),
        href: verificationFieldSchema(z.string().url()),
      }),
    ),
  }),
  hours: z.object({
    summary: stringFieldSchema,
    timezone: z.literal("Europe/Madrid"),
    byDay: z.array(businessHoursDaySchema).length(7),
  }),
  references: contentReferenceSchema,
});
