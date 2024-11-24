"use client";
import { useEffect, useState } from "react";
import { Product as ProductType } from "./ProductList";
import httpClient from "@/lib/httpClient";
import axios from "axios";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";

interface ProductProps {
  product: ProductType;
}
export default function Product({ product }: ProductProps) {
  const imageBlob = product.image;

  const [blobURL, setBlobURL] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    // Use axios.get with responseType: 'blob' to fetch the image
    axios
      .get("http://localhost:8080/api/products/" + product.id + "/image", {
        signal, // Pass the signal for aborting the request
        responseType: "blob", // Tells Axios to treat the response as a blob
      })
      .then((res) => {
        // Create a URL for the blob and set it to the state
        setBlobURL(URL.createObjectURL(res.data));
      })
      .catch((error) => {
        if (error.name !== "AbortError") {
          console.error("Error fetching image:", error);
        }
      });

    // Cleanup the abort controller on component unmount or product change
    return () => controller.abort();
  }, [product.id]); // Trigger the effect when the product id changes

  function showAlert(
    message: string,
    event: React.MouseEvent<HTMLButtonElement>
  ) {
    event.preventDefault();
    alert(message);
  }
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>{product.name}</CardTitle>
          <CardDescription>{product.description}</CardDescription>
        </CardHeader>
        <CardContent>
          {blobURL && (
            <img
              src={blobURL}
              id="myImg"
              width="100%"
              height="60%"
              className="rounded"
              alt="Image preview" // Optional but recommended for accessibility
            />
          )}

          <p>${product.price}</p>
        </CardContent>
        <CardFooter>
          <Button onClick={(event) => showAlert(product.name, event)}>
            Add to cart
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}
