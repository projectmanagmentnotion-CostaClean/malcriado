import {
  CONSENT_SESSION_KEY,
  CONSENT_STORAGE_KEY,
  CONSENT_VERSION,
} from "../config/consentConfig";
import type { ConsentRecord } from "../domain/consentTypes";

function hasWindow() {
  return typeof window !== "undefined";
}

export function readConsentRecord() {
  if (!hasWindow()) {
    return null;
  }

  const raw = window.localStorage.getItem(CONSENT_STORAGE_KEY);
  if (!raw) {
    return null;
  }

  try {
    const parsed = JSON.parse(raw) as ConsentRecord;
    if (parsed.version !== CONSENT_VERSION) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

export function writeConsentRecord(record: ConsentRecord) {
  if (!hasWindow()) {
    return;
  }

  window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(record));
  window.sessionStorage.setItem(CONSENT_SESSION_KEY, record.version);
}

export function markConsentUiSeen() {
  if (!hasWindow()) {
    return;
  }

  window.sessionStorage.setItem(CONSENT_SESSION_KEY, CONSENT_VERSION);
}
