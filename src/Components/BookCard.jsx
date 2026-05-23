import { Link } from "react-router";

const BookCard = ({ book }) => {
  const { title, author, price, image,_id } = book;
//   console.log(title, author, price);

  return (
    <div className="group border border-gray-100 bg-gray-100 rounded-2xl overflow-hidden transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl hover:border-sky-100">
      {/* img */}
      <div className="h-75 overflow-hidden relative">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover rounded-t-xl transition-transform duration-500 ease-in-out group-hover:scale-105"
        />
      </div>

      <div className="p-4">
        {/* Book Info */}
        <h3 className="text-xl font-bold text-[#003366] line-clamp-1 transition-colors duration-300 group-hover:text-sky-600">
          {title}
        </h3>
        <p className="text-gray-500 text-sm font-normal mb-4">{author}</p>

        {/* Price  Action */}
        <div className="flex items-center justify-between mt-auto">
          <span className="text-sky-500 text-xl font-bold flex items-center gap-1">
            <span className="font-sans">৳</span> {price}
          </span>

          <Link to={`/boodDetails/${_id}`} className="btn btn-outline btn-sm text-sky-500 hover:text-white border-sky-500 hover:bg-sky-500 hover:border-sky-500 px-4 rounded-md transition-all duration-300">
            View
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
