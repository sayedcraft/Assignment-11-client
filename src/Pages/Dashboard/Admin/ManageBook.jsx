import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";
import Loading from "../../../Components/Loading";

const ManageBook = () => {
  const queryClient = useQueryClient();

  const { data: books = [], isLoading } = useQuery({
    queryKey: ["admin-all-books"],
    queryFn: async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/admin/all-books`
      );
      return response.data;
    },
  });

  const updateStatusMutation = useMutation({
    mutationFn: async ({ bookId, newStatus }) => {
      const response = await axios.patch(
        `${import.meta.env.VITE_API_URL}/admin/books/status/${bookId}`,
        { status: newStatus }
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["admin-all-books"]);
      Swal.fire({
        title: "Status Updated!",
        text: "The book status has been changed successfully.",
        icon: "success",
        confirmButtonColor: "#003366",
      });
    },
    onError: () => {
      Swal.fire("Error", "Something went wrong while updating status.", "error");
    },
  });

  const deleteBookMutation = useMutation({
    mutationFn: async (bookId) => {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/admin/books/${bookId}`
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["admin-all-books"]);
      Swal.fire({
        title: "Deleted!",
        text: "The book and its related orders have been removed.",
        icon: "success",
        confirmButtonColor: "#003366",
      });
    },
    onError: () => {
      Swal.fire("Error", "Failed to delete the book.", "error");
    },
  });

  const handleStatusChange = (bookId, targetStatus) => {
    updateStatusMutation.mutate({ bookId, newStatus: targetStatus });
  };

  const handleDeleteBook = (bookId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Deleting this book will also permanently delete all orders for it!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteBookMutation.mutate(bookId);
      }
    });
  };

  if (isLoading) return <Loading/>;

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        
        <div className="p-6 border-b border-gray-100 bg-white sm:flex sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-extrabold text-sky-500 tracking-tight">
              Manage Books Inventory
            </h2>
            <p className="mt-1 text-sm text-gray-400">
              Publish or unpublish books added by librarians, or delete books along with their orders.
            </p>
          </div>
          <span className="badge bg-sky-500 border-none text-white text-xs font-semibold px-4 py-3 mt-4 sm:mt-0 rounded-lg">
            Total {books.length} Books
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="table w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/80 border-b border-gray-100">
                <th className="py-4 px-6 text-xs font-bold uppercase text-gray-400">Book Details</th>
                <th className="py-4 px-6 text-xs font-bold uppercase text-gray-400">Librarian Email</th>
                <th className="py-4 px-6 text-xs font-bold uppercase text-gray-400">Price</th>
                <th className="py-4 px-6 text-xs font-bold uppercase text-gray-400">Status Control</th>
                <th className="py-4 px-6 text-xs font-bold uppercase text-gray-400 text-center">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {books.map((book) => (
                <tr key={book._id} className="hover:bg-gray-50/50 transition-colors duration-150">
                  
                  {/* Book Info */}
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-4">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img src={book.image} alt={book.title} />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold text-gray-800 text-sm max-w-xs truncate">{book.title}</div>
                        <div className="text-xs text-gray-400 mt-0.5">By {book.author}</div>
                      </div>
                    </div>
                  </td>

                  {/* Librarian Email  */}
                  <td className="py-4 px-6 text-sm font-medium text-gray-600">
                    {book.librarian?.email}
                  </td>

                  {/* Price */}
                  <td className="py-4 px-6 text-sm font-bold text-gray-700">
                    ${book.price}
                  </td>

                  {/* Publish/Unpublish */}
                  <td className="py-4 px-6">
                    <select
                      value={book.status || "Published"}
                      onChange={(e) => handleStatusChange(book._id, e.target.value)}
                      className={`select select-bordered select-xs w-32 text-xs font-semibold rounded-md focus:outline-none ${
                        book.status === "Published" 
                          ? "text-green-700 bg-green-50 border-green-200" 
                          : "text-red-700 bg-red-50 border-red-200"
                      }`}
                    >
                      <option value="Published">Published</option>
                      <option value="Unpublished">Unpublished</option>
                    </select>
                  </td>

                  {/* Delete Button */}
                  <td className="py-4 px-6 text-center">
                    <button
                      onClick={() => handleDeleteBook(book._id)}
                      className="btn btn-xs bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 shadow-none font-semibold rounded-md transition-all duration-200"
                    >
                      Delete Book
                    </button>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {books.length === 0 && (
          <div className="text-center py-16 bg-white">
            <p className="text-gray-400 font-medium text-sm">No books found in database.</p>
          </div>
        )}

      </div>
    </div>
  );
};

export default ManageBook;