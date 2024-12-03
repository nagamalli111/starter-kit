"use client";
import ProductForm from "@/components/ProductForm";
import { useParams } from "next/navigation";

export default function UpdateProduct() {
  const params = useParams();

  return (
    <main>
      <div>
        <h1>Dashboard</h1>
        <p>Params are {params.productId}</p>
        <ProductForm />
      </div>
    </main>
  );
}
