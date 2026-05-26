import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router";

const LatestBook = () => {
  const { data: latestBooks = [] } = useQuery({
    queryKey: ["latest-books-home"],
    queryFn: async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/latest-books`,
      );
      return response.data;
    },
  });

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="">
        {/* Section Title */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
          <div>
            <h2 className="text-2xl font-extrabold text-sky-500 tracking-tight sm:text-3xl">
              Latest Book
            </h2>
          </div>
          <Link
            to="/allBook"
            className="inline-flex items-center text-sm font-semibold text-sky-500 hover:text-sky-600 transition-colors w-fit"
          >
            View All Books →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
          {latestBooks.map((book) => (
            <div
              key={book._id}
              className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 flex flex-col h-full"
            >
              {/* Image Section */}
              <div className="relative aspect-3/4 bg-gray-50 overflow-hidden group">
                <img
                  src={book.image}
                  alt={book.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              {/* Card Body */}
              <div className="p-5 grow flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-gray-800 text-sm sm:text-base tracking-tight line-clamp-1">
                    {book.title}
                  </h3>
                  <p className="text-xs text-gray-400 mt-1 mb-4">
                    By {book.author}
                  </p>
                </div>

                {/* Price & Details Button */}
                <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-50">
                  <span className="text-base font-extrabold text-[#003366]">
                    ${book.price}
                  </span>
                  <Link
                    to={`/boodDetails/${book._id}`}
                    className="btn btn-xs sm:btn-sm bg-sky-50 hover:bg-sky-500 hover:text-white text-sky-600 border border-sky-100 shadow-none font-semibold rounded-md transition-all duration-200"
                  >
                    Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {latestBooks.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
            <p className="text-gray-400 font-medium text-sm">
              No new books arrived yet.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default LatestBook;
