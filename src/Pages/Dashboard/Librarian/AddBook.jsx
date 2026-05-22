// import React from 'react';

import { useForm } from "react-hook-form";
import { imageUpload } from "../../../../Util";
import axios from "axios";

const AddBook = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);

    const { bookName,bookAuthor, image, status, price } = data;
    const imageFile = image[0];
    const imageURL = imageUpload(imageFile);
    const bookData = {
      image: imageURL,
      bookName,
      bookAuthor,
      status,
      price: Number(price),
    };
    console.log(bookData);

    try {
      const { data } = axios.post(
        `${import.meta.env.VITE_API_URL}/books`,
        bookData,
      );

      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
        <div className="card w-full max-w-lg bg-base-100 shadow-xl border border-base-300">
          <div className="card-body">
            <h2 className="card-title text-2xl font-bold justify-center text-sky-500 mb-4">
              Add New Book
            </h2>

            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
              {/* Book Name Input */}
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-semibold">Book Name</span>
                </label>
                <input
                  {...register("bookName", { required: "Name is required" })}
                  type="text"
                  className="input input-bordered w-full focus:input-primary"
                  placeholder="Enter your name"
                />
              </div>

              {/* Book Image URL Input */}
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-semibold">
                    Book Image URL
                  </span>
                </label>
                <input
                  type="file"
                  {...register("image", {
                    required: "Profile image is required",
                  })}
                  className="input input-bordered w-full focus:input-primary file-input"
                />
              </div>

              {/* Book Author Input */}
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-semibold">Book Author</span>
                </label>
                <input
                  {...register("bookAuthor", { required: "Name is required" })}
                  type="text"
                  className="input input-bordered w-full focus:input-primary"
                  placeholder="Enter your name"
                />
              </div>

              {/* Status Dropdown */}
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-semibold">Status</span>
                </label>
                <select
                  name="status"
                  className="select select-bordered w-full focus:select-primary"
                  {...register("status", { required: "Name is required" })}
                >
                  <option value="published">Published</option>
                  <option value="unpublished">Unpublished</option>
                </select>
              </div>

              {/* Price Input */}
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-semibold">Price ($)</span>
                </label>
                <input
                  {...register("price", { required: "Name is required" })}
                  type="text"
                  className="input input-bordered w-full focus:input-primary"
                  placeholder="Enter your name"
                />
              </div>

              {/* Submit Button */}
              <div className="form-control mt-6">
                <button
                  type="submit"
                  className="btn bg-sky-500 text-white w-full text-lg hover:bg-sky-700"
                >
                  Add Book
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBook;
