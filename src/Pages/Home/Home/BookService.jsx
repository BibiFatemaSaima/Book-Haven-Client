import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router";

const BookService = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:3000/books")
      .then((res) => {
        // latest 6 books
        setBooks(res.data.slice(-6).reverse());
        setLoading(false);
      })
      .catch((error) => {
        // console.error(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="text-center p-10">Loading books...</p>;
  }

  if (!books || books.length === 0) {
    return <p className="text-center p-10">No books found</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-5">
      {books.map((book) => (
        <div
          key={book._id}
          className="card bg-base-100 shadow-sm border border-gray-200"
        >
          <figure className="px-4 pt-4">
            <img
              src={book.coverImage}
              alt={book.title}
              className="rounded-xl h-60 w-full object-cover"
            />
          </figure>

          <div className="card-body">
            <h2 className="card-title text-lg font-bold">
              {book.title}
            </h2>

            <p>
              <span className="font-semibold">Author:</span>{" "}
              {book.author}
            </p>

            <p>
              <span className="font-semibold">Genre:</span>{" "}
              {book.genre}
            </p>

            <p className="line-clamp-2 text-sm text-gray-600">
              {book.summary}
            </p>

            <div className="flex justify-between items-center mt-2">
              <span className="badge badge-secondary">
                Rating: {book.rating}
              </span>
            </div>

            <div className="card-actions justify-end mt-4">
              <Link
                to={`/books/${book._id}`}
                className="btn btn-primary btn-sm"
              >
                View Details
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BookService;
