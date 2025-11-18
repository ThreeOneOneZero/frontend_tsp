import { Flex, Card, Text, Heading } from "@radix-ui/themes";
import { Product } from "./types";
import type { en_US } from "../../i18n/en_US";

interface ProductsListProps {
  products: Product[];
  translations: typeof en_US;
}

export function ProductsList({ products, translations: t }: ProductsListProps) {
  return (
    <Flex direction="column" gap="3" width="100%">
      {products.map((product) => (
        <Card key={product.id} style={{ cursor: "pointer" }}>
          <Flex justify="between" align="center" width="100%">
            <Flex direction="column" gap="1">
              <Heading size="4" weight="bold">
                {product.name}
              </Heading>
              <Text size="1" color="gray">
                ID: #{product.id}
              </Text>
            </Flex>
            <Flex direction="column" align="end" gap="1">
              <Text size="4" weight="bold" color="blue">
                {product.price}
              </Text>
              <Text size="1" color="gray">
                {product.stock} {t.products.units}
              </Text>
            </Flex>
          </Flex>
        </Card>
      ))}
    </Flex>
  );
}
