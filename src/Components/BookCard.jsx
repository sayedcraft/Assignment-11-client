import { Link } from "react-router";
import { FiArrowRight, FiUser } from "react-icons/fi";

const BookCard = ({ book }) => {
  const { title, author, price, image, _id } = book;

  return (
    <div className="group bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col h-full">
      
      {/* Premium Image Container with Glass Overlay */}
      <div className="relative aspect-[3/4] bg-slate-50 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover rounded-t-2xl transition-transform duration-500 ease-in-out group-hover:scale-105"
        />
        {/* Soft elegant gradient shadow inside image */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Card Body Contents */}
      <div className="p-5 grow flex flex-col justify-between bg-white relative z-10">
        <div className="space-y-1.5">
          {/* Title Text Hierarchy */}
          <h3 className="text-base font-bold text-slate-800 tracking-tight line-clamp-1 group-hover:text-sky-600 transition-colors duration-300">
            {title}
          </h3>
          {/* Author Badge style */}
          <p className="text-xs font-medium text-slate-400 flex items-center gap-1">
            <FiUser className="text-slate-300" /> By <span className="text-slate-500">{author}</span>
          </p>
        </div>

        {/* Action Panel - Pricing & Premium View Button */}
        <div className="flex items-center justify-between mt-5 pt-4 border-t border-slate-100">
          {/* Localized Beautiful Currency format */}
          <span className="text-lg font-extrabold text-slate-800 flex items-center gap-0.5">
            <span className="font-sans text-sky-500 font-bold text-base">৳</span>{price}
          </span>

          {/* Interactive Button linked with global style */}
          <Link 
            to={`/boodDetails/${_id}`} 
            className="btn btn-sm bg-sky-50 hover:bg-sky-500 text-sky-600 hover:text-white border-none font-bold rounded-xl px-4 transition-all duration-300 group/btn"
          >
            View
            <FiArrowRight className="text-sm group-hover/btn:translate-x-0.5 transition-transform hidden sm:block" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BookCard;