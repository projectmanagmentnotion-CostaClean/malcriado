import { z } from "zod";
import { isWithinProposedOpeningHours } from "@/content/business/openingHours";

const cleanText = (max: number) => z.string().trim().max(max);

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
    consent: z.object({ privacyAccepted: z.literal(true) }),
    metadata: z
      .object({
        requestId: z.uuid(),
        submittedAt: z.iso.datetime(),
        honeypot: z.literal(""),
        idempotencyKey: z.string().min(12).max(160),
      })
      .passthrough(),
  })
  .passthrough()
  .superRefine((request, context) => {
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
