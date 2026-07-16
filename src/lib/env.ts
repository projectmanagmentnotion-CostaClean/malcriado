import { z } from "zod";

const envSchema = z.object({
  VITE_PUBLIC_SITE_URL: z.string().url(),
});

export const env = envSchema.parse({
  VITE_PUBLIC_SITE_URL:
    import.meta.env.VITE_PUBLIC_SITE_URL ??
    (import.meta.env.MODE === "test" ? "https://www.example.com" : undefined),
});
