import { render } from "@testing-library/react";
import { ResponsiveVideo } from "@/components/media/ResponsiveVideo";

describe("ResponsiveVideo", () => {
  it("renders sources and poster", () => {
    const { container } = render(
      <ResponsiveVideo
        poster="/poster.jpg"
        sources={[
          { src: "/video.webm", type: "video/webm" },
          { src: "/video.mp4", type: "video/mp4" },
        ]}
      />,
    );

    const video = container.querySelector("video");
    expect(video).toHaveAttribute("poster", "/poster.jpg");
    expect(container.querySelectorAll("source")).toHaveLength(2);
  });

  it("disables autoplay when reduced motion is preferred", () => {
    window.matchMedia = vi.fn().mockImplementation(() => ({
      matches: true,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    })) as typeof window.matchMedia;

    const { container } = render(
      <ResponsiveVideo
        autoPlay
        sources={[{ src: "/video.mp4", type: "video/mp4" }]}
      />,
    );

    expect(container.querySelector("video")).not.toHaveAttribute("autoplay");
  });
});
