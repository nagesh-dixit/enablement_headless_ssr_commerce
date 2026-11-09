# Next.js Coveo SSR Commerce (Training Project)

> **Note:** This project is for training purposes.

This `main` branch is the **starter**: a Next.js storefront whose home page lists every product
straight from a backend PIM API. Like many PIM and commerce backends, that API only returns raw
product data: no keyword search, relevance, facets, or personalization. Each exercise adds a Coveo
capability on top of it.

No account is needed. The app serves the PIM API itself, at `/api/pim`, from the Barca catalog in
[`data/catalog.json`](data/catalog.json) (the same products that are indexed in Coveo).

The finished app is on the [`solutions`](../../tree/solutions) branch.

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/coveo-labs/enablement_headless_ssr_commerce.git
cd enablement_headless_ssr_commerce
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## What's in the starter

| Path                                                         | What it does                                                                                                                                                         |
| ------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`app/page.tsx`](app/page.tsx)                               | Home page. Server-renders the catalog from the PIM API, 48 products per page.                                                                                        |
| [`app/products/[sku]/page.tsx`](app/products/[sku]/page.tsx) | Product detail page (`/products/<sku>`). Same path as the product URLs in the Coveo index, so search results can link to it. Variant SKUs redirect to their product. |
| [`app/cart/page.tsx`](app/cart/page.tsx)                     | Mock cart stored in a cookie ([`lib/cart-actions.ts`](lib/cart-actions.ts)).                                                                                         |
| [`app/api/pim/`](app/api/pim/)                               | Mock PIM API: `GET /api/pim/products?offset=&limit=` and `GET /api/pim/products/{sku}`.                                                                              |
| [`lib/pim/client.ts`](lib/pim/client.ts)                     | HTTP client the pages use to call the PIM API.                                                                                                                       |
| [`data/catalog.json`](data/catalog.json)                     | The catalog: an array of `Product` objects ([`lib/pim/types.ts`](lib/pim/types.ts)).                                                                                 |

### Using another backend

The pages only talk to the PIM API over HTTP. To use a different backend, set `PIM_API_URL` in
`.env.local` to a service that returns the same JSON (see `.env.example`).

## Exercises

1. **Hosted search page:** add a search box and a `/search` page that embeds a Coveo hosted search page.
2. **Atomic SSR search page:** replace the hosted page with a server-rendered Coveo Atomic search page.
3. **Listing pages:** add category listing pages powered by Coveo.
4. **Recommendations:** add recommendation carousels to the home page.

Look for `TODO (exercise ...)` and `TODO (later exercise)` comments in the code for where each one plugs in.

## Available Scripts

- `npm run dev` – Start the development server.
- `npm run build` – Build the application for production.
- `npm run start` – Start the production server.
- `npm run lint` – Run ESLint.
- `npm run format` – Format code using Prettier.
