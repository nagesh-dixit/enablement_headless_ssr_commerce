"use client";

import { Product, ProductList, Recommendations } from "@coveo/headless-react/ssr-commerce";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useCart } from "@/lib/commerce-engine";
import { useMockServerCartService } from "../providers/server-cart-provider";

export interface AddToCartButtonProps {
  product: Product;
  methods?: Omit<Recommendations, "state" | "subscribe"> | Omit<ProductList, "state" | "subscribe"> | undefined;
}

export default function AddToCartButton({ product, methods }: AddToCartButtonProps) {
  const { addToCart, isLoading } = useMockServerCartService();
  const coveoHeadlessCart = useCart();
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async () => {
    setIsAdding(true);
    try {
      await addToCart(product);
      // Update Coveo Headless Cart internal state, and send an analytics event
      coveoHeadlessCart.methods?.updateItemQuantity({
        productId: product.ec_product_id!,
        name: product.ec_name!,
        price: product.ec_price!,
        quantity: 1,
      });

      // Recommendation and product-list cards both expose interactiveProduct; only call it when present.
      methods?.interactiveProduct({ options: { product } }).select();
    } catch (error) {
      console.error("Failed to add to cart:", error);
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <button
      onClick={handleAddToCart}
      disabled={isAdding || isLoading}
      className="bg-gray-100 border border-gray-300 text-gray-700 hover:bg-blue-600 hover:text-white hover:border-blue-600 hover:shadow-md font-medium py-1 px-3 rounded-md transition-all duration-200 ease-in-out flex items-center cursor-pointer transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:bg-gray-100 disabled:hover:text-gray-700 disabled:hover:border-gray-300"
    >
      <ShoppingCartIcon className="h-5 w-5 mr-1" />
      {isAdding ? "Adding..." : "Add to Cart"}
    </button>
  );
}
