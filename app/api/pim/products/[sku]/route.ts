// GET /api/pim/products/{sku}
//
// Mock PIM endpoint: returns one product by its SKU or a variant SKU, or 404.

import { NextResponse } from "next/server";
import { findProduct } from "@/lib/pim/catalog";

export async function GET(_request: Request, { params }: { params: { sku: string } }) {
  const product = await findProduct(decodeURIComponent(params.sku));

  if (!product) {
    return NextResponse.json({ message: `Product ${params.sku} not found` }, { status: 404 });
  }

  return NextResponse.json(product);
}
