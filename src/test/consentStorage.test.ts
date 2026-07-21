import {
  CONSENT_STORAGE_KEY,
  CONSENT_VERSION,
} from "@/features/consent/config/consentConfig";
import {
  readConsentRecord,
  writeConsentRecord,
} from "@/features/consent/storage/consentStorage";

describe("consent storage", () => {
  beforeEach(() => {
    window.localStorage.clear();
    window.sessionStorage.clear();
  });

  it("reads a stored consent record only when version matches", () => {
    writeConsentRecord({
      version: CONSENT_VERSION,
      source: "customize",
      updatedAt: "2026-07-21T12:00:00.000Z",
      preferences: {
        necessary: true,
        analytics: false,
        marketing: false,
        externalMedia: true,
      },
    });

    expect(readConsentRecord()).toEqual({
      version: CONSENT_VERSION,
      source: "customize",
      updatedAt: "2026-07-21T12:00:00.000Z",
      preferences: {
        necessary: true,
        analytics: false,
        marketing: false,
        externalMedia: true,
      },
    });
  });

  it("ignores stale payloads from another version", () => {
    window.localStorage.setItem(
      CONSENT_STORAGE_KEY,
      JSON.stringify({
        version: "stale-version",
        source: "accept_all",
        updatedAt: "2026-07-20T12:00:00.000Z",
        preferences: {
          necessary: true,
          analytics: true,
          marketing: true,
          externalMedia: true,
        },
      }),
    );

    expect(readConsentRecord()).toBeNull();
  });
});
