import ProductList from "@/components/ProductList";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-between p-24">
      <ProductList />
    </div>
  );
}
