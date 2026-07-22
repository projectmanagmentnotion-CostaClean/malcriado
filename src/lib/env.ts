import { z } from "zod";

const envSchema = z.object({
  VITE_PUBLIC_SITE_URL: z.string().url(),
  VITE_RESERVATION_API_URL: z.string().url().optional(),
  VITE_STAGING_NOINDEX: z.enum(["true", "false"]).default("false"),
});

export function resolvePublicSiteUrl(value: string | undefined) {
  return value || "https://malcriadobcn.com";
}

export const env = envSchema.parse({
  VITE_PUBLIC_SITE_URL: resolvePublicSiteUrl(
    import.meta.env.VITE_PUBLIC_SITE_URL,
  ),
  VITE_RESERVATION_API_URL:
    import.meta.env.VITE_RESERVATION_API_URL || undefined,
  VITE_STAGING_NOINDEX: import.meta.env.VITE_STAGING_NOINDEX ?? "false",
});
