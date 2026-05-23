import { useForm } from "react-hook-form";
import useAuth from "../../../hook/useAuth";
import { imageUpload } from "../../../../Util";
import axios from "axios";
import Swal from "sweetalert2";


const AddBooks = () => {
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // const 

  const onSubmit = async (data) => {

    const {title,author,price,status,description,image}=data
    // console.log(data)
    try {
      const imageFile = image[0];
      const imageURL = await imageUpload(imageFile);

      const bookData = {
        title,
        author,
        price: parseFloat(price),
        status,
        description,
        image: imageURL,
        createdAt: new Date(),
        librarian: {
          image: user?.photoURL,
          name: user?.displayName,
          email: user?.email,
        },
      };

      console.log(bookData)

      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/books`,
        bookData,
      );

       Swal.fire({
        icon: "success",
        title: "Book Added Successfully",
      });
      console.log(data);

      reset();
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Failed to Add Book",
        text: err.message,
      });
    }
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
        <div className="card w-full max-w-lg bg-base-100 shadow-xl border border-base-300">
          <div className="card-body">
            <h2 className="card-title text-2xl font-bold justify-center text-sky-500 mb-4">
              Add New Book
            </h2>

            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
              {/* Book Name */}
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-semibold">Book Name</span>
                </label>
                <input
                  {...register("title", { required: "Book name is required" })}
                  type="text"
                  className="input input-bordered w-full focus:input-primary"
                  placeholder="Enter book name"
                />
                {errors.title && (
                  <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
                )}
              </div>

              {/* Author Name */}
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-semibold">Author Name</span>
                </label>
                <input
                  {...register("author", { required: "Author name is required" })}
                  type="text"
                  className="input input-bordered w-full focus:input-primary"
                  placeholder="Author name"
                />
                {errors.author && (
                  <p className="text-red-500 text-sm mt-1">{errors.author.message}</p>
                )}
              </div>

              {/* Book Image */}
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-semibold">Book Image</span>
                </label>
                <input
                  type="file"
                  accept="image/*"
                  {...register("image", { required: "Image is required" })}
                  className="input input-bordered w-full focus:input-primary file-input"
                />
                {errors.image && (
                  <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>
                )}
              </div>

              {/* Price & Status  */}
              <div className="flex justify-between gap-3">
                {/* Price */}
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-semibold">Price ($)</span>
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    {...register("price", { required: "Price is required" })}
                    className="input input-bordered w-full focus:input-primary"
                    placeholder="Price"
                  />
                  {errors.price && (
                    <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>
                  )}
                </div>

                {/* Status */}
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-semibold">Status</span>
                  </label>
                  <select
                    {...register("status", { required: true })}
                    className="select select-bordered w-full focus:select-primary"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select status
                    </option>
                    <option value="Published">Published</option>
                    <option value="Unpublished">Unpublished</option>
                  </select>
                </div>
              </div>

              {/* Description */}
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-semibold">Description</span>
                </label>
                <textarea
                  {...register("description")}
                  className="textarea textarea-bordered w-full focus:textarea-primary"
                  placeholder="Short description (optional)"
                />
              </div>

              {/* Submit Button */}
              <div className="form-control mt-6">
                <button
                  type="submit"
                  className="btn bg-sky-500 text-white w-full text-lg hover:bg-sky-700 border-none"
                >
                  Add Book
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
  );
};

export default AddBooks;
