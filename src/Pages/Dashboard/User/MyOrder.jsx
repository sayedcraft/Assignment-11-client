// import React from 'react';

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loading from "../../../Components/Loading";
import useAuth from "../../../hook/useAuth";

const MyOrder = () => {
  const { user } = useAuth();
  const { data: orders = [], isLoading } = useQuery({
    queryKey: ["orders", user?.email],
    queryFn: async () => {
      const result = await axios(
        `${import.meta.env.VITE_API_URL}/myOrder/${user?.email}`,
      );
      return result.data;
    },
  });
  console.log(orders);

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

          {/* Responsive Responsive Wrapper */}
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
                    Status
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
                      {order.transactionId || "N/A"}
                    </td>

                    <td className="py-4 px-6 text-sm text-gray-600 font-medium">
                    {order.time 
                      ? new Date(order.time).toLocaleDateString("en-US", {
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
                      {order.amount}
                    </td>

                    {/* Status Badge */}
                    <td className="py-4 px-6 text-center">
                      <span
                        className={`inline-flex items-center justify-center px-3 py-1 text-xs font-bold rounded-full border ${
                          order.status?.toLowerCase() === "paid" ||
                          order.status?.toLowerCase() === "success"
                            ? "bg-emerald-50 text-emerald-600 border-emerald-200"
                            : "bg-amber-50 text-amber-600 border-amber-200"
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 mr-1.5 rounded-full ${
                            order.status?.toLowerCase() === "paid" ||
                            order.status?.toLowerCase() === "success"
                              ? "bg-emerald-500"
                              : "bg-amber-500"
                          }`}
                        ></span>
                        {order.status || "Pending"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Empty State UI (If no orders are available) */}
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
