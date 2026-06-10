import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams, useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAuth from "../hook/useAuth";
import Loading from "../Components/Loading";
import { FiTruck, FiRefreshCw, FiShield, FiUser, FiLayers, FiGlobe } from "react-icons/fi";

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

  const { _id, author, description, image, price, title, genre, publisher, language, pageCount } = book;

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
          confirmButtonColor: "#38bdf8",
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
    <div className="min-h-screen bg-slate-50 py-8 md:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Main Product Layout Card */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 p-4 sm:p-8 lg:p-10">
          
          {/* Left Column: Image Area */}
          <div className="md:col-span-5 flex flex-col items-center justify-start bg-slate-50 rounded-2xl p-6 h-80 sm:h-112 md:h-[480px] lg:h-[520px] relative overflow-hidden group border border-slate-100">
            <img
              src={image}
              alt={title}
              className="h-full w-auto object-contain rounded-xl shadow-md transition-transform duration-500 group-hover:scale-102"
            />
          </div>

          {/* Right Column: Information Content */}
          <div className="md:col-span-7 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              {/* Badges */}
              <div className="flex flex-wrap gap-2">
                <span className="bg-sky-50 text-sky-600 text-xs font-bold px-3 py-1 rounded-xl border border-sky-100/50">
                  {genre || "General"}
                </span>
                <span className="bg-emerald-50 text-emerald-600 text-xs font-bold px-3 py-1 rounded-xl border border-emerald-100/50">
                  In Stock
                </span>
              </div>

              {/* Title & Author */}
              <div className="space-y-1">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-800 tracking-tight leading-tight">
                  {title}
                </h1>
                <p className="text-sm sm:text-base font-semibold text-slate-500 flex items-center gap-1.5">
                  <FiUser className="text-slate-400" /> By <span className="text-slate-700 font-bold">{author}</span>
                </p>
              </div>

              {/* Pricing Display */}
              <div className="bg-sky-50/60 inline-flex items-center gap-3 px-5 py-2.5 rounded-2xl border border-sky-100/40">
                <span className="text-slate-500 text-xs sm:text-sm font-bold uppercase tracking-wider">Price:</span>
                <span className="text-sky-500 text-2xl sm:text-3xl font-black flex items-center gap-0.5">
                  <span className="font-sans">৳</span>{price}
                </span>
              </div>

              {/* Premium Features / Trust Badges */}
              <div className="grid grid-cols-3 gap-2 sm:gap-4 py-2 border-y border-slate-100 text-center">
                <div className="flex flex-col items-center p-2 rounded-xl bg-slate-50/60">
                  <FiTruck className="text-sky-500 text-lg mb-1" />
                  <span className="text-[10px] sm:text-xs font-bold text-slate-700">Fast Courier</span>
                  <span className="text-[9px] font-medium text-slate-400">24-48 Hours</span>
                </div>
                <div className="flex flex-col items-center p-2 rounded-xl bg-slate-50/60">
                  <FiRefreshCw className="text-indigo-500 text-lg mb-1" />
                  <span className="text-[10px] sm:text-xs font-bold text-slate-700">Happy Return</span>
                  <span className="text-[9px] font-medium text-slate-400">7 Days Policy</span>
                </div>
                <div className="flex flex-col items-center p-2 rounded-xl bg-slate-50/60">
                  <FiShield className="text-emerald-500 text-lg mb-1" />
                  <span className="text-[10px] sm:text-xs font-bold text-slate-700">100% Original</span>
                  <span className="text-[9px] font-medium text-slate-400">Official Resource</span>
                </div>
              </div>

              {/* Full Description */}
              <div className="space-y-2">
                <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400">Book Summary</h3>
                <p className="text-slate-600 leading-relaxed text-xs sm:text-sm font-medium">
                  {description || "No description available for this book."}
                </p>
              </div>
            </div>

            {/* CTA Order Button */}
            <div className="pt-4">
              <button
                className="btn btn-block bg-sky-500 hover:bg-sky-600 border-none text-white font-bold text-base sm:text-lg h-12 sm:h-14 min-h-[48px] rounded-2xl shadow-lg shadow-sky-500/10 transition-all duration-300 active:scale-[0.99] cursor-pointer"
                onClick={() => document.getElementById("order_modal").showModal()}
              >
                Order Now
              </button>
            </div>
          </div>
        </div>

        {/* Specification Section */}
        <div className="bg-white rounded-3xl border border-slate-100 p-6 sm:p-8 shadow-sm space-y-4">
          <h3 className="text-base sm:text-lg font-bold text-slate-800 tracking-tight border-b border-slate-100 pb-3">
            Product Specifications
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3 text-xs sm:text-sm">
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-400 font-semibold flex items-center gap-2"><FiUser /> Author</span>
              <span className="text-slate-700 font-bold">{author}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-400 font-semibold flex items-center gap-2"><FiLayers /> Publisher</span>
              <span className="text-slate-700 font-bold">{publisher || "Not Found"}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-100 sm:border-none">
              <span className="text-slate-400 font-semibold flex items-center gap-2"><FiGlobe /> Language</span>
              <span className="text-slate-700 font-bold">{language || "Bangla"}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-100 md:border-none">
              <span className="text-slate-400 font-semibold flex items-center gap-2">📄 Total Pages</span>
              <span className="text-slate-700 font-bold">{pageCount || "Not Found"}</span>
            </div>
          </div>
        </div>

      </div>

      {/* --- DaisyUI Clean Modal --- */}
      <dialog id="order_modal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box max-w-md bg-white rounded-2xl p-6 relative border border-slate-100">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4 text-slate-400 hover:text-slate-600">
              ✕
            </button>
          </form>

          <h3 className="font-bold text-xl text-slate-800 mb-1">
            Confirm Your Order
          </h3>
          <p className="text-xs text-slate-400 mb-6 font-medium">
            Please provide your details below to finalize the request.
          </p>

          <form onSubmit={handlePlaceOrder} className="space-y-4">
            <div className="form-control w-full">
              <label className="label py-1">
                <span className="label-text font-bold text-slate-500 text-xs">
                  Full Name
                </span>
              </label>
              <input
                type="text"
                value={user?.displayName || ""}
                readOnly
                className="input input-bordered w-full bg-slate-50 text-slate-500 border-slate-200 cursor-not-allowed text-sm rounded-xl focus:outline-none"
              />
            </div>

            <div className="form-control w-full">
              <label className="label py-1">
                <span className="label-text font-bold text-slate-500 text-xs">
                  Email Address
                </span>
              </label>
              <input
                type="email"
                value={user?.email || ""}
                readOnly
                className="input input-bordered w-full bg-slate-50 text-slate-500 border-slate-200 cursor-not-allowed text-sm rounded-xl focus:outline-none"
              />
            </div>

            <div className="form-control w-full">
              <label className="label py-1">
                <span className="label-text font-bold text-slate-600 text-xs">
                  Phone Number
                </span>
              </label>
              <input
                type="tel"
                name="phone"
                required
                placeholder="e.g., 01712XXXXXX"
                className="input input-bordered w-full text-slate-800 border-slate-200 bg-white text-sm rounded-xl focus:border-sky-400 focus:outline-none"
              />
            </div>

            <div className="form-control w-full">
              <label className="label py-1">
                <span className="label-text font-bold text-slate-600 text-xs">
                  Delivery Address
                </span>
              </label>
              <textarea
                name="address"
                required
                rows="3"
                placeholder="Enter full home address, area and city details"
                className="textarea textarea-bordered w-full text-slate-800 border-slate-200 bg-white text-sm rounded-xl focus:border-sky-400 focus:outline-none resize-none p-3"
              ></textarea>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="btn btn-block bg-sky-500 hover:bg-sky-600 border-none text-white font-bold rounded-xl tracking-wide shadow-md shadow-sky-500/10 cursor-pointer"
              >
                Place Order
              </button>
            </div>
          </form>
        </div>

        <form method="dialog" className="modal-backdrop bg-slate-900/40 backdrop-blur-xs">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default BookDetails;