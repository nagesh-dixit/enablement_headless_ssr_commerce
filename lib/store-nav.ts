// Store navigation shared by the header, home page, and footer.
//
// For now each category link runs the PIM API's basic keyword search on the category name
// (product categories are part of what it matches).
// TODO (later exercise): point these at Coveo-powered listing pages.

export const categoryHref = (category: string) => `/search?q=${encodeURIComponent(category)}`;

/** Links in the header's category bar. `query` is the category name the link searches for. */
export const headerCategories = [
  { label: "Paddleboards", query: "Stand Up Paddleboards" },
  { label: "Kayaks & Canoes", query: "Canoes & Kayaks" },
  { label: "Surf", query: "Surfboards" },
  { label: "Wetsuits", query: "Wetsuits" },
  { label: "Clothing", query: "Clothing" },
  { label: "Shoes & Sandals", query: "Shoes & Sandals" },
  { label: "Games & Toys", query: "Games & Toys" },
];

/** Top-level catalog categories, shown as tiles on the home page and in the footer. */
export const topCategories = [
  { label: "Skis & Boards", query: "Skis & Boards", blurb: "Paddleboards, surfboards, wakeboards" },
  { label: "Canoes & Kayaks", query: "Canoes & Kayaks", blurb: "Kayaks, canoes, paddles" },
  { label: "Clothing", query: "Clothing", blurb: "Rashguards, swimwear, tees" },
  { label: "Shoes & Sandals", query: "Shoes & Sandals", blurb: "Water shoes and sandals" },
  { label: "Accessories", query: "Accessories", blurb: "Bags, wetsuits, towels" },
  { label: "Games & Toys", query: "Games & Toys", blurb: "Floats, tubes, beach games" },
];
