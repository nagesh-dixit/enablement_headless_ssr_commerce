"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

// Plain search box: sends the shopper to /search?q=... on submit.
// No query suggestions or instant results; those come with Coveo in the exercises.
export default function SearchBox() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") ?? "");

  // Keep the box in sync with the URL (e.g. browser back/forward).
  useEffect(() => {
    setQuery(searchParams.get("q") ?? "");
  }, [searchParams]);

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    const q = query.trim();
    if (q) router.push(`/search?q=${encodeURIComponent(q)}`);
  };

  return (
    <form role="search" onSubmit={onSubmit} className="flex items-stretch w-full max-w-md">
      <input
        type="search"
        name="q"
        aria-label="Search products"
        placeholder="Search products..."
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        className="flex-1 bg-white border border-gray-200 border-r-0 px-4 py-2.5 rounded-l-lg text-gray-900 placeholder-gray-500 shadow-sm focus:border-blue-400 focus:ring-2 focus:ring-blue-200 focus:outline-none"
      />
      <button
        type="submit"
        aria-label="Search"
        className="bg-blue-600 text-white px-4 border border-blue-600 rounded-r-lg hover:bg-blue-700 hover:border-blue-700 flex items-center justify-center"
      >
        <MagnifyingGlassIcon className="h-4 w-4" />
      </button>
    </form>
  );
}
