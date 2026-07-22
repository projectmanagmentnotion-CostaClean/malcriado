/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PUBLIC_SITE_URL: string;
  readonly VITE_RESERVATION_MODE?: "contact" | "api" | "disabled";
  readonly VITE_RESERVATION_API_URL?: string;
  readonly VITE_ENABLE_DEV_ROUTES?: "true" | "false";
  readonly VITE_ENABLE_ANALYTICS?: "true" | "false";
  readonly VITE_STAGING_NOINDEX?: "true" | "false";
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
