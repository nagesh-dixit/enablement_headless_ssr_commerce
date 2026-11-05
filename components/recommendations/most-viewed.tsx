"use client";

import { useMostViewedHome } from "@/lib/commerce-engine";
import ProductButtonWithImage from "../product-button-with-image";
import styles from "./most-viewed.module.css";

export default function MostViewedRecommendations() {
  const { state, methods } = useMostViewedHome();
  const products = state.products ?? [];

  return (
    <section className={styles.carousel}>
      <h3 className={styles.headline}>{state.headline}</h3>
      <ul className={styles.carouselContainer}>
        {products.map((product) => (
          <li key={product.ec_product_id} className={styles.productCard}>
            <ProductButtonWithImage methods={methods} product={product} />
          </li>
        ))}
      </ul>
    </section>
  );
}
