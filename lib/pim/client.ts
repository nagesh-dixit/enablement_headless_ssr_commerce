// lib/pim/client.ts
//
// Storefront-side client for the PIM API. Pages call these functions on the server.
// They use plain HTTP, so pointing PIM_API_URL at another backend that returns the same
// JSON is enough to swap the data source.

import { headers } from "next/headers";
import type { Product, ProductPage } from "./types";

/** Uses PIM_API_URL when set, otherwise the mock API served by this app at /api/pim. */
function getBaseUrl(): string {
  if (process.env.PIM_API_URL) {
    return process.env.PIM_API_URL.replace(/\/$/, "");
  }
  const requestHeaders = headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost:3000";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? "http";
  return `${protocol}://${host}/api/pim`;
}

async function pimFetch(path: string): Promise<Response> {
  // Always read fresh data so catalog changes show up right away.
  return fetch(`${getBaseUrl()}${path}`, { cache: "no-store" });
}

/**
 * Fetches one page of the catalog, in the backend's fixed order.
 * With `q`, only products whose name, brand, or category contains that exact phrase.
 */
export async function getProducts(offset: number, limit: number, q?: string): Promise<ProductPage> {
  const params = new URLSearchParams({ offset: String(offset), limit: String(limit) });
  if (q) params.set("q", q);
  const response = await pimFetch(`/products?${params}`);
  if (!response.ok) {
    throw new Error(`PIM request failed (${response.status}): ${await response.text()}`);
  }
  return (await response.json()) as ProductPage;
}

/** Fetches one product by its SKU or a variant SKU, or null when it doesn't exist. */
export async function getProductBySku(sku: string): Promise<Product | null> {
  const response = await pimFetch(`/products/${encodeURIComponent(sku)}`);
  if (response.status === 404) return null;
  if (!response.ok) {
    throw new Error(`PIM request failed (${response.status}): ${await response.text()}`);
  }
  return (await response.json()) as Product;
}
