interface BookingIntentOptions {
  readonly context: string;
  readonly dish?: string;
  readonly item?: string;
  readonly category?: string;
  readonly offer?: string;
}

export function buildBookingIntentHref(options: BookingIntentOptions) {
  const search = new URLSearchParams();
  search.set("context", options.context);

  const dish = options.dish ?? options.item;

  if (dish) {
    search.set("dish", dish);
  }

  if (options.category) {
    search.set("category", options.category);
  }

  if (options.offer) {
    search.set("offer", options.offer);
  }

  return `/reservar/?${search.toString()}`;
}
