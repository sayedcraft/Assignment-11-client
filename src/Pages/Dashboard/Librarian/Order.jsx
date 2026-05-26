import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";
import useAuth from "../../../hook/useAuth";
import Loading from "../../../Components/Loading";

const Order = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: orders = [], isLoading } = useQuery({
    queryKey: ["librarian-orders", user?.email],
    queryFn: async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/librarian/orders/${user?.email}`
      );
      return response.data;
    },
    enabled: !!user?.email,
  });

  const updateStatusMutation = useMutation({
    mutationFn: async ({ orderId, newStatus }) => {
      const response = await axios.patch(
        `${import.meta.env.VITE_API_URL}/orders/update-status/${orderId}`,
        { status: newStatus }
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["librarian-orders", user?.email]);
      Swal.fire({
        title: "Updated!",
        text: "Order status has been changed successfully.",
        icon: "success",
        confirmButtonColor: "#003366",
      });
    },
    onError: () => {
      Swal.fire("Error", "Something went wrong while updating.", "error");
    },
  });

  const handleStatusChange = (orderId, currentStatus, targetStatus) => {
    if (currentStatus === "cancelled" || currentStatus === "success") {
      Swal.fire("Not Allowed", "This order is already finalized.", "warning");
      return;
    }
    updateStatusMutation.mutate({ orderId, newStatus: targetStatus });
  };

  const handleCancelOrder = (orderId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to cancel this order?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, cancel it!",
    }).then((result) => {
      if (result.isConfirmed) {
        updateStatusMutation.mutate({ orderId, newStatus: "cancelled" });
      }
    });
  };

  if (isLoading) return <Loading />;

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        
        {/* Header Section */}
        <div className="p-6 border-b border-gray-100 bg-white sm:flex sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-extrabold text-[#003366] tracking-tight">
              Manage Book Orders
            </h2>
            <p className="mt-1 text-sm text-gray-400">
              Track incoming book requests, update fulfillment stages, or handle cancellations.
            </p>
          </div>
          <span className="badge bg-sky-500 border-none text-white text-xs font-semibold px-4 py-3 mt-4 sm:mt-0 rounded-lg">
            Total {orders.length} Requests
          </span>
        </div>

        {/* Table Container */}
        <div className="overflow-x-auto">
          <table className="table w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/80 border-b border-gray-100">
                <th className="py-4 px-6 text-xs font-bold uppercase text-gray-400">Customer Info</th>
                <th className="py-4 px-6 text-xs font-bold uppercase text-gray-400">Book Title</th>
                <th className="py-4 px-6 text-xs font-bold uppercase text-gray-400">Price & Payment</th>
                <th className="py-4 px-6 text-xs font-bold uppercase text-gray-400">Current Status</th>
                <th className="py-4 px-6 text-xs font-bold uppercase text-gray-400 text-center">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {orders.map((order) => (
                <tr key={order._id} className="hover:bg-gray-50/50 transition-colors duration-150">
                  
                  <td className="py-4 px-6">
                    <div className="text-sm font-medium text-gray-600 mt-0.5">
                      {order.customer}
                    </div>
                  </td>

                  {/* Book Title */}
                  <td className="py-4 px-6 text-sm font-semibold text-[#003366] max-w-xs truncate">
                    {order.name || "Book"}
                  </td>

                  {/* Price & Payment */}
                  <td className="py-4 px-6 text-sm">
                    <div className="font-bold text-gray-700">${order.price || order.amount}</div>
                    <span className={`badge badge-xs text-[10px] p-1.5 font-bold ${
                      order.paymentStatus === "paid" ? "badge-success text-white" : "badge-error text-white"
                    }`}>
                      {order.paymentStatus || "unpaid"}
                    </span>
                  </td>

                  {/* Dynamic Status Dropdown */}
                  <td className="py-4 px-6">
                    {order.orderStatus === "cancelled" || order.orderStatus === "success" ? (
                      <span className={`capitalize text-xs font-bold px-2.5 py-1 rounded-md ${
                        order.orderStatus === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                      }`}>
                        {order.orderStatus === "success" ? "Delivered" : order.orderStatus}
                      </span>
                    ) : (
                      <select
                        value={order.orderStatus || "pending"}
                        onChange={(e) => handleStatusChange(order._id, order.orderStatus, e.target.value)}
                        className="select select-bordered select-xs w-28 text-xs font-medium rounded-md focus:outline-sky-400"
                      >
                        <option value="pending">Pending</option>
                        <option value="shipped">Shipped</option>
                        <option value="success">Delivered</option>
                      </select>
                    )}
                  </td>

                  {/* Action Button */}
                  <td className="py-4 px-6 text-center">
                    {order.orderStatus !== "cancelled" && order.orderStatus !== "success" ? (
                      <button
                        onClick={() => handleCancelOrder(order._id)}
                        className="btn btn-xs bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 shadow-none font-semibold rounded-md transition-all duration-200"
                      >
                        Cancel Order
                      </button>
                    ) : (
                      <span className="text-xs text-gray-400 font-medium italic">No action</span>
                    )}
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {orders.length === 0 && (
          <div className="text-center py-16 bg-white">
            <p className="text-gray-400 font-medium text-sm">No book orders received yet.</p>
          </div>
        )}

      </div>
    </div>
  );
};

export default Order;