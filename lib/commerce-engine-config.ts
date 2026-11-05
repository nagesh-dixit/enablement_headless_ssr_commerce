// lib/commerce-engine-config.ts
import {
  CommerceEngineDefinitionOptions,
  defineProductList,
  defineCart,
  defineSearchBox,
  defineRecommendations,
  defineContext,
  defineSummary,
  defineStandaloneSearchBox,
  defineInstantProducts,
  defineParameterManager,
  defineFacetGenerator,
  defineSort,
  definePagination,
  defineProductView,
  ContextState,
} from "@coveo/headless-react/ssr-commerce";

export const defaultContext: {
  language: string;
  country: string;
  currency: ContextState["currency"];
} = {
  language: "en",
  country: "US",
  currency: "USD",
};

export default {
  configuration: {
    organizationId: process.env.NEXT_PUBLIC_COVEO_ORGANIZATION_ID!,
    accessToken: process.env.NEXT_PUBLIC_COVEO_ACCESS_TOKEN!,
    context: {
      ...defaultContext,
      view: {
        url: process.env.NEXT_PUBLIC_COVEO_VIEW_URL!,
      },
    },
    analytics: {
      trackingId: process.env.NEXT_PUBLIC_COVEO_TRACKING_ID!,
    },
  },
  controllers: {
    cart: defineCart(),
    context: defineContext(),
    summary: defineSummary(),
    productList: defineProductList(),
    searchBox: defineSearchBox(),
    standaloneSearchBox: defineStandaloneSearchBox({
      options: { redirectionUrl: "/search" },
    }),
    instantProducts: defineInstantProducts(),
    parameterManager: defineParameterManager(),
    facetGenerator: defineFacetGenerator(),
    sort: defineSort(),
    pagination: definePagination(),
    productView: defineProductView(),
    mostViewedHome: defineRecommendations({
      options: {
        slotId: process.env.NEXT_PUBLIC_COVEO_SLOT_ID_MOST_VIEWED_HOME!,
      },
    }),
    mostPurchasedHome: defineRecommendations({
      options: {
        slotId: process.env.NEXT_PUBLIC_COVEO_SLOT_ID_MOST_PURCHASED_HOME!,
      },
    }),
  },
} satisfies CommerceEngineDefinitionOptions;
