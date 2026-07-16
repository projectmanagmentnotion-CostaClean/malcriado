export interface BookingRequest {
  readonly date: string;
  readonly time: string;
  readonly guests: number;
  readonly name: string;
  readonly contact: string;
  readonly notes?: string;
  readonly acceptedPrivacy: boolean;
}

export interface BookingSubmissionResult {
  readonly status: "pending" | "success" | "error";
  readonly message: string;
}

export interface BookingProvider {
  readonly kind: "mock";
  submitReservation(payload: BookingRequest): Promise<BookingSubmissionResult>;
}
