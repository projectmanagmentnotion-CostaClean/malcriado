import { z } from "zod";
import {
  contentReferenceSchema,
  verificationStatusSchema,
} from "./sharedSchema";

export const seoPageSchema = z.object({
  pageId: z.string().min(1),
  metadata: z.object({
    id: z.string().min(1),
    path: z.string().min(1),
    title: z.string().min(1),
    description: z.string().min(1),
    canonicalPath: z.string().min(1),
    robots: z.string().min(1),
    primaryKeyword: z.string().min(1),
    intent: z.enum(["informational", "transactional", "navigational"]),
    entities: z.array(z.string().min(1)).min(1),
    openGraph: z.object({
      title: z.string().min(1),
      description: z.string().min(1),
      type: z.literal("website"),
      imageAssetId: z.string().nullable(),
    }),
    structuredData: z.object({
      type: z.enum([
        "Restaurant",
        "WebSite",
        "WebPage",
        "ContactPage",
        "AboutPage",
      ]),
      includeMenu: z.boolean(),
      includeOffers: z.boolean(),
      includeBreadcrumbs: z.boolean().optional(),
    }),
    validationStatus: verificationStatusSchema,
    references: contentReferenceSchema,
  }),
});
