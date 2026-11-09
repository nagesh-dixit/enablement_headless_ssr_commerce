import Link from "next/link";

// Previous / Next links. `hrefForPage` builds the URL of a given page number.
export default function SimplePagination({
  page,
  pageCount,
  hrefForPage,
}: {
  page: number;
  pageCount: number;
  hrefForPage: (page: number) => string;
}) {
  if (pageCount <= 1) return null;

  return (
    <nav className="flex items-center justify-center gap-4" aria-label="Pagination">
      {page > 1 ? (
        <Link href={hrefForPage(page - 1)} className="text-blue-600 hover:underline">
          Previous
        </Link>
      ) : (
        <span className="text-gray-400">Previous</span>
      )}
      <span className="text-gray-700">
        Page {page} of {pageCount}
      </span>
      {page < pageCount ? (
        <Link href={hrefForPage(page + 1)} className="text-blue-600 hover:underline">
          Next
        </Link>
      ) : (
        <span className="text-gray-400">Next</span>
      )}
    </nav>
  );
}
