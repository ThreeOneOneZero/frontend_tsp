import { Table } from "@radix-ui/themes";
import { Product } from "./types";
import { Skeleton } from "../loading";
import type { en_US } from "../../i18n/en_US";

interface ProductsTableProps {
  products: Product[];
  translations: typeof en_US;
  loading?: boolean;
  onRowClick?: (product: Product) => void;
}

export function ProductsTable({
  products,
  translations: t,
  loading = false,
  onRowClick,
}: ProductsTableProps) {
  if (loading) {
    return <Skeleton count={5} type="table-row" />;
  }

  return (
    <Table.Root>
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell>{t.products.list.id}</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>
            {t.products.list.name}
          </Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>
            {t.products.list.price}
          </Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell justify="center">
            {t.products.list.stock}
          </Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {products.map((product) => (
          <Table.Row
            key={product.id}
            onClick={() => onRowClick?.(product)}
            style={{ cursor: onRowClick ? "pointer" : "default" }}
          >
            <Table.Cell>#{product.id}</Table.Cell>
            <Table.Cell>{product.name}</Table.Cell>
            <Table.Cell>{product.price}</Table.Cell>
            <Table.Cell justify="center">{product.stock}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
}
