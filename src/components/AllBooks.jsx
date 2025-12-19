import React from "react";
import { useLoaderData } from "react-router";

const AllBooks = () => {
  const data = useLoaderData();
  console.log(data);

  return (
    <div>
      {data.map((book) => (
        <div className="card bg-base-100 w-96 shadow-sm">
          <figure>
            <img className="" src={book.coverImage} alt={book.title} />
          </figure>
          <div className="card-body">
            <h2 className="card-title">Card Title</h2>
            <p>Title: {book.author}</p>
            <p>Summary: {book.summary}</p>
            <p>Rating: {book.rating}</p>
            <p>UserEmail: {book.userEmail}</p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">view Details</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllBooks;
