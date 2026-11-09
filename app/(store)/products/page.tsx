import ProductCard from "@/components/product-card";
import SimplePagination from "@/components/simple-pagination";
import { getProducts } from "@/lib/pim/client";
import type { ProductPage } from "@/lib/pim/types";

const PAGE_SIZE = 48;

// All products: reads the catalog straight from the PIM API (see app/api/pim), one page at a time,
// in the backend's fixed order. No search engine yet: no relevance, facets, sorting, or personalization.
export default async function AllProductsPage({ searchParams }: { searchParams: { page?: string } }) {
  const page = Math.max(1, Number(searchParams.page) || 1);

  let data: ProductPage | null = null;
  try {
    data = await getProducts((page - 1) * PAGE_SIZE, PAGE_SIZE);
  } catch (e) {
    console.error(e);
  }

  if (!data) {
    return (
      <div className="rounded-md border border-red-200 bg-red-50 p-4 text-red-800">
        Could not load products from the PIM API. Check the server logs for details.
      </div>
    );
  }

  const pageCount = Math.max(1, Math.ceil(data.total / PAGE_SIZE));

  return (
    <div className="space-y-6">
      <div className="flex items-baseline justify-between">
        <h1 className="text-3xl font-bold text-gray-900">All products</h1>
        <p className="text-sm text-gray-500">{data.total} products in the catalog</p>
      </div>

      <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4" aria-label="Product List">
        {data.results.map((product) => (
          <ProductCard key={product.sku} product={product} />
        ))}
      </div>

      <SimplePagination page={page} pageCount={pageCount} hrefForPage={(p) => `/products?page=${p}`} />
    </div>
  );
}

export const dynamic = "force-dynamic";
