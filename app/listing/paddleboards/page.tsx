import FacetGenerator from "@/components/facets/facet-generator";
import Pagination from "@/components/pagination";
import ParameterManager from "@/components/parameter-manager";
import ProductList from "@/components/product-list";
import { ListingProvider } from "@/components/providers/providers";
import Sort from "@/components/sort";
import { fetchCoveoStaticState } from "@/lib/fetch-coveo-static-state";

export default async function ListingPage() {
  const { staticState, navigatorContext } = await fetchCoveoStaticState("listingEngineDefinition", {
    url: "/paddleboards",
  });

  return (
    <ListingProvider staticState={staticState} navigatorContext={navigatorContext.marshal}>
      <ParameterManager url={navigatorContext.location} />
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
          <aside className="order-1 lg:col-span-1">
            <FacetGenerator />
          </aside>
          <main className="order-2 lg:col-span-3">
            <div className="mb-4 flex justify-end">
              <Sort />
            </div>
            <ProductList />
            <div className="mt-6 flex justify-end">
              <Pagination />
            </div>
          </main>
        </div>
      </div>
    </ListingProvider>
  );
}

export const dynamic = "force-dynamic";
