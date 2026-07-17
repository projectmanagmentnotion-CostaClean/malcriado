import { z } from "zod";
import {
  contentReferenceSchema,
  verificationStatusSchema,
} from "./sharedSchema";

const menuPublicationStatusSchema = z.enum([
  "PUBLIC",
  "PENDING_VALIDATION",
  "PENDING_CONTENT",
  "UNAVAILABLE",
]);

const menuCategorySchema = z.object({
  id: z.string().min(1),
  slug: z.string().min(1),
  label: z.string().min(1),
  description: z.string().nullable(),
  order: z.number().int().positive(),
  publicationStatus: menuPublicationStatusSchema,
  sourceLabel: z.string().min(1),
  note: z.string().optional(),
  sourceIds: z.array(z.string().min(1)).min(1),
});

const menuItemSchema = z.object({
  id: z.string().min(1),
  slug: z.string().min(1),
  sourceName: z.string().min(1),
  name: z.string().min(1),
  description: z.string().nullable(),
  categoryId: z.string().min(1),
  subcategory: z.string().nullable(),
  publishedIngredients: z.array(z.string()),
  ingredientStatus: verificationStatusSchema,
  price: z.object({
    amount: z.number().nonnegative().nullable(),
    currency: z.literal("EUR"),
    unitLabel: z.string().optional(),
    status: verificationStatusSchema,
    note: z.string().optional(),
  }),
  allergens: z.array(
    z.enum([
      "GLUTEN",
      "CRUSTACEANS",
      "EGGS",
      "FISH",
      "PEANUTS",
      "SOY",
      "MILK",
      "TREE_NUTS",
      "CELERY",
      "MUSTARD",
      "SESAME",
      "SULPHITES",
      "LUPIN",
      "MOLLUSCS",
    ]),
  ),
  allergenStatus: verificationStatusSchema,
  dietaryTags: z.array(
    z.enum([
      "VEGETARIAN",
      "VEGAN",
      "GLUTEN_FREE_OPTION",
      "NON_ALCOHOLIC",
      "SHAREABLE",
      "SPICY",
    ]),
  ),
  spicyLevel: z.number().int().min(0).max(3).nullable(),
  availability: z.enum(["AVAILABLE", "SEASONAL", "UNKNOWN"]),
  media: z
    .object({
      assetId: z.string().min(1).nullable(),
      assetStatus: verificationStatusSchema,
      crop: z.enum(["original", "landscape", "portrait", "square", "mobile"]),
      alt: z.string().nullable(),
    })
    .nullable(),
  editorialOrder: z.number().int().positive(),
  publicationStatus: menuPublicationStatusSchema,
  references: contentReferenceSchema,
  validationNotes: z.string().optional(),
});

export const menuSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  categories: z.array(menuCategorySchema).min(1),
  items: z.array(menuItemSchema).min(1),
});
