import { mainNavigation } from "@/content";

export const siteRoutes = mainNavigation.map((route) => ({
  path: route.path,
  label: route.label,
}));
