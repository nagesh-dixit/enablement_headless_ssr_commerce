import Image from "next/image";
import Link from "next/link";
import { ArrowPathIcon, LockClosedIcon, ShieldCheckIcon, TruckIcon } from "@heroicons/react/24/outline";
import FeatureSplit from "@/components/home/feature-split";
import NewsletterSignup from "@/components/home/newsletter-signup";
import ProductRow from "@/components/home/product-row";
import { getProducts } from "@/lib/pim/client";
import type { Product } from "@/lib/pim/types";
import { categoryHref, topCategories } from "@/lib/store-nav";

// Home page. Every product and image on it comes from the PIM API (see app/api/pim).
// The featured rows are hand-picked categories in catalog order: the same for every shopper,
// with no ranking by popularity or personalization.
// TODO (later exercise): replace the featured rows with Coveo recommendations.

/** Fetches products for a section; a failed section renders empty instead of breaking the page. */
async function productsFor(query: string, limit: number): Promise<Product[]> {
  try {
    return (await getProducts(0, limit, query)).results;
  } catch (e) {
    console.error(`Could not load home page products for "${query}":`, e);
    return [];
  }
}

const perks = [
  { icon: TruckIcon, title: "Free shipping", text: "On orders over $99" },
  { icon: ArrowPathIcon, title: "30-day returns", text: "No questions asked" },
  { icon: ShieldCheckIcon, title: "2-year warranty", text: "On all boards" },
  { icon: LockClosedIcon, title: "Secure checkout", text: "Your data stays safe" },
];

export default async function Home() {
  const [paddleboards, surfboards, kayaks, beachToys, ...categoryProducts] = await Promise.all([
    productsFor("Stand Up Paddleboards", 8),
    productsFor("Surfboards", 4),
    productsFor("Kayaks", 1),
    productsFor("Pool & Beach Toys", 1),
    ...topCategories.map((category) => productsFor(category.query, 1)),
  ]);

  const heroImage = paddleboards[0]?.images[0];

  return (
    <div className="space-y-16 pb-4">
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-950 via-blue-800 to-cyan-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 grid grid-cols-1 md:grid-cols-2 items-center gap-10">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-cyan-200">New season, new adventures</p>
            <h1 className="mt-3 text-4xl md:text-6xl font-extrabold leading-tight">
              Gear up for your next day on the water
            </h1>
            <p className="mt-5 text-lg text-blue-100 max-w-lg">
              Paddleboards, kayaks, surfboards, and beach essentials, ready to ship.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={categoryHref("Stand Up Paddleboards")}
                className="rounded-full bg-white px-6 py-3 font-semibold text-blue-950 hover:bg-blue-100"
              >
                Shop paddleboards
              </Link>
              <Link
                href="/products"
                className="rounded-full border border-white/70 px-6 py-3 font-semibold text-white hover:bg-white/10"
              >
                Browse all products
              </Link>
            </div>
          </div>
          <div className="relative h-72 md:h-[26rem]">
            {heroImage && (
              <Image
                src={heroImage}
                alt={paddleboards[0].name}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-contain drop-shadow-2xl"
              />
            )}
          </div>
        </div>
      </section>

      {/* Perks */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <ul className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {perks.map(({ icon: Icon, title, text }) => (
            <li key={title} className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-4">
              <Icon className="h-8 w-8 shrink-0 text-blue-600" aria-hidden="true" />
              <div>
                <p className="font-semibold text-gray-900">{title}</p>
                <p className="text-sm text-gray-600">{text}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Shop by category */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">Shop by category</h2>
        <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {topCategories.map((category, index) => {
            const image = categoryProducts[index][0]?.images[0];
            return (
              <li key={category.label}>
                <Link
                  href={categoryHref(category.query)}
                  className="group block h-full rounded-xl border border-gray-200 bg-white p-4 text-center hover:border-blue-300 hover:shadow-md transition"
                >
                  <div className="relative h-28 mb-3 rounded-lg bg-gray-50">
                    {image && (
                      <Image
                        src={image}
                        alt=""
                        fill
                        sizes="200px"
                        className="object-contain p-2 transition-transform group-hover:scale-105"
                      />
                    )}
                  </div>
                  <p className="font-semibold text-gray-900 group-hover:text-blue-600">{category.label}</p>
                  <p className="mt-1 text-xs text-gray-500">{category.blurb}</p>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      <ProductRow
        title="Stand up paddleboards"
        subtitle="Stable, packable boards for flat water and waves."
        products={paddleboards}
        shopAllHref={categoryHref("Stand Up Paddleboards")}
      />

      <FeatureSplit
        eyebrow="Explore further"
        title="Built for the open water"
        body="From sit-on-top recreational kayaks to touring models with dry storage, find a boat that fits how you paddle."
        cta="Shop kayaks"
        href={categoryHref("Kayaks")}
        image={kayaks[0]?.images[0]}
        imageAlt={kayaks[0]?.name ?? "Kayak"}
      />

      <ProductRow
        title="Surfboards"
        subtitle="Longboards, shortboards, and soft tops for every level."
        products={surfboards}
        shopAllHref={categoryHref("Surfboards")}
      />

      <FeatureSplit
        eyebrow="For the whole family"
        title="Make a splash"
        body="Floats, beach games, and pool toys for long summer afternoons."
        cta="Shop pool & beach toys"
        href={categoryHref("Pool & Beach Toys")}
        image={beachToys[0]?.images[0]}
        imageAlt={beachToys[0]?.name ?? "Beach toy"}
        reverse
      />

      <NewsletterSignup />
    </div>
  );
}

export const dynamic = "force-dynamic";
