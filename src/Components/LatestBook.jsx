import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { FiBookOpen } from "react-icons/fi";

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
    <section className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-sky-50/20 via-white to-transparent">
      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* Section Title */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 border-b border-slate-100 pb-6">
          <div className="text-center my-5">
        <h1 className="font-bold text-4xl mb-2">
          Latest <span className="text-sky-500">Arrivals</span>
        </h1>
        <p className="text-gray-500">
          Explore the freshest additions to our expanding library.
        </p>
      </div>
          <Link
            to="/allBook"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-sky-500 hover:text-sky-600 group transition-all w-fit border border-sky-100 hover:border-sky-200 bg-sky-50/50 px-4 py-2 rounded-xl shadow-xs"
          >
            View All Books 
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>

        {/* Card Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          {latestBooks.map((book, index) => (
            <motion.div
              key={book._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="bg-white rounded-2xl sm:rounded-3xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full group"
            >
              {/* Image Section  */}
              <div className="relative aspect-[3/4] bg-slate-50 flex items-center justify-center p-4 sm:p-6 overflow-hidden border-b border-slate-50">
                <img
                  src={book.image}
                  alt={book.title}
                  className="h-full w-auto object-contain rounded-lg shadow-xs transition-transform duration-500 group-hover:scale-103"
                />
              </div>

              {/* Card Body */}
              <div className="p-3 sm:p-5 grow flex flex-col justify-between space-y-3 sm:space-y-4">
                <div className="space-y-1">
                  <h3 className="font-extrabold text-slate-800 text-sm sm:text-base tracking-tight line-clamp-1 group-hover:text-sky-500 transition-colors">
                    {book.title}
                  </h3>
                  <p className="text-[11px] sm:text-xs font-semibold text-slate-400">
                    By <span className="text-slate-600 font-bold">{book.author}</span>
                  </p>
                </div>

                {/* Price & Details Button */}
                <div className="flex items-center justify-between pt-3 border-t border-slate-100/80">
                  <span className="text-base sm:text-lg font-black text-sky-500 flex items-center gap-0.5">
                    <span className="font-sans text-xs sm:text-sm">৳</span>{book.price}
                  </span>
                  <Link
                    to={`/boodDetails/${book._id}`}
                    className="btn btn-xs sm:btn-sm bg-sky-50 hover:bg-sky-500 text-sky-600 hover:text-white border-none font-bold rounded-lg sm:rounded-xl px-2.5 sm:px-4 transition-all duration-300 cursor-pointer"
                  >
                    Details
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {latestBooks.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16 sm:py-24 bg-white rounded-3xl border border-dashed border-slate-200 shadow-sm max-w-xl mx-auto space-y-4"
          >
            <div className="w-12 h-12 bg-sky-50 text-sky-500 rounded-full flex items-center justify-center text-lg mx-auto shadow-inner">
              <FiBookOpen />
            </div>
            <div>
              <h4 className="text-base font-bold text-slate-800">No New Arrivals</h4>
              <p className="text-xs text-slate-400 font-medium max-w-xs mx-auto mt-1">
                We haven't added any new books recently. Please check back later or explore our full library.
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default LatestBook;