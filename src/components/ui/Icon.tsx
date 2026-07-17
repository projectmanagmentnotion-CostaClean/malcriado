import type { SVGProps } from "react";

export type IconName =
  | "menu"
  | "close"
  | "arrow-right"
  | "external-link"
  | "phone"
  | "email"
  | "location"
  | "instagram"
  | "whatsapp"
  | "calendar"
  | "guests"
  | "clock"
  | "accessibility";

interface IconProps extends SVGProps<SVGSVGElement> {
  readonly name: IconName;
}

export function Icon({ name, ...props }: IconProps) {
  switch (name) {
    case "menu":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
          <path d="M4 7h16M4 12h16M4 17h16" strokeWidth="1.75" />
        </svg>
      );
    case "close":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
          <path d="m6 6 12 12M18 6 6 18" strokeWidth="1.75" />
        </svg>
      );
    case "arrow-right":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
          <path d="M5 12h14M13 6l6 6-6 6" strokeWidth="1.75" />
        </svg>
      );
    case "external-link":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
          <path d="M14 5h5v5M10 14 19 5M19 14v5H5V5h5" strokeWidth="1.75" />
        </svg>
      );
    case "phone":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
          <path
            d="M6.5 4.5h3l1.2 4-1.8 1.8a14 14 0 0 0 5 5l1.8-1.8 4 1.2v3c0 .83-.67 1.5-1.5 1.5C10.91 19.2 4.8 13.09 4.8 5.9c0-.77.63-1.4 1.4-1.4Z"
            strokeWidth="1.5"
          />
        </svg>
      );
    case "email":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
          <path d="M4 6h16v12H4zM4 7l8 6 8-6" strokeWidth="1.5" />
        </svg>
      );
    case "location":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
          <path
            d="M12 20s6-4.5 6-10a6 6 0 1 0-12 0c0 5.5 6 10 6 10Z"
            strokeWidth="1.5"
          />
          <circle cx="12" cy="10" r="2.5" strokeWidth="1.5" />
        </svg>
      );
    case "instagram":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
          <rect x="4" y="4" width="16" height="16" rx="4" strokeWidth="1.5" />
          <circle cx="12" cy="12" r="3.5" strokeWidth="1.5" />
          <circle cx="17.25" cy="6.75" r="0.75" fill="currentColor" />
        </svg>
      );
    case "whatsapp":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
          <path
            d="M12 20a8 8 0 1 0-4.2-1.18L5 20l1.26-2.7A8 8 0 0 0 12 20Z"
            strokeWidth="1.5"
          />
          <path
            d="M9.5 8.5c-.2.2-.62.8-.62 1.56 0 .76.45 1.5.51 1.6.06.1 1.02 1.64 2.47 2.3 1.45.65 1.45.43 1.71.4.26-.03.83-.34.95-.68.12-.34.12-.63.09-.68-.03-.05-.11-.08-.23-.14-.12-.06-.74-.37-.86-.4-.12-.03-.2-.05-.29.08-.08.13-.32.4-.39.48-.08.08-.15.1-.28.03-.13-.06-.56-.2-1.06-.63a4.03 4.03 0 0 1-.74-.92c-.08-.13 0-.2.06-.26.06-.06.13-.15.2-.23.07-.08.09-.14.14-.23.05-.1.03-.17-.02-.23-.05-.06-.29-.71-.4-.97-.11-.27-.22-.23-.29-.23h-.25Z"
            strokeWidth="1.2"
          />
        </svg>
      );
    case "calendar":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
          <path d="M7 3v4M17 3v4M4 8h16M5 5h14v15H5z" strokeWidth="1.5" />
        </svg>
      );
    case "guests":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
          <circle cx="9" cy="8" r="3" strokeWidth="1.5" />
          <circle cx="17" cy="9" r="2.5" strokeWidth="1.5" />
          <path
            d="M4.5 19a4.5 4.5 0 0 1 9 0M14 19a3.5 3.5 0 0 1 6 0"
            strokeWidth="1.5"
          />
        </svg>
      );
    case "clock":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
          <circle cx="12" cy="12" r="8" strokeWidth="1.5" />
          <path d="M12 8v4l3 2" strokeWidth="1.5" />
        </svg>
      );
    case "accessibility":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
          <circle cx="12" cy="5" r="2" strokeWidth="1.5" />
          <path
            d="M6 9h12M12 9v10M8 20l4-5 4 5M9 9l-2 5M15 9l2 5"
            strokeWidth="1.5"
          />
        </svg>
      );
  }
}
