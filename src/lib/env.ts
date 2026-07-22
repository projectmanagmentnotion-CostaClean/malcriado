import { z } from "zod";

const envSchema = z.object({
  VITE_PUBLIC_SITE_URL: z.string().url(),
  VITE_RESERVATION_MODE: z.enum(["contact", "api", "disabled"]),
  VITE_RESERVATION_API_URL: z.string().url().optional(),
  VITE_ENABLE_DEV_ROUTES: z.enum(["true", "false"]),
  VITE_ENABLE_ANALYTICS: z.enum(["true", "false"]),
  VITE_STAGING_NOINDEX: z.enum(["true", "false"]).default("false"),
});

export function resolvePublicSiteUrl(value: string | undefined) {
  return value || "https://malcriadobcn.com";
}

export const env = envSchema.parse({
  VITE_PUBLIC_SITE_URL: resolvePublicSiteUrl(
    import.meta.env.VITE_PUBLIC_SITE_URL,
  ),
  VITE_RESERVATION_MODE: import.meta.env.VITE_RESERVATION_MODE ?? "contact",
  VITE_RESERVATION_API_URL:
    import.meta.env.VITE_RESERVATION_API_URL || undefined,
  VITE_ENABLE_DEV_ROUTES:
    import.meta.env.VITE_ENABLE_DEV_ROUTES ??
    (import.meta.env.DEV ? "true" : "false"),
  VITE_ENABLE_ANALYTICS: import.meta.env.VITE_ENABLE_ANALYTICS ?? "false",
  VITE_STAGING_NOINDEX: import.meta.env.VITE_STAGING_NOINDEX ?? "false",
});
