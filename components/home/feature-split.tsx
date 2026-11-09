import Image from "next/image";
import Link from "next/link";

// Image on one side, copy and a call to action on the other.
export default function FeatureSplit({
  eyebrow,
  title,
  body,
  cta,
  href,
  image,
  imageAlt,
  reverse = false,
}: {
  eyebrow: string;
  title: string;
  body: string;
  cta: string;
  href: string;
  image?: string;
  imageAlt: string;
  reverse?: boolean;
}) {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div
        className={`grid grid-cols-1 md:grid-cols-2 items-center gap-8 rounded-2xl bg-sky-50 overflow-hidden ${
          reverse ? "md:[&>*:first-child]:order-2" : ""
        }`}
      >
        <div className="relative h-72 md:h-96 bg-gradient-to-br from-sky-100 to-cyan-200">
          {image && (
            <Image
              src={image}
              alt={imageAlt}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-contain p-8"
            />
          )}
        </div>
        <div className="p-8 md:p-12">
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-700">{eyebrow}</p>
          <h2 className="mt-2 text-3xl font-bold text-gray-900">{title}</h2>
          <p className="mt-4 text-gray-700 leading-relaxed">{body}</p>
          <Link
            href={href}
            className="mt-6 inline-block rounded-full bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
          >
            {cta}
          </Link>
        </div>
      </div>
    </section>
  );
}
