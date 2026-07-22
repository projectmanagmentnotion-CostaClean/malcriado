export interface PendingLegalValue {
  readonly value: string | null;
  readonly status: "verified" | "pending";
}

export interface LegalIdentity {
  readonly legalName: PendingLegalValue;
  readonly tradeName: PendingLegalValue;
  readonly taxId: PendingLegalValue;
  readonly registeredAddress: PendingLegalValue;
  readonly contactEmail: PendingLegalValue;
  readonly contactPhone: PendingLegalValue;
  readonly domain: PendingLegalValue;
  readonly privacyController: PendingLegalValue;
  readonly hostingProvider: PendingLegalValue;
  readonly reservationDataRetention: PendingLegalValue;
  readonly lastUpdated: string;
}

export const legalIdentity: LegalIdentity = {
  legalName: { value: null, status: "pending" },
  tradeName: { value: "Malcriado", status: "verified" },
  taxId: { value: null, status: "pending" },
  registeredAddress: { value: null, status: "pending" },
  contactEmail: { value: "info@malcriadobcn.com", status: "verified" },
  contactPhone: { value: "+34 672 69 56 70", status: "verified" },
  domain: { value: "malcriadobcn.com", status: "verified" },
  privacyController: { value: null, status: "pending" },
  hostingProvider: { value: null, status: "pending" },
  reservationDataRetention: { value: null, status: "pending" },
  lastUpdated: "2026-07-22",
};

export function getPublicLegalIdentity() {
  return {
    tradeName: legalIdentity.tradeName.value,
    contactEmail: legalIdentity.contactEmail.value,
    contactPhone: legalIdentity.contactPhone.value,
    domain: legalIdentity.domain.value,
  };
}
