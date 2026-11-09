"use server";

import type { Product } from "./pim/types";
import { cookies } from "next/headers";
import { v4 as uuidv4 } from "uuid";

// This file provides mock server-side actions for managing a shopping cart.
// It uses cookies to store cart items and provides functions to manipulate the cart.
// In a real application, these functions would call the commerce backend's cart API.

export type CartItem = {
  product: CartProduct;
  quantity: number;
};

// Only what the cart page needs, to keep the cookie small.
export type CartProduct = {
  sku: string;
  name: string;
  price: number;
  image?: string;
};

export type SuccessfulCheckout = {
  success: true;
  transactionId: string;
  revenue: number;
};

export type FailedCheckout = {
  success: false;
  message: string;
};

export type CheckoutResult = SuccessfulCheckout | FailedCheckout;

async function getCartFromCookies(): Promise<CartItem[]> {
  try {
    const cartCookie = cookies().get("cart");

    if (!cartCookie) return [];

    const items = JSON.parse(cartCookie.value) as CartItem[];
    // Ignore entries written in another format (e.g. by the solutions branch).
    return items.filter((item) => typeof item?.product?.sku === "string");
  } catch (error) {
    console.error("Failed to parse cart cookie:", error);
    return [];
  }
}

async function setCartInCookies(cart: CartItem[]) {
  try {
    const serialized = JSON.stringify(cart);

    cookies().set({
      name: "cart",
      value: serialized,
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      httpOnly: true,
    });
  } catch (error) {
    console.error("Error setting cart cookie:", error);
  }
}

export async function getCartItems(): Promise<CartItem[]> {
  return getCartFromCookies();
}

export async function addToCart(product: Product, quantity: number = 1): Promise<CartItem[]> {
  const cartItems = await getCartFromCookies();

  const existingItemIndex = cartItems.findIndex((item) => item.product.sku === product.sku);

  if (existingItemIndex >= 0) {
    cartItems[existingItemIndex].quantity += quantity;
  } else {
    cartItems.push({
      product: {
        sku: product.sku,
        name: product.name,
        price: product.price?.amount ?? 0,
        image: product.images[0],
      },
      quantity,
    });
  }

  await setCartInCookies(cartItems);
  return cartItems;
}

export async function removeFromCart(sku: string): Promise<CartItem[]> {
  const cartItems = await getCartFromCookies();

  const updatedCart = cartItems.filter((item) => item.product.sku !== sku);

  await setCartInCookies(updatedCart);
  return updatedCart;
}

export async function updateQuantity(sku: string, quantity: number): Promise<CartItem[]> {
  const cartItems = await getCartFromCookies();

  const itemIndex = cartItems.findIndex((item) => item.product.sku === sku);

  if (itemIndex >= 0 && quantity > 0) {
    cartItems[itemIndex].quantity = quantity;
  }

  await setCartInCookies(cartItems);
  return cartItems;
}

export async function getCartCount(): Promise<number> {
  const cartItems = await getCartFromCookies();
  return cartItems.reduce((total, item) => total + item.quantity, 0);
}

export async function getSubtotal(): Promise<number> {
  const cartItems = await getCartFromCookies();
  return cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
}

export async function getTaxes(): Promise<number> {
  const subtotal = await getSubtotal();
  return subtotal * 0.07; // Fixed 7% tax rate
}

export async function getTotalWithTax(): Promise<number> {
  const subtotal = await getSubtotal();
  const taxes = await getTaxes();
  return subtotal + taxes;
}

export async function clearCart(): Promise<CartItem[]> {
  await setCartInCookies([]);
  return [];
}

export async function checkout(): Promise<CheckoutResult> {
  const cartItems = await getCartFromCookies();

  if (cartItems.length === 0) {
    return {
      success: false,
      message: "Cart is empty",
    };
  }

  const transactionId = uuidv4();
  const revenue = await getTotalWithTax();

  await clearCart();

  return {
    success: true,
    transactionId,
    revenue,
  };
}
