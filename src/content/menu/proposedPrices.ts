import type { MenuItemPrice } from "@/types/content";

const categoryPrices: Readonly<Record<string, readonly number[]>> = {
  "cat-hot-dishes": [12.5, 18.5, 13.5, 11.5, 8, 12, 17.5, 15.5],
  "cat-cold-dishes": [12.5, 16.5, 17, 15.5, 10.5],
  "cat-pizzas": [15.5, 14.5, 14, 17.5, 12.5],
  "cat-sangrias": [6, 5.5, 7, 7],
  "cat-cocktails": [10.5, 11, 11, 11.5, 10.5],
  "cat-beers": [3.5, 4, 4.5],
  "cat-soft-drinks": [3, 3, 3, 3, 3.5, 2.5],
  "cat-wines": [4.5, 4.5, 4.5, 6.5],
  "cat-desserts": [7, 7.5, 6.5, 8],
};

export function getProposedPrice(
  categoryId: string,
  editorialOrder: number,
): MenuItemPrice {
  const prices = categoryPrices[categoryId];
  const amount = prices?.[editorialOrder - 1];

  if (amount === undefined) {
    throw new Error(
      `Missing editorial price for ${categoryId}:${editorialOrder}`,
    );
  }

  return {
    amount,
    currency: "EUR",
    status: "PENDING_VALIDATION",
    note: "Phase 12A editorial commercial proposal. Includes applicable VAT; owner validation required before launch.",
  };
}
