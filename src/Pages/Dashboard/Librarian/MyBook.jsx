import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hook/useAuth";
import axios from "axios";
import Loading from "../../../Components/Loading";
import { Link } from "react-router"; 

const MyBook = () => {
  const { user } = useAuth();
  const { data: books = [], isLoading } = useQuery({
    queryKey: ["books", user?.email],
    queryFn: async () => {
      const result = await axios(
        `${import.meta.env.VITE_API_URL}/myBook/${user?.email}`
      );
      return result.data;
    },
  });

  if (isLoading) return <Loading></Loading>;
  
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        
        <div className="p-6 border-b border-gray-100 bg-white sm:flex sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-extrabold text-[#003366] tracking-tight">
              My Books
            </h2>
            <p className="mt-1 text-xs text-gray-400">
              Manage your uploaded books, tracking prices, inventory information, and basic details.
            </p>
          </div>
          <span className="badge badge-info gap-1 text-white text-xs font-semibold px-3 py-3 mt-4 sm:mt-0 rounded-lg">
            Total {books.length} Books
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="table w-full text-left border-collapse">
            {/* Table Head */}
            <thead>
              <tr className="bg-gray-50/70 border-b border-gray-100">
                <th className="py-4 px-6 text-xs font-bold uppercase tracking-wider text-gray-400">
                  Book Cover
                </th>
                <th className="py-4 px-6 text-xs font-bold uppercase tracking-wider text-gray-400">
                  Book Name
                </th>
                <th className="py-4 px-6 text-xs font-bold uppercase tracking-wider text-gray-400">
                  Author
                </th>
                <th className="py-4 px-6 text-xs font-bold uppercase tracking-wider text-gray-400">
                  Price
                </th>
                <th className="py-4 px-6 text-xs font-bold uppercase tracking-wider text-gray-400 text-center">
                  Action
                </th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-gray-100">
              {books.map((book) => (
                <tr 
                  key={book._id} 
                  className="hover:bg-sky-50/20 transition-colors duration-200"
                >
                  {/* Book Image Cover */}
                  <td className="py-4 px-6">
                    <div className="flex items-center">
                      <div className="h-14 w-10 bg-gray-100 rounded-md overflow-hidden shadow-sm border border-gray-200 flex justify-center items-center">
                        <img
                          src={book.image}
                          alt={book.title}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </div>
                  </td>

                  {/* Book Title */}
                  <td className="py-4 px-6 text-sm font-bold text-[#003366] max-w-xs truncate">
                    {book.title}
                  </td>

                  {/* Author */}
                  <td className="py-4 px-6 text-sm text-gray-500 font-medium">
                    {book.author}
                  </td>

                  {/* Price */}
                  <td className="py-4 px-6 text-sm font-black text-sky-500">
                    <span className="font-sans mr-0.5">$</span>
                    {book.price}
                  </td>

                 
                  <td className="py-4 px-6 text-center">
                    <Link
                      to={`/dashboard/updateBook/${book._id}`} 
                      className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-amber-600 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-lg shadow-xs transition-all duration-200 active:scale-95"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="w-3.5 h-3.5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                        />
                      </svg>
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State Handle */}
        {books.length === 0 && (
          <div className="text-center py-12 bg-white">
            <p className="text-sm text-gray-400 font-medium">You haven't uploaded any books yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBook;