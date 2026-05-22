// import React from 'react';

import { useForm } from "react-hook-form";

const AddBook = () => {
  const {
    // register,
    handleSubmit,
    // formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
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
                  type="text"
                  name="bookName"
                  placeholder="Enter book name"
                  className="input input-bordered w-full focus:input-primary"
                  required
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
                  type="url"
                  name="bookImage"
                  placeholder="https://example.com/book-cover.jpg"
                  className="input input-bordered w-full focus:input-primary"
                  required
                />
              </div>

              {/* Book Author Input */}
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-semibold">Book Author</span>
                </label>
                <input
                  type="text"
                  name="author"
                  placeholder="Enter author name"
                  className="input input-bordered w-full focus:input-primary"
                  required
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
                  type="number"
                  name="price"
                  placeholder="Enter book price"
                  className="input input-bordered w-full focus:input-primary"
                  // value={formData.price}
                  // onChange={handleChange}
                  min="0"
                  step="0.01"
                  required
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
