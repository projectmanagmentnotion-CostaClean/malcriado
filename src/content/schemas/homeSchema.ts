import { z } from "zod";
import {
  contentReferenceSchema,
  verificationStatusSchema,
} from "./sharedSchema";

const sceneContentSchema = z.object({
  eyebrow: z.string().nullable(),
  heading: z.string().nullable(),
  copy: z.string().nullable(),
});

export const homeSceneSchema = z.object({
  id: z.string().min(1),
  slug: z.string().min(1),
  purpose: z.string().min(1),
  content: sceneContentSchema,
  media: z.array(
    z.object({
      assetId: z.string().nullable(),
      crop: z.enum(["original", "landscape", "portrait", "square", "mobile"]),
      status: verificationStatusSchema,
    }),
  ),
  ctas: z.array(
    z.object({
      label: z.string().min(1),
      href: z.string().min(1),
      status: verificationStatusSchema,
    }),
  ),
  theme: z.enum([
    "identity",
    "hero",
    "special",
    "fusion",
    "featured-dishes",
    "coast",
    "night",
    "story",
    "menu",
    "booking",
    "location",
  ]),
  motionIntent: z.enum([
    "reveal",
    "layered",
    "sticky-story",
    "horizontal-gallery",
    "quiet-reading",
    "booking-focus",
  ]),
  editorialStatus: verificationStatusSchema,
  mobileVariant: sceneContentSchema.nullable(),
  references: contentReferenceSchema,
});
