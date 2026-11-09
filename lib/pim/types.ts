// lib/pim/types.ts

/**
 * A product as returned by the PIM API, and as used by every page and component.
 * data/catalog.json is an array of these.
 */
export type Product = {
  /** Unique product identifier: `ec_product_id` in the catalog export, same as in the Coveo index. */
  sku: string;
  name: string;
  description?: string;
  brand?: string;
  /** Category path, e.g. "Skis & Boards > Surfboards > Longboards" */
  category?: string;
  price?: { amount: number; currency: string };
  /** Absolute image URLs. Their host must be allowed in next.config.mjs. */
  images: string[];
  /** Purchasable variants, e.g. sizes. Their SKUs also resolve to this product. */
  variants?: { sku: string; size?: string }[];
};

/** Response of `GET /api/pim/products`. */
export type ProductPage = {
  total: number;
  offset: number;
  limit: number;
  results: Product[];
};
