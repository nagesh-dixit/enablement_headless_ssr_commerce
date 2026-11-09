export function formatPrice(price?: { amount: number; currency: string }): string {
  if (!price) return "";
  return new Intl.NumberFormat("en-US", { style: "currency", currency: price.currency }).format(price.amount);
}
