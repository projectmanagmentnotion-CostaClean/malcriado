import { offerStatus } from "@/content/siteContent";

describe("offer status", () => {
  it("does not publish unverified offers", () => {
    expect(offerStatus.type).toBe("pending");
    expect(offerStatus.message).toBe("PENDING_CONTENT");
  });
});
