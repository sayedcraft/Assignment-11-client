// import React from 'react';
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import BookCard from "../Components/BookCard";
import Loading from "../Components/Loading";
const AllBook = () => {
  const { data: books = [], isLoading } = useQuery({
    queryKey: ["books"],
    queryFn: async () => {
      const result = await axios(`${import.meta.env.VITE_API_URL}/books`);
      return result.data;
    },
  });

  console.log(books);

  if (isLoading) return <Loading></Loading>;
  return (
    <div className="max-w-11/12 mx-auto">
      <div className="py-15 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {books?.map((book) => (
          <BookCard key={book._id} book={book}></BookCard>
        ))}
      </div>
    </div>
  );
};

export default AllBook;
