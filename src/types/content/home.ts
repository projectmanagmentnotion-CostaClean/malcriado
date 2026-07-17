import type { ContentReference, VerificationStatus } from "./shared";

export type SceneTheme =
  | "identity"
  | "hero"
  | "special"
  | "fusion"
  | "featured-dishes"
  | "coast"
  | "night"
  | "story"
  | "menu"
  | "booking"
  | "location";

export type SceneMotionIntent =
  | "reveal"
  | "layered"
  | "sticky-story"
  | "horizontal-gallery"
  | "quiet-reading"
  | "booking-focus";

export interface SceneCta {
  readonly label: string;
  readonly href: string;
  readonly status: VerificationStatus;
}

export interface SceneMedia {
  readonly assetId: string | null;
  readonly crop: "original" | "landscape" | "portrait" | "square" | "mobile";
  readonly status: VerificationStatus;
}

export interface SceneContent {
  readonly eyebrow: string | null;
  readonly heading: string | null;
  readonly copy: string | null;
}

export interface HomeScene {
  readonly id: string;
  readonly slug: string;
  readonly purpose: string;
  readonly content: SceneContent;
  readonly media: readonly SceneMedia[];
  readonly ctas: readonly SceneCta[];
  readonly theme: SceneTheme;
  readonly motionIntent: SceneMotionIntent;
  readonly editorialStatus: VerificationStatus;
  readonly mobileVariant: SceneContent | null;
  readonly references: ContentReference;
}
