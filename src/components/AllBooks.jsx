import React from "react";
import { useLoaderData, useNavigate } from "react-router";

const AllBooks = () => {
  const data = useLoaderData();
  const navigate = useNavigate();

  // View Details
  const handleDetailsClick = (book) => {
    navigate(`/books/${book._id}`);
  };

  // Delete Book
  const handleDeleteClick = async (book) => {
    const id = book._id;

    const confirmDelete = confirm("Are you sure you want to delete this book?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`http://localhost:3000/delete/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        console.log("Delete failed");
        return;
      }

      console.log("Book deleted successfully");
    
      window.location.reload();
    } catch (error) {
      // console.log("Delete error:", error);
    }
  };

  // Loader safety check
  if (!data || !Array.isArray(data)) {
    return <p className="text-center p-10">No books found</p>;
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

            <p className="line-clamp-2 text-sm text-gray-600">{book.summary}</p>

            <div className="card-actions justify-end mt-4">
              <button
                onClick={() => handleDetailsClick(book)}
                className="btn btn-primary btn-sm"
              >
                View Details
              </button>

              <button
                onClick={() => handleDeleteClick(book)}
                className="btn btn-error btn-sm"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllBooks;
