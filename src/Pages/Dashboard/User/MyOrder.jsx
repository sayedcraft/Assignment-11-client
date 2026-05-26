import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import axios from "axios";
import useAuth from "../../../hook/useAuth";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import Loading from "../../../Components/Loading";

const MyOrders = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: orders = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["myOrders", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/myOrder/${user?.email}`);
      return res.data;
    },
  });

  const handleCancel = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to cancel this order!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, cancel it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.patch(`/orders/cancel/${id}`);
        if (res.data.modifiedCount > 0) {
          Swal.fire("Cancelled!", "Your order has been cancelled.", "success");
          refetch();
        }
      }
    });
  };

  const handlePayNow = async (order) => {
    const paymentInfo = {
      orderId: order._id,
      bookId: order.bookId,
      title: order.name,
      price: order.amount,
      image: order.image,
      customer: order.customer,
    };

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/create-checout-session`,
        paymentInfo,
      );
      // window.location.href = data.url;
      window.location.assign(data.url);
    } catch (error) {
      console.error("Payment failed to initialize", error);
    }
  };

  if (isLoading) return <Loading></Loading>;

  return (
    <div className="p-6">
      <div className="bg-base-100 rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6">My Orders ({orders.length})</h2>
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>#</th>
                <th>Book Title</th>
                <th>Order Date</th>
                <th>Status</th>
                <th>Payment</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={order._id}>
                  <th>{index + 1}</th>
                  <td>{order.name}</td>
                  <td>{new Date(order.createdAt).toLocaleDateString()}</td>

                  <td>
                    <span
                      className={`badge uppercase text-xs font-bold ${
                        order.orderStatus === "success"
                          ? "badge-success text-white"
                          : order.orderStatus === "cancelled"
                            ? "badge-error text-white"
                            : "badge-warning"
                      }`}
                    >
                      {order.orderStatus}
                    </span>
                  </td>

                  <td>
                    <span
                      className={`badge text-xs font-bold ${order.paymentStatus === "paid" ? "badge-success text-white" : "badge-ghost"}`}
                    >
                      {order.paymentStatus}
                    </span>
                  </td>

                  <td className="space-x-2">
                    {order.orderStatus === "pending" && (
                      <>
                        <button
                          onClick={() => handlePayNow(order)}
                          className="btn btn-xs btn-success text-white"
                        >
                          Pay Now
                        </button>
                        <button
                          onClick={() => handleCancel(order._id)}
                          className="btn btn-xs btn-error text-white"
                        >
                          Cancel
                        </button>
                      </>
                    )}
                    {(order.orderStatus === "cancelled" ||
                      order.orderStatus === "success") && (
                      <span className="text-xs text-gray-400 italic">
                        No Actions Available
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyOrders;
