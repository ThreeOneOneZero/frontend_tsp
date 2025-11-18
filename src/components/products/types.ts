export interface Product {
  id: number;
  name: string;
  price: string;
  stock?: number;
}

export type ProductView = "table" | "grid" | "list";
