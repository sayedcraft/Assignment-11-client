// import React from 'react';
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hook/useAuth";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import Loading from "../../../Components/Loading";
import Swal from "sweetalert2";

const MyOrder = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: orders = [], isLoading, refetch } = useQuery({
    queryKey: ["orders", user?.email],
    queryFn: async () => {
      const result = await axiosSecure.get(`/myOrder/${user?.email}`);
      return result.data;
    },
  });

  const handlePayment = async (order) => {
    try {
      const paymentInfo = {
        bookId: order?.bookId,
        title: order?.name, 
        price: order?.amount, 
        image: order?.image,
        librarian: {
          Lemail: user?.email 
        }
      };

      const { data } = await axiosSecure.post(`/create-checout-session`, paymentInfo);
      
      if (data?.url) {
        window.location.assign(data.url); 
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Payment Error",
        text: err.message || "Failed to initiate payment session."
      });
    }
  };

  const handleCancel = async (id) => {
    const confirm = await Swal.fire({
      title: "Cancel this order?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, cancel it",
      cancelButtonText: "No, keep it",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
    });

    if (!confirm.isConfirmed) return;

    try {
      await axiosSecure.patch(`/orders/cancel/${id}`);
      refetch(); 

      Swal.fire("Cancelled!", "Your order has been cancelled.", "success");
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: err.response?.data?.message || "Something went wrong while cancelling.",
      });
    }
  };

  if (isLoading) return <Loading></Loading>;

  return (
    <div>
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          
          {/* Table Header Section */}
          <div className="p-6 border-b border-gray-100 bg-white sm:flex sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-extrabold text-[#003366] tracking-tight">
                My Orders
              </h2>
              <p className="mt-1 text-xs text-gray-400">
                A list of all the recent book purchases and transaction records.
              </p>
            </div>
            <span className="badge badge-info gap-1 text-white text-xs font-semibold px-3 py-3 mt-4 sm:mt-0 rounded-lg">
              Total {orders.length} Orders
            </span>
          </div>

          {/* Responsive Wrapper */}
          <div className="overflow-x-auto">
            <table className="table w-full text-left border-collapse">
              {/* Table Head */}
              <thead>
                <tr className="bg-gray-50/70 border-b border-gray-100">
                  <th className="py-4 px-6 text-xs font-bold uppercase tracking-wider text-gray-400">
                    Transaction ID
                  </th>
                  <th className="py-4 px-6 text-xs font-bold uppercase tracking-wider text-gray-400">
                    Order Date
                  </th>
                  <th className="py-4 px-6 text-xs font-bold uppercase tracking-wider text-gray-400">
                    Book Title
                  </th>
                  <th className="py-4 px-6 text-xs font-bold uppercase tracking-wider text-gray-400">
                    Author
                  </th>
                  <th className="py-4 px-6 text-xs font-bold uppercase tracking-wider text-gray-400">
                    Price
                  </th>
                  <th className="py-4 px-6 text-xs font-bold uppercase tracking-wider text-gray-400 text-center">
                    Order Status
                  </th>
                  <th className="py-4 px-6 text-xs font-bold uppercase tracking-wider text-gray-400 text-center">
                    Payment Status
                  </th>
                  <th className="py-4 px-6 text-xs font-bold uppercase tracking-wider text-gray-400 text-center">
                    Actions
                  </th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody className="divide-y divide-gray-100">
                {orders.map((order) => (
                  <tr
                    key={order._id}
                    className="hover:bg-sky-50/20 transition-colors duration-200"
                  >
                    {/* Transaction ID */}
                    <td className="py-4 px-6 text-sm font-mono text-gray-500 font-medium select-all">
                      {order.transactionId || "Pending"}
                    </td>

                    {/* Order Date */}
                    <td className="py-4 px-6 text-sm text-gray-600 font-medium">
                      {order.time || order.createdAt
                        ? new Date(order.time || order.createdAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })
                        : "Date N/A"
                      }
                    </td>

                    {/* Book Name */}
                    <td className="py-4 px-6 text-sm font-bold text-[#003366] max-w-xs truncate">
                      {order.name}
                    </td>

                    {/* Author */}
                    <td className="py-4 px-6 text-sm text-gray-500 font-medium">
                      {order.author}
                    </td>

                    {/* Price */}
                    <td className="py-4 px-6 text-sm font-black text-sky-500">
                      <span className="font-sans mr-0.5">৳</span>
                      {order.amount || order.price}
                    </td>

                    {/* Order Status Badge (From Sir's Logic) */}
                    <td className="py-4 px-6 text-center">
                      <span
                        className={`inline-flex items-center justify-center px-3 py-1 text-xs font-bold rounded-full border ${
                          order.orderStatus === "pending" || !order.orderStatus
                            ? "bg-amber-50 text-amber-600 border-amber-200"
                            : order.orderStatus === "cancelled"
                            ? "bg-rose-50 text-rose-600 border-rose-200"
                            : "bg-emerald-50 text-emerald-600 border-emerald-200"
                        }`}
                      >
                        {order.orderStatus || "pending"}
                      </span>
                    </td>

                    {/* Payment Status Badge */}
                    <td className="py-4 px-6 text-center">
                      <span
                        className={`inline-flex items-center justify-center px-3 py-1 text-xs font-bold rounded-full border ${
                          order.paymentStatus === "unpaid" || !order.paymentStatus
                            ? "bg-amber-50 text-amber-600 border-amber-200"
                            : "bg-emerald-50 text-emerald-600 border-emerald-200"
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 mr-1.5 rounded-full ${
                            order.paymentStatus === "unpaid" || !order.paymentStatus
                              ? "bg-amber-500"
                              : "bg-emerald-500"
                          }`}
                        ></span>
                        {order.paymentStatus || "unpaid"}
                      </span>
                    </td>

                    {/* Interactive Action Buttons */}
                    <td className="py-4 px-6 text-center space-x-2 whitespace-nowrap">
                      {/* Pay Now Button  */}
                      {(order.orderStatus === "pending" || !order.orderStatus) && 
                       (order.paymentStatus === "unpaid" || !order.paymentStatus) && (
                        <button
                          onClick={() => handlePayment(order)}
                          className="btn btn-xs bg-sky-500 border-none text-white hover:bg-sky-600 rounded-md transition-all font-bold px-3"
                        >
                          Pay Now
                        </button>
                      )}

                      {/* Cancel Button*/}
                      {(order.orderStatus === "pending" || !order.orderStatus) && (
                        <button
                          onClick={() => handleCancel(order._id)}
                          className="btn btn-xs bg-rose-500 border-none text-white hover:bg-rose-600 rounded-md transition-all font-bold px-3"
                        >
                          Cancel
                        </button>
                      )}

                      {/* Cancelled Disabled Button */}
                      {order.orderStatus === "cancelled" && (
                        <button
                          disabled
                          className="btn btn-xs btn-outline btn-error opacity-50 cursor-not-allowed px-3 rounded-md"
                        >
                          Cancelled
                        </button>
                      )}
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Empty */}
          {orders.length === 0 && (
            <div className="text-center py-12 bg-white">
              <p className="text-sm text-gray-400 font-medium">
                No orders found.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyOrder;