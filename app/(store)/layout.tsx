// Shared padding for the inner store pages. The home page (app/page.tsx) sits outside this
// route group so its sections can span the full width. Route groups don't change URLs.
export default function StoreLayout({ children }: { children: React.ReactNode }) {
  return <div className="p-8">{children}</div>;
}
