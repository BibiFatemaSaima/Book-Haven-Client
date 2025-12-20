import React from "react";
import { useLoaderData } from "react-router";

const BookService = () => {
  const data = useLoaderData();

  if (!data || !Array.isArray(data)) {
    return <p className="text-center p-10">No books found or loading...</p>;
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-5">
      {data.map((book) => (
        <div
          key={book._id}
          className="card bg-base-100 shadow-sm border border-gray-200"
        >
          <figure className="px-4 pt-4">
            <img
              className="rounded-xl h-60 w-full object-cover"
              src={book?.coverImage}
              alt={book.title}
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title text-lg font-bold">{book.title}</h2>
            <p>
              <span className="font-semibold">Author:</span> {book.author}
            </p>
            <p>
              <span className="font-semibold">Genre:</span> {book.genre}
            </p>
            <p className="line-clamp-2 text-sm text-gray-600">{book.summary}</p>
            <div className="flex justify-between items-center mt-2">
              <span className="badge badge-secondary">
                Rating: {book.rating}
              </span>
            </div>
            <div className="card-actions justify-end mt-4">
              <button className="btn btn-primary btn-sm">View Details</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BookService;
