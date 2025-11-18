import { Card, Heading, Text, Flex } from "@radix-ui/themes";
import { Product } from "./types";
import type { en_US } from "../../i18n/en_US";

interface ProductCardProps {
  product: Product;
  translations: typeof en_US;
}

export function ProductCard({ product, translations: t }: ProductCardProps) {
  return (
    <Card style={{ cursor: "pointer" }}>
      <Flex direction="column" gap="2">
        <Heading size="4" weight="bold">
          {product.name}
        </Heading>
        <Text size="5" weight="bold" color="blue">
          {product.price}
        </Text>
        <Text size="2" color="gray">
          {t.products.list.stock}: {product.stock} {t.products.units}
        </Text>
      </Flex>
    </Card>
  );
}
