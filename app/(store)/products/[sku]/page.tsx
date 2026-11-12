import Image from "next/image";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import AddToCartButton from "@/components/cart/add-to-cart-button";
import { getProductBySku } from "@/lib/pim/client";
import { formatPrice } from "@/lib/format-price";
import { sanitizeHtml } from "@/lib/html";

// Product detail page: /products/{sku}
//
// The path matches the product URLs in the Coveo index (https://sports.barca.group/products/{sku}),
// so search results and recommendations can link here by keeping the path and swapping the host.
export default async function ProductPage({ params }: { params: { sku: string } }) {
  const sku = decodeURIComponent(params.sku);
  const product = await getProductBySku(sku);

  if (!product) {
    notFound();
  }

  // A variant SKU (e.g. a specific size) resolves to its parent product; send the shopper to the canonical URL.
  if (product.sku !== sku) {
    redirect(`/products/${encodeURIComponent(product.sku)}`);
  }

  const sizes = product.variants?.map((variant) => variant.size).filter(Boolean) ?? [];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <nav className="text-sm text-gray-500">
        <Link href="/products" className="hover:text-blue-600">
          All products
        </Link>
        {product.category && <span> / {product.category}</span>}
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="bg-gray-50 rounded-lg p-6 flex items-center justify-center">
          {product.images[0] ? (
            <Image
              src={product.images[0]}
              alt={product.name}
              width={600}
              height={600}
              className="object-contain max-h-[500px] w-auto"
            />
          ) : (
            <div className="h-96 flex items-center text-gray-400">No image</div>
          )}
        </div>

        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
          {product.brand && <p className="text-gray-600">{product.brand}</p>}
          <p className="text-2xl font-bold text-blue-900">{formatPrice(product.price)}</p>
          <p className="text-sm text-gray-500">SKU: {product.sku}</p>
          {sizes.length > 0 && (
            <p className="text-sm text-gray-700">
              <span className="font-medium">Available sizes:</span> {sizes.join(", ")}
            </p>
          )}
          {product.description && (
            <div
              className="text-gray-700 leading-relaxed space-y-3 [&_h1]:text-xl [&_h1]:font-semibold [&_h1]:text-gray-900 [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:text-gray-900 [&_h3]:font-semibold [&_h3]:text-gray-900 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:space-y-1"
              dangerouslySetInnerHTML={{ __html: sanitizeHtml(product.description) }}
            />
          )}
          <AddToCartButton product={product} />
          {/* TODO (later exercise): send a Coveo product view event from this page. */}
        </div>
      </div>
    </div>
  );
}

export const dynamic = "force-dynamic";
