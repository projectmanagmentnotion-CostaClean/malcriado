import {
  businessContent,
  getEmailHref,
  getReadableAddress,
  getTelephoneHref,
  getWhatsappHref,
} from "@/content";

describe("business content helpers", () => {
  it("exposes normalized contact hrefs", () => {
    expect(getReadableAddress()).toContain("Pineda de Mar");
    expect(getTelephoneHref()).toBe("tel:+34672695670");
    expect(getEmailHref()).toBe("mailto:info@malcriadobcn.com");
    expect(getWhatsappHref()).toBe("https://wa.me/34672695670");
  });

  it("keeps current business identity mapped", () => {
    expect(businessContent.identity.commercialName.value).toBe("Malcriado");
    expect(businessContent.contact.canonicalUrl.value).toBe(
      "https://malcriadobcn.com/",
    );
  });
});
