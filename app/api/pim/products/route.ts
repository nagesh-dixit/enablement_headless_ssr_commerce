// GET /api/pim/products?offset=0&limit=100&q=surfboard
//
// Mock PIM endpoint: pages through the catalog in a fixed order.
// `q` is an optional keyword filter, like the SQL `LIKE '%q%'` that many PIM and commerce backends offer:
// a case-insensitive exact-phrase match on name, brand, and category. There's no typo tolerance,
// stemming, synonyms, relevance ranking, facets, or personalization. That's what Coveo adds in the exercises.

import { NextRequest, NextResponse } from "next/server";
import { listProducts } from "@/lib/pim/catalog";

const MAX_LIMIT = 500;

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const offset = Math.max(0, Number(params.get("offset")) || 0);
  const limit = Math.min(MAX_LIMIT, Math.max(1, Number(params.get("limit")) || 100));
  const q = params.get("q")?.trim() || undefined;

  return NextResponse.json(await listProducts(offset, limit, q));
}
