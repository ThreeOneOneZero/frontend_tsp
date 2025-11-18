import { Grid } from "@radix-ui/themes";
import { Product } from "./types";
import { ProductCard } from "./ProductCard";
import type { en_US } from "../../i18n/en_US";

interface ProductsGridProps {
  products: Product[];
  translations: typeof en_US;
}

export function ProductsGrid({ products, translations: t }: ProductsGridProps) {
  return (
    <Grid columns={{ initial: "1", sm: "2", lg: "3" }} gap="4" width="100%">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} translations={t} />
      ))}
    </Grid>
  );
}
