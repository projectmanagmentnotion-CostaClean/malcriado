import {
  createContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  CONSENT_VERSION,
  consentCategories,
  defaultConsentPreferences,
  thirdPartyServices,
} from "../config/consentConfig";
import type { ConsentPreferences, ConsentRecord } from "../domain/consentTypes";
import {
  markConsentUiSeen,
  readConsentRecord,
  writeConsentRecord,
} from "../storage/consentStorage";

interface ConsentContextValue {
  readonly categories: typeof consentCategories;
  readonly thirdPartyServices: typeof thirdPartyServices;
  readonly record: ConsentRecord | null;
  readonly preferences: ConsentPreferences;
  readonly hasDecision: boolean;
  readonly isDialogOpen: boolean;
  readonly openPreferences: () => void;
  readonly closePreferences: () => void;
  readonly acceptAll: () => void;
  readonly rejectAll: () => void;
  readonly saveCustomPreferences: (next: ConsentPreferences) => void;
  readonly allows: (
    category: "analytics" | "marketing" | "external_media",
  ) => boolean;
}

const ConsentContext = createContext<ConsentContextValue | null>(null);

function buildRecord(
  source: ConsentRecord["source"],
  preferences: ConsentPreferences,
): ConsentRecord {
  return {
    version: CONSENT_VERSION,
    source,
    updatedAt: new Date().toISOString(),
    preferences,
  };
}

export function ConsentProvider({
  children,
}: {
  readonly children: ReactNode;
}) {
  const [record, setRecord] = useState<ConsentRecord | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    setRecord(readConsentRecord());
    markConsentUiSeen();
  }, []);

  function commit(nextRecord: ConsentRecord) {
    setRecord(nextRecord);
    writeConsentRecord(nextRecord);
    setIsDialogOpen(false);
  }

  const value = useMemo<ConsentContextValue>(() => {
    const preferences = record?.preferences ?? defaultConsentPreferences;

    return {
      categories: consentCategories,
      thirdPartyServices,
      record,
      preferences,
      hasDecision: Boolean(record),
      isDialogOpen,
      openPreferences: () => setIsDialogOpen(true),
      closePreferences: () => setIsDialogOpen(false),
      acceptAll: () =>
        commit(
          buildRecord("accept_all", {
            necessary: true,
            analytics: true,
            marketing: true,
            externalMedia: true,
          }),
        ),
      rejectAll: () =>
        commit(
          buildRecord("reject_all", {
            necessary: true,
            analytics: false,
            marketing: false,
            externalMedia: false,
          }),
        ),
      saveCustomPreferences: (next) => commit(buildRecord("customize", next)),
      allows: (category) => {
        if (category === "analytics") {
          return preferences.analytics;
        }
        if (category === "marketing") {
          return preferences.marketing;
        }
        return preferences.externalMedia;
      },
    };
  }, [isDialogOpen, record]);

  return (
    <ConsentContext.Provider value={value}>{children}</ConsentContext.Provider>
  );
}

export { ConsentContext };
