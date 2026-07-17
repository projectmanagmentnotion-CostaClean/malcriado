import { MediaFrame } from "@/components/media/MediaFrame";
import { ResponsiveImage } from "@/components/media/ResponsiveImage";
import type { AssetManifestEntry, AssetVariant } from "@/types/assets";

interface EditorialImageProps {
  readonly asset: AssetManifestEntry;
  readonly crop?: AssetVariant["crop"];
  readonly ratio?: "landscape" | "portrait" | "square" | "cinema" | "free";
  readonly sizes: string;
  readonly caption?: string;
  readonly credit?: string;
  readonly alt?: string;
  readonly eager?: boolean;
}

export function EditorialImage({
  asset,
  crop = "editorial",
  ratio = "landscape",
  sizes,
  caption,
  credit,
  alt,
  eager = false,
}: EditorialImageProps) {
  const frameProps = {
    ratio,
    ...(caption ? { caption } : {}),
    ...(credit ? { credit } : {}),
  };

  const imageProps = {
    asset,
    crop,
    sizes,
    eager,
    ...(alt ? { alt } : {}),
  };

  return (
    <MediaFrame {...frameProps}>
      <ResponsiveImage {...imageProps} />
    </MediaFrame>
  );
}
