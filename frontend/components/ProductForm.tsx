"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { Product as ProductType } from "./ProductList";

export default function ProductForm() {
  const params = useParams();
  const router = useRouter();
  const { productId: id } = params;
  const isEditMode = Boolean(id);

  const [initialData, setInitialData] = useState<ProductType | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ProductType>({ defaultValues: initialData || undefined });

  useEffect(() => {
    if (isEditMode) {
      axios
        .get(`http://localhost:8080/api/products/${id}`)
        .then((response) => {
          setInitialData(response.data);
        })
        .catch((error) => {
          console.error("Error fetching product details", error);
        });
    }
  }, [id]);

  useEffect(() => {
    if (initialData) {
      reset(initialData); // Populate the form with the fetched data
    }
  }, [initialData, reset]);

  const onSubmit: SubmitHandler<ProductType> = (data) => {
    const formData = new FormData();
    // Append each field of Product directly as a part of 'product'
    formData.append(
      "product",
      new Blob(
        [
          JSON.stringify({
            name: data.name,
            description: data.description,
            price: data.price,
          }),
        ],
        { type: "application/json" }
      )
    );

    // Access the file input directly
    const imageFile = (data as any).image[0]; // Assumes 'image' is an array of files

    if (imageFile) {
      formData.append("imageFile", imageFile); // Ensure `imageFile` is a File object
    }

    const request = isEditMode
      ? axios.put(`http://localhost:8080/api/products/${id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
      : axios.post("http://localhost:8080/api/products", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

    request
      .then((response) => {
        console.log(response);
        router.push("/"); // Redirect after success
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="m-4">
      <form className="" onSubmit={handleSubmit(onSubmit)}>
        <label className="block text-gray-700 font-medium mb-2" htmlFor="name">
          Name
        </label>
        <input
          className="block w-full appearance-none border border-gray-400 rounded py-2 px-3 text-gray-700
        leading-tight focus:outline-none focus:border-indigo-500 mb-2"
          id="name"
          type="text"
          placeholder="Iphone 17"
          {...register("name", { required: "Name is mandatory" })}
        />
        {errors.name && (
          <p className="text-red-500 text-xs italic">{errors.name.message}</p>
        )}

        <label className="block text-gray-700 font-medium mb-2" htmlFor="name">
          Description
        </label>
        <input
          className="block w-full appearance-none border border-gray-400 rounded py-2 px-3 text-gray-700
        leading-tight focus:outline-none focus:border-indigo-500 mb-2"
          {...register("description")}
        />
        <div>
          <input
            {...register("image")}
            className="block w-full appearance-none  mb-2"
            type="file"
          ></input>
        </div>
        <button
          className="bg-indigo-500 hover:bg-indigo-700 text-white font-medium py-2 px-3 rounded 
          focus:outline-none focus:shadow-outline"
          type="submit"
        >
          submit
        </button>
      </form>
    </div>
  );
}
