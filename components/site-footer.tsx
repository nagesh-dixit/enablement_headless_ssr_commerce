import Link from "next/link";
import { categoryHref, topCategories } from "@/lib/store-nav";

export default function SiteFooter() {
  return (
    <footer className="mt-16 bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <p className="text-lg font-bold text-white">Barca Sports</p>
          <p className="mt-3 text-sm leading-relaxed">
            Gear for life on the water: paddleboards, kayaks, surf, and everything you need for a day at the beach.
          </p>
        </div>

        <div>
          <p className="font-semibold text-white">Shop</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link href="/products" className="hover:text-white">
                All products
              </Link>
            </li>
            {topCategories.map((category) => (
              <li key={category.label}>
                <Link href={categoryHref(category.query)} className="hover:text-white">
                  {category.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-semibold text-white">Customer care</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>Free shipping on orders over $99</li>
            <li>30-day returns</li>
            <li>2-year warranty on boards</li>
            <li>Secure checkout</li>
          </ul>
        </div>

        <div>
          <p className="font-semibold text-white">Your account</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link href="/cart" className="hover:text-white">
                Cart
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-800">
        <p className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-xs text-gray-500">
          Barca Sports is a fictional store used for Coveo commerce training.
        </p>
      </div>
    </footer>
  );
}
