import { Link } from "react-router";
import { FiArrowRight, FiUser } from "react-icons/fi";

const BookCard = ({ book }) => {
  const { title, author, price, image, _id, description = "No description available for this book." } = book;

  
  const shortDescription = description.length > 60 
    ? description.slice(0, 60) + "..." 
    : description;

  return (
    <div className="group bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col h-full w-full">
      
      {/* Premium Image Area */}
      <div className="relative h-40 sm:h-52 bg-slate-50/60 overflow-hidden flex items-center justify-center p-2 sm:p-3">
        <img
          src={image}
          alt={title}
          className="h-full w-auto object-contain rounded shadow-sm transition-transform duration-500 ease-in-out group-hover:scale-102"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Card Body Contents */}
      <div className="p-3 sm:p-4 grow flex flex-col justify-between bg-white relative z-10">
        <div className="space-y-1">
          {/* Title Text */}
          <h3 className="text-xs sm:text-sm font-bold text-slate-800 tracking-tight line-clamp-2 min-h-[32px] sm:min-h-[40px] group-hover:text-sky-600 transition-colors duration-300 leading-snug">
            {title}
          </h3>
          
          {/* Author Badge */}
          <p className="text-[10px] sm:text-[11px] font-semibold text-slate-400 flex items-center gap-1 truncate">
            <FiUser className="text-slate-300 shrink-0" /> <span className="truncate">By {author}</span>
          </p>

          {/* Short Description  */}
          <p className="text-[10px] sm:text-[11px] text-slate-400 font-medium leading-relaxed pt-1">
            {shortDescription}
          </p>
        </div>

        {/* Action Panel - Pricing & View Details */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mt-3 sm:mt-4 pt-2.5 sm:pt-3 border-t border-slate-100">
          {/* Currency format */}
          <span className="text-sm sm:text-base font-extrabold text-slate-800 flex items-center gap-0.5">
            <span className="font-sans text-sky-500 font-bold text-xs sm:text-sm">৳</span>{price}
          </span>

          {/* Fully Responsive Compact Button */}
          <Link 
            to={`/boodDetails/${_id}`} 
            className="btn btn-xs h-7 sm:h-8 min-h-[28px] sm:min-h-[32px] bg-sky-50 hover:bg-sky-500 text-sky-600 hover:text-white border-none font-bold rounded-lg sm:rounded-xl px-2 sm:px-3 transition-all duration-300 flex items-center justify-center gap-0.5 w-full sm:w-auto"
          >
            <span className="text-[10px] sm:text-[11px]">Details</span>
            <FiArrowRight className="text-[10px] sm:text-xs" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BookCard;