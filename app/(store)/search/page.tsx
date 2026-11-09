import ProductCard from "@/components/product-card";
import SimplePagination from "@/components/simple-pagination";
import { getProducts } from "@/lib/pim/client";
import type { ProductPage } from "@/lib/pim/types";

const PAGE_SIZE = 48;

// Search page backed by the PIM API's basic keyword filter (see app/api/pim/products/route.ts).
// It only finds products whose name, brand, or category contains the exact phrase, in catalog order.
// TODO (exercises 1 and 2): replace with a Coveo search page.
export default async function SearchPage({ searchParams }: { searchParams: { q?: string; page?: string } }) {
  const q = searchParams.q?.trim() ?? "";
  const page = Math.max(1, Number(searchParams.page) || 1);

  let data: ProductPage | null = null;
  if (q) {
    try {
      data = await getProducts((page - 1) * PAGE_SIZE, PAGE_SIZE, q);
    } catch (e) {
      console.error(e);
      return (
        <div className="rounded-md border border-red-200 bg-red-50 p-4 text-red-800">
          Could not search the PIM API. Check the server logs for details.
        </div>
      );
    }
  }

  if (!q || !data) {
    return <p className="text-gray-600">Type a keyword in the search box to find products.</p>;
  }

  const pageCount = Math.ceil(data.total / PAGE_SIZE);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">
        {data.total} {data.total === 1 ? "result" : "results"} for &ldquo;{q}&rdquo;
      </h2>

      {data.total === 0 ? (
        <p className="text-gray-600">No products match. Try a different keyword.</p>
      ) : (
        <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4" aria-label="Product List">
          {data.results.map((product) => (
            <ProductCard key={product.sku} product={product} />
          ))}
        </div>
      )}

      <SimplePagination
        page={page}
        pageCount={pageCount}
        hrefForPage={(p) => `/search?q=${encodeURIComponent(q)}&page=${p}`}
      />
    </div>
  );
}

export const dynamic = "force-dynamic";
