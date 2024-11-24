"use client";
import { useEffect, useState } from "react";
import httpClient from "@/lib/httpClient";
import Product from "./Product";

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image?: File;
}

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    httpClient
      .get<Product[]>("/api/products")
      .then((res) => setProducts(res.data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  return (
    <div className="grid grid-cols-4 gap-4 w-full">
      {products.map((product) => (
        <div key={product.id} className="rounded-sm">
          <Product product={product} />
        </div>
      ))}
    </div>
  );
}
