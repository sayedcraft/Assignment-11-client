import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router";
import { motion } from "framer-motion";

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
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent to-sky-50/20">
      <div>
        {/* Section Title */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-12">
          <div>
            <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight sm:text-4xl">
              Latest <span className="text-sky-500">Arrivals</span>
            </h2>
            <p className="text-sm text-slate-500 mt-2">Explore the freshest additions to our expanding library.</p>
          </div>
          <Link
            to="/allBook"
            className="inline-flex items-center gap-2 text-sm font-bold text-sky-500 hover:text-sky-600 group transition-colors w-fit border border-sky-200 hover:border-sky-300 bg-white px-4 py-2 rounded-xl shadow-sm"
          >
            View All Books 
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>

        {/* Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
          {latestBooks.map((book, index) => (
            <motion.div
              key={book._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full group"
            >
              {/* Image Section with Smooth Hover Overlay */}
              <div className="relative aspect-[3/4] bg-slate-50 overflow-hidden">
                <img
                  src={book.image}
                  alt={book.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Card Body */}
              <div className="p-5 grow flex flex-col justify-between bg-white">
                <div>
                  <h3 className="font-bold text-slate-800 text-base tracking-tight line-clamp-1 group-hover:text-sky-600 transition-colors">
                    {book.title}
                  </h3>
                  <p className="text-xs font-medium text-slate-400 mt-1 mb-4">
                    By <span className="text-slate-500">{book.author}</span>
                  </p>
                </div>

                {/* Price & Details Button */}
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100">
                  <span className="text-lg font-extrabold text-sky-600">
                    ${book.price}
                  </span>
                  <Link
                    to={`/boodDetails/${book._id}`}
                    className="btn btn-sm bg-sky-50 hover:bg-sky-500 hover:text-white text-sky-600 border-none font-bold rounded-xl px-4 transition-all duration-300"
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
            className="text-center py-20 bg-white rounded-3xl border border-slate-100 shadow-inner"
          >
            <p className="text-slate-400 font-semibold text-base">
              📦 No new books arrived yet. Check back later!
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default LatestBook;