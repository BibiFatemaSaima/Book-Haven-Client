import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import axios from "axios";

const BookDetails = () => {
  const { id } = useParams(); // URL থেকে book id নেবে
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/books/${id}`);
        setBook(response.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch book details.");
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  if (loading) {
    return <p className="text-center p-10">Loading...</p>;
  }

  if (error || !book) {
    return <p className="text-center p-10">{error || "Book not found"}</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="card bg-base-100 shadow-md flex flex-col lg:flex-row gap-6">
        {/* Cover Image */}
        <figure className="lg:w-1/3 p-4">
          <img
            src={book.coverImage}
            alt={book.title}
            className="rounded-xl w-full h-full object-cover"
          />
        </figure>

        {/* Book Details */}
        <div className="card-body lg:w-2/3 space-y-3">
          <h2 className="card-title text-3xl font-bold">{book.title}</h2>
          <p>
            <span className="font-semibold">Author:</span> {book.author}
          </p>
          {book.genre && (
            <p>
              <span className="font-semibold">Genre:</span> {book.genre}
            </p>
          )}
          {book.rating && (
            <p>
              <span className="font-semibold">Rating:</span> {book.rating}
            </p>
          )}
          {book.summary && (
            <p className="text-gray-700">
              <span className="font-semibold">Summary:</span> {book.summary}
            </p>
          )}
          {book.userEmail && (
            <p>
              <span className="font-semibold">Added by:</span> {book.userEmail}
            </p>
          )}

          {/* Back Button */}
          <div className="card-actions justify-start mt-4">
            <button
              onClick={() => navigate(-1)}
              className="btn btn-outline btn-sm"
            >
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
