import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hook/useAuth";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import Loading from "../../../Components/Loading";

const Invoice = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: payments = [],
    isLoading,
  } = useQuery({
    queryKey: ["payments", user?.email],
    enabled: !!user?.email, 
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments/${user?.email}`);
      return res.data;
    },
  });

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div className="p-6">
      <div className="bg-base-100 rounded-xl shadow-lg p-6">
        
        <h2 className="text-2xl font-bold mb-6">
          Payment History ({payments.length})
        </h2>

        {payments.length === 0 ? (
          <p className="text-gray-500">
            No payments found.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="table table-zebra w-full">
              <thead>
                <tr>
                  <th>sl</th>
                  <th>Book Name</th>
                  <th>Amount</th>
                  <th>Paid Date</th>
                  <th>Transaction ID</th>
                </tr>
              </thead>

              <tbody>
                {payments.map((payment, index) => (
                  <tr key={payment._id}>
                    <th>{index + 1}</th>

                    <td className="font-medium">
                      {payment.name || "N/A"}
                    </td>

                    <td className="text-green-600 font-bold">
                      ৳{payment.amount}
                    </td>

                    <td>
                      {payment.createdAt || payment.time
                        ? new Date(payment.createdAt || payment.time).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })
                        : "N/A"}
                    </td>

                    <td className="text-xs font-mono font-medium tracking-wider text-gray-600 select-all break-all">
                      {payment.transactionId}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Invoice;