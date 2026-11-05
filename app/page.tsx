import { RecommendationProvider } from "@/components/providers/providers";
import MostPurchasedRecommendations from "@/components/recommendations/most-purchased";
import MostViewedRecommendations from "@/components/recommendations/most-viewed";
import { fetchCoveoStaticState } from "@/lib/fetch-coveo-static-state";

export default async function Home() {
  const { staticState, navigatorContext } = await fetchCoveoStaticState("recommendationEngineDefinition", {
    recommendationsSlots: ["mostViewedHome", "mostPurchasedHome"],
    url: "https://sports.barca.group",
  });

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-900">Welcome to our commerce store</h2>

      <RecommendationProvider staticState={staticState} navigatorContext={navigatorContext.marshal}>
        <MostViewedRecommendations />
        <MostPurchasedRecommendations />
      </RecommendationProvider>
    </div>
  );
}

export const dynamic = "force-dynamic";
