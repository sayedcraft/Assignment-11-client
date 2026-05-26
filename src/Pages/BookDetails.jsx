import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams, useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAuth from "../hook/useAuth";
import Loading from "../Components/Loading";

const BookDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const { data: book = {}, isLoading } = useQuery({
    queryKey: ["book", id],
    queryFn: async () => {
      const result = await axios(`${import.meta.env.VITE_API_URL}/books/${id}`);
      return result.data;
    },
  });

  const { _id, author, description, image, price, title } = book;

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    const orderInfo = {
      bookId: _id,
      name: title,
      author,
      description,
      image,
      amount: price,
      customer: user?.email || "No Email Provided",
      customerName: user?.displayName || "No Name Provided",
      phone: e.target.phone.value,
      address: e.target.address.value,
    };

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/orders`,
        orderInfo,
      );

      if (data.insertedId) {
        document.getElementById("order_modal").close();

        Swal.fire({
          title: "Order Placed!",
          text: "Your order is pending. Please complete the payment from My Orders.",
          icon: "success",
          confirmButtonColor: "#003366",
        });

        navigate("/dashboard/myOrder");
      }
    } catch (error) {
      console.error("Order placement failed:", error);
      Swal.fire("Error", "Something went wrong while placing order", "error");
    }
  };

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 sm:p-10">
          <div className="flex justify-center items-center bg-gray-100 rounded-xl p-8 h-112 overflow-hidden group">
            <img
              src={image}
              alt={title}
              className="h-full object-contain rounded-md shadow-md transition-transform duration-500 group-hover:scale-105"
            />
          </div>

          <div className="flex flex-col justify-between">
            <div>
              <div className="flex gap-2 mb-3">
                <span className="badge badge-info gap-1 text-white text-xs font-semibold px-3 py-2">
                  {book.genre || "General"}
                </span>
                <span className="badge badge-success badge-outline text-xs font-semibold px-3 py-2">
                  In Stock
                </span>
              </div>

              <h1 className="text-3xl font-extrabold text-[#003366] tracking-tight mb-2">
                {title}
              </h1>
              <p className="text-lg text-gray-500 mb-6 font-medium">
                By {author}
              </p>

              <div className="bg-sky-50/50 inline-flex items-center gap-2 px-4 py-2 rounded-xl mb-6">
                <span className="text-gray-500 text-sm font-medium">
                  Price:
                </span>
                <span className="text-sky-500 text-2xl font-black flex items-center gap-1">
                  <span className="font-sans">৳</span>
                  {price}
                </span>
              </div>

              <div className="border-t border-gray-100 pt-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-2">
                  Description
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm">
                  {description || "No description available for this book."}
                </p>
              </div>
            </div>

            <div className="mt-8">
              <button
                className="btn btn-block bg-sky-500 hover:bg-sky-600 border-none text-white font-bold text-lg rounded-xl shadow-lg shadow-sky-500/20 transition-all duration-300 active:scale-[0.98]"
                onClick={() =>
                  document.getElementById("order_modal").showModal()
                }
              >
                Order Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* /* --- DaisyUI Clean Modal --- */}
      <dialog id="order_modal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box max-w-md bg-white rounded-2xl p-6 relative">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4 text-gray-400 hover:text-gray-600">
              ✕
            </button>
          </form>

          <h3 className="font-bold text-xl text-[#003366] mb-1">
            Confirm Your Order
          </h3>
          <p className="text-xs text-gray-400 mb-6">
            Please provide your details below to finalize the request.
          </p>

          <form onSubmit={handlePlaceOrder} className="space-y-4">
            <div className="form-control w-full">
              <label className="label py-1">
                <span className="label-text font-semibold text-gray-600 text-xs">
                  Full Name
                </span>
              </label>
              <input
                type="text"
                value={user?.displayName || ""}
                readOnly
                className="input input-bordered w-full bg-gray-50 text-gray-500 border-gray-200 cursor-not-allowed text-sm rounded-xl focus:outline-none"
              />
            </div>

            <div className="form-control w-full">
              <label className="label py-1">
                <span className="label-text font-semibold text-gray-600 text-xs">
                  Email Address
                </span>
              </label>
              <input
                type="email"
                value={user?.email || ""}
                readOnly
                className="input input-bordered w-full bg-gray-50 text-gray-500 border-gray-200 cursor-not-allowed text-sm rounded-xl focus:outline-none"
              />
            </div>

            <div className="form-control w-full">
              <label className="label py-1">
                <span className="label-text font-semibold text-gray-700 text-xs">
                  Phone Number
                </span>
              </label>
              <input
                type="tel"
                name="phone"
                required
                placeholder="e.g., +880 1712-XXXXXX"
                className="input input-bordered w-full text-gray-800 border-gray-200 bg-white text-sm rounded-xl focus:border-sky-400 focus:outline-none"
              />
            </div>

            <div className="form-control w-full">
              <label className="label py-1">
                <span className="label-text font-semibold text-gray-700 text-xs">
                  Delivery Address
                </span>
              </label>
              <textarea
                name="address"
                required
                rows="3"
                placeholder="Enter full home address, area and city details"
                className="textarea textarea-bordered w-full text-gray-800 border-gray-200 bg-white text-sm rounded-xl focus:border-sky-400 focus:outline-none resize-none"
              ></textarea>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="btn btn-block bg-[#003366] hover:bg-[#002244] border-none text-white font-semibold rounded-xl tracking-wide shadow-md"
              >
                Place Order
              </button>
            </div>
          </form>
        </div>

        <form
          method="dialog"
          className="modal-backdrop bg-black/40 backdrop-blur-xs"
        >
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default BookDetails;
