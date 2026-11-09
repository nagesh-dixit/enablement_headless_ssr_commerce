import Link from "next/link";
import Image from "next/image";
import "./globals.css";
import { Suspense } from "react";
import CartLink from "@/components/cart/cart-link";
import SearchBox from "@/components/search-box";
import SiteFooter from "@/components/site-footer";
import { categoryHref, headerCategories } from "@/lib/store-nav";
import { MockServerCartProvider } from "@/components/providers/server-cart-provider";

export const metadata = {
  title: "Barca Sports Store",
  description: "Next.js storefront backed by a mock PIM API, used for Coveo commerce enablement exercises",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="app-body">
        <MockServerCartProvider>
          <div className="bg-blue-950 text-white text-sm text-center py-2 px-4">
            Free shipping on orders over $99 · 30-day returns ·{" "}
            <Link href="/products" className="underline underline-offset-2 hover:text-blue-200">
              Shop now
            </Link>
          </div>

          <header className="sticky top-0 z-50 bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-16 gap-4">
                <Link href="/" className="flex items-center shrink-0">
                  <Image
                    src="/Coveo_Horizontal_Blue.svg"
                    alt="Coveo Logo"
                    width={120}
                    height={30}
                    className="h-8 w-auto"
                  />
                </Link>

                <div className="flex-1 max-w-xl">
                  {/* Basic search box backed by the PIM API. TODO (exercises 1 and 2): replace with a Coveo search box. */}
                  <Suspense>
                    <SearchBox />
                  </Suspense>
                </div>

                <div className="flex items-center justify-end w-12">
                  <CartLink />
                </div>
              </div>

              <nav
                aria-label="Categories"
                className="hidden md:flex items-center gap-8 h-11 border-t border-gray-100 text-sm"
              >
                <Link href="/products" className="font-semibold text-gray-900 hover:text-blue-600">
                  All Products
                </Link>
                {headerCategories.map((category) => (
                  <Link
                    key={category.label}
                    href={categoryHref(category.query)}
                    className="text-gray-700 hover:text-blue-600 transition-colors"
                  >
                    {category.label}
                  </Link>
                ))}
              </nav>
            </div>
          </header>

          <main className="min-h-[60vh]">{children}</main>

          <SiteFooter />
        </MockServerCartProvider>
      </body>
    </html>
  );
}
