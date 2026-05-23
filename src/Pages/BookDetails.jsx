import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router";
import Loading from "../Components/Loading";
import useAuth from "../hook/useAuth";

const BookDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();

  const {
    data: book = {},
    isLoading,
    // refetch,
  } = useQuery({
    queryKey: ["book", id],
    queryFn: async () => {
      const result = await axios(`${import.meta.env.VITE_API_URL}/books/${id}`);
      return result.data;
    },
  });

  const { _id, author, description, image, librarian, price, title } = book;

  // Mock authenticated user context (Apnar dynamic authentication system/context thakle user data oikhan theke ashbe)

  // Form Submission Handler
  // const handlePlaceOrder = async (e) => {
  //   e.preventDefault();
  //   const form = e.target;

  //   const orderData = {
  //     bookId: id,
  //     bookTitle: book.title,
  //     price: book.price,
  //     buyerName: librarian.name,
  //     buyerEmail: librarian.email,
  //     phone: form.phone.value,
  //     address: form.address.value,
  //     orderDate: new Date(),
  //   };

  //   console.log("Submitting Order Data:", orderData);

  //   // Ekhane apnar order post api request handle korte parben, example:
  //   // const result = await axios.post(`${import.meta.env.VITE_API_URL}/create-checout-session`, orderData)

  //   alert("Order Placed Successfully!");
  //   document.getElementById("order_modal").close();
  //   form.reset();
  // };

  const handlePayment = async () => {
    const paymentInfo = {
      bookId: _id,
      author,
      description,
      image,
      price,
      title,
      librarian: {
        Lname: user?.displayName  || "No Name Provided",
        Lemail: user?.email || "No Email Provided",
        Limage: user?.photoURL  || "",
      },
    };

    const {data} = await axios.post(
      `${import.meta.env.VITE_API_URL}/create-checout-session`,
      paymentInfo,
    );

    window.location.href=data.url
    // console.log(data.url);
  };

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 sm:p-10">
          {/* Left Column: Book Cover Showcase */}
          <div className="flex justify-center items-center bg-gray-100 rounded-xl p-8 h-112 overflow-hidden group">
            <img
              src={image}
              alt={title}
              className="h-full object-contain rounded-md shadow-md transition-transform duration-500 group-hover:scale-105"
            />
          </div>

          {/* Right Column: Book Content Details */}
          <div className="flex flex-col justify-between">
            <div>
              {/* Badge/Genre */}
              <div className="flex gap-2 mb-3">
                <span className="badge badge-info gap-1 text-white text-xs font-semibold px-3 py-2">
                  {book.genre || "General"}
                </span>
                <span className="badge badge-success badge-outline text-xs font-semibold px-3 py-2">
                  In Stock
                </span>
              </div>

              {/* Title & Author */}
              <h1 className="text-3xl font-extrabold text-[#003366] tracking-tight mb-2">
                {title}
              </h1>
              <p className="text-lg text-gray-500 mb-6 font-medium">
                By {author}
              </p>

              {/* Pricing Display */}
              <div className="bg-sky-50/50 inline-flex items-center gap-2 px-4 py-2 rounded-xl mb-6">
                <span className="text-gray-500 text-sm font-medium">
                  Price:
                </span>
                <span className="text-sky-500 text-2xl font-black flex items-center gap-1">
                  <span className="font-sans">৳</span>
                  {price}
                </span>
              </div>

              {/* Description */}
              <div className="border-t border-gray-100 pt-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-2">
                  Description
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm">
                  {description || "No description available for this book."}
                </p>
              </div>
            </div>

            {/* Action Trigger Button */}
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

      {/* --- DaisyUI Clean Modal --- */}
      <dialog id="order_modal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box max-w-md bg-white rounded-2xl p-6 relative">
          {/* Close Button Cross */}
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4 text-gray-400 hover:text-gray-600">
              ✕
            </button>
          </form>

          {/* Modal Header */}
          <h3 className="font-bold text-xl text-[#003366] mb-1">
            Confirm Your Order
          </h3>
          <p className="text-xs text-gray-400 mb-6">
            Please provide your details below to finalize the request.
          </p>

          {/* Checkout Form Container */}
          <form className="space-y-4">
            {/* Name Input (Read-only) */}
            <div className="form-control w-full">
              <label className="label py-1">
                <span className="label-text font-semibold text-gray-600 text-xs">
                  Full Name
                </span>
              </label>
              <input
                type="text"
                value={librarian?.name || ""}
                readOnly
                className="input input-bordered w-full bg-gray-50 text-gray-500 border-gray-200 cursor-not-allowed text-sm rounded-xl focus:outline-none"
              />
            </div>

            {/* Email Input (Read-only) */}
            <div className="form-control w-full">
              <label className="label py-1">
                <span className="label-text font-semibold text-gray-600 text-xs">
                  Email Address
                </span>
              </label>
              <input
                type="email"
                value={librarian?.email || ""}
                readOnly
                className="input input-bordered w-full bg-gray-50 text-gray-500 border-gray-200 cursor-not-allowed text-sm rounded-xl focus:outline-none"
              />
            </div>

            {/* Phone Input */}
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

            {/* Address Input */}
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

            {/* Submission Button */}
            <div className="pt-2">
              <button
                onClick={handlePayment}
                type="submit"
                className="btn btn-block bg-[#003366] hover:bg-[#002244] border-none text-white font-semibold rounded-xl tracking-wide shadow-md"
              >
                Place Order
              </button>
            </div>
          </form>
        </div>

        {/* Click outside to close layout helper */}
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
