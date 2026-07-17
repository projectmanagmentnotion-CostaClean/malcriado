export type ShellKind = "public" | "dev";

export type HeaderTheme = "overlay" | "dark" | "light";
export type HeaderDensity = "default" | "compact";

export interface ShellRouteHandle {
  readonly shell: ShellKind;
  readonly pageTitle: string;
  readonly headerTheme?: HeaderTheme;
  readonly headerDensity?: HeaderDensity;
  readonly showPersistentBookingCta?: boolean;
  readonly hideHeaderBookingCta?: boolean;
  readonly focusTargetId?: string;
  readonly hasHero?: boolean;
}

export function isShellRouteHandle(value: unknown): value is ShellRouteHandle {
  return (
    typeof value === "object" &&
    value !== null &&
    "shell" in value &&
    "pageTitle" in value
  );
}
