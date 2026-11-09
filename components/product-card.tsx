import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/pim/types";
import { formatPrice } from "@/lib/format-price";
import AddToCartButton from "./cart/add-to-cart-button";

export default function ProductCard({ product }: { product: Product }) {
  const href = `/products/${encodeURIComponent(product.sku)}`;

  return (
    <div className="rounded-lg shadow-md overflow-hidden flex flex-col h-full border border-gray-200 hover:shadow-lg transition-shadow">
      <Link href={href} className="relative bg-gray-50 p-2 flex justify-center">
        {product.images[0] ? (
          <Image
            src={product.images[0]}
            alt={product.name}
            width={250}
            height={250}
            className="object-contain h-48 w-full"
          />
        ) : (
          <div className="h-48 w-full flex items-center justify-center text-sm text-gray-400">No image</div>
        )}
      </Link>

      <div className="p-4 flex-grow flex flex-col">
        <h3 className="font-semibold text-lg mb-1 line-clamp-2">
          <Link href={href} className="hover:text-blue-600">
            {product.name}
          </Link>{" "}
          {product.brand && <span className="text-sm text-gray-600">({product.brand})</span>}
        </h3>

        {product.description && <p className="text-sm text-gray-600 mb-3 line-clamp-5">{product.description}</p>}

        <div className="mt-auto pt-3 border-t border-gray-100 flex justify-between items-center">
          <span className="font-bold text-lg text-blue-900">{formatPrice(product.price)}</span>
          <AddToCartButton product={product} />
        </div>
      </div>
    </div>
  );
}
