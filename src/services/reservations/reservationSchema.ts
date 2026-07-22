import { z } from "zod";
import { isWithinProposedOpeningHours } from "@/content/business/openingHours";
import { getCurrentMadridDateIso } from "@/features/reservation/config/reservationConfig";

const cleanText = (max: number) => z.string().trim().max(max);
const contextEntitySchema = z
  .object({
    kind: z.enum(["dish", "category", "offer", "context", "source"]),
    slug: cleanText(120),
    label: cleanText(160),
    meta: cleanText(160).optional(),
  })
  .strict();

export const reservationRequestSchema = z
  .object({
    contact: z.object({
      name: cleanText(80).min(2),
      phone: cleanText(32).regex(/^(?=(?:\D*\d){7,15}\D*$)[+\d\s().-]+$/),
      email: z.union([z.literal(""), z.email()]),
      preferredChannel: z.enum(["phone", "whatsapp", "email"]),
    }),
    dateTime: z.object({
      date: z.iso.date(),
      time: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/),
      timezone: z.literal("Europe/Madrid"),
    }),
    preferences: z.object({
      guests: z.number().int().min(1).max(40),
      zone: z.enum(["sin-preferencia", "interior", "terraza"]),
      occasion: cleanText(80),
      allergies: cleanText(500),
      message: cleanText(500),
    }),
    consent: z.object({
      privacyAccepted: z.literal(true),
      includeAllergiesInMessage: z.boolean(),
    }),
    context: z
      .object({
        dish: contextEntitySchema.nullable(),
        category: contextEntitySchema.nullable(),
        offer: contextEntitySchema.nullable(),
        context: contextEntitySchema.nullable(),
        source: contextEntitySchema.nullable(),
        summaryTitle: cleanText(160).nullable(),
        summaryBody: cleanText(500).nullable(),
        tags: z.array(contextEntitySchema).max(12),
        ignoredParams: z.array(cleanText(80)).max(20),
        hasContext: z.boolean(),
      })
      .strict(),
    metadata: z
      .object({
        requestId: z.uuid(),
        startedAt: z.iso.datetime(),
        submittedAt: z.iso.datetime(),
        honeypot: z.literal(""),
        fingerprint: z.string().min(12).max(160),
        idempotencyKey: z.string().min(12).max(160),
        sessionId: z.string().min(8).max(160),
        attempt: z.number().int().min(1).max(20),
      })
      .strict(),
  })
  .strict()
  .superRefine((request, context) => {
    if (request.dateTime.date < getCurrentMadridDateIso()) {
      context.addIssue({
        code: "custom",
        path: ["dateTime", "date"],
        message: "past_date",
      });
    }

    if (
      !isWithinProposedOpeningHours(
        request.dateTime.date,
        request.dateTime.time,
      )
    ) {
      context.addIssue({
        code: "custom",
        path: ["dateTime", "time"],
        message: "outside_service_hours",
      });
    }
  });

export type ServerReservationRequest = z.infer<typeof reservationRequestSchema>;
