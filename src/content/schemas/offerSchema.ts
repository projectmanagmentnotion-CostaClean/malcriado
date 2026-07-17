import { z } from "zod";
import { contentReferenceSchema, verificationStatusSchema } from "./sharedSchema";

const weekdaySchema = z.enum([
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
]);

export const offerSchema = z.object({
  id: z.string().min(1),
  slug: z.string().min(1),
  title: z.string().min(1),
  description: z.string().nullable(),
  label: z.string().nullable(),
  type: z.enum(["daily", "weekly", "seasonal", "event", "promotion", "scheduled"]),
  validity: z.object({
    startsAt: z.string().nullable(),
    endsAt: z.string().nullable(),
    timezone: z.literal("Europe/Madrid"),
  }),
  schedule: z.object({
    weekdays: z.array(weekdaySchema).nullable(),
    startTime: z.string().nullable(),
    endTime: z.string().nullable(),
  }),
  assetId: z.string().nullable(),
  cta: z
    .object({
      route: z.string().min(1),
      label: z.string().min(1),
      note: z.string().optional(),
    })
    .nullable(),
  priority: z.number().int().positive(),
  editorialStatus: verificationStatusSchema,
  computedStatus: z.enum([
    "SCHEDULED",
    "ACTIVE",
    "EXPIRED",
    "DISABLED",
    "PENDING_CONTENT",
  ]),
  audience: z.enum(["ALL", "DINNER", "GROUPS", "DRINKS"]),
  fallbackContent: z.string().nullable(),
  references: contentReferenceSchema,
});

export const offerEditorialStateSchema = z.object({
  status: verificationStatusSchema,
  message: z.string().min(1),
  references: contentReferenceSchema,
});
