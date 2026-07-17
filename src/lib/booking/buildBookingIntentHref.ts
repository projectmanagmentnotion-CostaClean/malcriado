interface BookingIntentOptions {
  readonly context: string;
  readonly item?: string;
  readonly category?: string;
  readonly offer?: string;
}

export function buildBookingIntentHref(options: BookingIntentOptions) {
  const search = new URLSearchParams();
  search.set("context", options.context);

  if (options.item) {
    search.set("item", options.item);
  }

  if (options.category) {
    search.set("category", options.category);
  }

  if (options.offer) {
    search.set("offer", options.offer);
  }

  return `/reservar/?${search.toString()}`;
}
