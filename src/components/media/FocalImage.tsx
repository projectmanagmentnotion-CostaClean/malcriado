import { ResponsiveImage } from "@/components/media/ResponsiveImage";
import type { AssetManifestEntry, AssetVariant } from "@/types/assets";

interface FocalImageProps {
  readonly asset: AssetManifestEntry;
  readonly crop?: AssetVariant["crop"];
  readonly sizes: string;
  readonly alt?: string;
  readonly className?: string;
}

export function FocalImage({
  asset,
  crop = "landscape",
  sizes,
  alt,
  className,
}: FocalImageProps) {
  const imageProps = {
    asset,
    crop,
    sizes,
    ...(alt ? { alt } : {}),
    ...(className ? { className } : {}),
  };

  return <ResponsiveImage {...imageProps} />;
}
