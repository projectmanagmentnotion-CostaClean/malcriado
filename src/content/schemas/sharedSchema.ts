import { z } from "zod";

export const verificationStatusSchema = z.enum([
  "VERIFIED",
  "PENDING_VALIDATION",
  "PENDING_CONTENT",
  "UNAVAILABLE",
  "NOT_APPLICABLE",
]);

export const contentReferenceSchema = z.object({
  sourceIds: z.array(z.string().min(1)).min(1),
  note: z.string().optional(),
});

export const contentSourceSchema = z.object({
  id: z.string().min(1),
  label: z.string().min(1),
  kind: z.enum(["website", "document", "asset", "owner", "internal-audit", "derived"]),
  url: z.string().url().nullable(),
  owner: z.string().min(1),
  notes: z.string().min(1),
});

export function verificationFieldSchema<T extends z.ZodTypeAny>(valueSchema: T) {
  return z.object({
    value: valueSchema.nullable(),
    status: verificationStatusSchema,
    note: z.string().optional(),
    sourceIds: z.array(z.string().min(1)).min(1),
    expectedFrom: z.string().optional(),
  });
}
