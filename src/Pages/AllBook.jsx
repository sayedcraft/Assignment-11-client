import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import BookCard from "../Components/BookCard";
import Loading from "../Components/Loading";
import { FiSearch, FiSliders, FiBookOpen } from "react-icons/fi";

const AllBook = () => {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("default");

  const { data: books = [], isLoading } = useQuery({
    queryKey: ["books"],
    queryFn: async () => {
      const result = await axios(`${import.meta.env.VITE_API_URL}/books`);
      return result.data;
    },
  });

  if (isLoading) return <Loading></Loading>;

  // Filter and Sort Logic
  const filteredBooks = books
    .filter((book) =>
      book.title.toLowerCase().includes(search.toLowerCase()) ||
      book.author.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "lowToHigh") return a.price - b.price;
      if (sortBy === "highToLow") return b.price - a.price;
      return 0;
    });

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50/40 via-white to-transparent py-12">
      <div className="max-w-11/12 mx-auto px-4 md:px-8">
        
        {/* Modern Central Search Zone */}
        <div className="max-w-2xl mx-auto text-center mb-12 space-y-5">
          <div className="space-y-2">
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-800 tracking-tight">
              Explore Our <span className="text-sky-500 bg-gradient-to-r from-sky-500 to-indigo-500 bg-clip-text text-transparent">Complete Library</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 font-medium max-w-md mx-auto">
              Discover your next academic fuel or weekend escape from our curated collection.
            </p>
          </div>

          {/* Clean Rounded Search Box */}
          <div className="mx-auto p-2 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center gap-2 group focus-within:border-sky-400 focus-within:ring-4 focus-within:ring-sky-100/50 transition-all duration-300">
            <div className="pl-3 text-slate-400 text-xl group-focus-within:text-sky-500 transition-colors">
              <FiSearch />
            </div>
            <input
              type="text"
              placeholder="Search by book title or author name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-transparent border-none outline-none focus:outline-none focus:ring-0 text-slate-700 text-sm md:text-base placeholder-slate-400 py-1.5"
            />
          </div>
        </div>

        {/* Dynamic Control Bar (Results count & Sorting) */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-5 mb-8">
          {/* Dynamic Results Counter */}
          <div className="text-slate-500 text-xs sm:text-sm font-semibold">
            Showing <span className="text-sky-500 font-bold">{filteredBooks.length}</span> {filteredBooks.length === 1 ? "Book" : "Books"}
          </div>

          {/* Minimal Sort Controller */}
          <div className="flex items-center gap-2">
            <span className="text-slate-400 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 hidden sm:flex">
              <FiSliders /> Sort:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="select select-sm bg-slate-50 border-none focus:bg-white focus:ring-2 focus:ring-sky-100 rounded-xl font-bold text-slate-600 text-xs w-40 sm:w-44 focus:outline-none transition-all cursor-pointer"
            >
              <option value="default">Featured Books</option>
              <option value="lowToHigh">Price: Low to High</option>
              <option value="highToLow">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Book Grid */}
        {filteredBooks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
            {filteredBooks.map((book) => (
              <BookCard key={book._id} book={book}></BookCard>
            ))}
          </div>
        ) : (
          /* Empty State Illustration View */
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200 shadow-sm max-w-xl mx-auto space-y-4">
            <div className="w-14 h-14 bg-sky-50 text-sky-500 rounded-full flex items-center justify-center text-xl mx-auto shadow-inner">
              <FiBookOpen />
            </div>
            <div>
              <h4 className="text-base font-bold text-slate-800">No Books Found</h4>
              <p className="text-xs text-slate-400 font-medium max-w-xs mx-auto mt-1">
                We couldn't find any results matching "{search}". Try checking your spelling or using different keywords.
              </p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default AllBook;