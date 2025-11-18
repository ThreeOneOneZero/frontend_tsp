import * as Tabs from "@radix-ui/react-tabs";
import { useState, useEffect } from "react";
import { useI18n } from "../i18n";
import {
  ProductsTable,
  ProductsGrid,
  ProductsList,
  type Product,
} from "../components/products";

const products: Product[] = [
  { id: 1, name: "Laptop Dell XPS", price: "R$ 8.999", stock: 15 },
  { id: 2, name: "Mouse Logitech MX", price: "R$ 349", stock: 42 },
  { id: 3, name: "Teclado Mecânico", price: "R$ 599", stock: 28 },
  { id: 4, name: "Monitor LG 27''", price: "R$ 1.899" },
];

export function Products() {
  const { translations: t } = useI18n();
  const [loading, setLoading] = useState(false);

  // Simula carregamento ao trocar de aba
  const handleTabChange = () => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  };

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          {t.products.title}
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          {t.products.description}
        </p>
      </div>

      <Tabs.Root defaultValue="table" onValueChange={handleTabChange}>
        <Tabs.List className="flex gap-2 mb-6 border-b border-gray-200 dark:border-gray-700">
          <Tabs.Trigger
            value="table"
            className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-400 transition-colors"
          >
            📊 {t.products.tabs.table}
          </Tabs.Trigger>
          <Tabs.Trigger
            value="grid"
            className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-400 transition-colors"
          >
            🎯 {t.products.tabs.grid}
          </Tabs.Trigger>
          <Tabs.Trigger
            value="list"
            className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-400 transition-colors"
          >
            📋 {t.products.tabs.list}
          </Tabs.Trigger>
        </Tabs.List>

        <Tabs.Content value="table">
          <ProductsTable
            products={products}
            translations={t}
            loading={loading}
          />
        </Tabs.Content>

        <Tabs.Content value="grid">
          <ProductsGrid products={products} translations={t} />
        </Tabs.Content>

        <Tabs.Content value="list">
          <ProductsList products={products} translations={t} />
        </Tabs.Content>
      </Tabs.Root>
    </div>
  );
}
