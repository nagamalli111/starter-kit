"use client";
import { Product as ProductType } from "./ProductList";
import { SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
export default function ProductForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductType>();

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

    axios
      .post("http://localhost:8080/api/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((respoonse) => {
        console.log(respoonse);
      })
      .catch((error) => {
        console.error(error);
      });
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
