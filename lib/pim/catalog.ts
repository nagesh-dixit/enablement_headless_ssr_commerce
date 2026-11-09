// lib/pim/catalog.ts
//
// Data store behind the mock PIM API (app/api/pim). Only the API route handlers import this;
// the storefront pages go through lib/pim/client.ts like they would with a real backend.

import { readFile } from "node:fs/promises";
import path from "node:path";
import type { Product } from "./types";

// Load the catalog once per server process.
let productsPromise: Promise<Product[]> | null = null;

function loadProducts(): Promise<Product[]> {
  productsPromise ??= readFile(path.join(process.cwd(), "data", "catalog.json"), "utf8").then(
    (json) => JSON.parse(json) as Product[],
  );
  return productsPromise;
}

/** Basic keyword filter: case-insensitive exact-phrase match, results stay in catalog order. */
function matches(product: Product, q: string): boolean {
  const needle = q.toLowerCase();
  return [product.name, product.brand, product.category].some((field) => field?.toLowerCase().includes(needle));
}

export async function listProducts(offset: number, limit: number, q?: string) {
  const all = await loadProducts();
  const products = q ? all.filter((product) => matches(product, q)) : all;
  return { total: products.length, offset, limit, results: products.slice(offset, offset + limit) };
}

/** Finds a product by its own SKU or by the SKU of one of its variants. */
export async function findProduct(sku: string): Promise<Product | undefined> {
  const products = await loadProducts();
  return (
    products.find((product) => product.sku === sku) ??
    products.find((product) => product.variants?.some((variant) => variant.sku === sku))
  );
}
