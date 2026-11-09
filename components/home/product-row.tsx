import Link from "next/link";
import ProductCard from "@/components/product-card";
import type { Product } from "@/lib/pim/types";

export default function ProductRow({
  title,
  subtitle,
  products,
  shopAllHref,
}: {
  title: string;
  subtitle?: string;
  products: Product[];
  shopAllHref: string;
}) {
  if (products.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-end justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">{title}</h2>
          {subtitle && <p className="mt-1 text-gray-600">{subtitle}</p>}
        </div>
        <Link href={shopAllHref} className="shrink-0 text-sm font-semibold text-blue-600 hover:text-blue-800">
          Shop all &rarr;
        </Link>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <ProductCard key={product.sku} product={product} />
        ))}
      </div>
    </section>
  );
}
