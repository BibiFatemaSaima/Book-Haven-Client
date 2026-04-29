import React, { useContext } from "react";
import { AuthContext } from "../../../components/AuthContext/AuthContext";
import axios from "axios";

const AddBook = () => {
  const { user } = useContext(AuthContext);

  const handleAddBook = (e) => {
    e.preventDefault();
    const form = e.target;

    const bookData = {
      title: form.title.value,
      author: form.author.value,
      genre: form.genre.value,
      rating: parseFloat(form.rating.value),
      summary: form.summary.value,
      coverImage: form.coverImage.value,
      userName: user?.displayName,
      userEmail: user?.email,
    };

    // console.log(bookData); // test
    axios.post('http://localhost:3000/books', bookData)
      .then(res => {
       console.log(res);
      
    })

    
  };

  if (!user) {
    return <p className="text-center mt-10">Please login to add a book</p>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Create Listing</h2>
      <form onSubmit={handleAddBook} className="space-y-4">
        <div>
          <label className="label">Title</label>
          <input
            name="title"
            required
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="label">Author</label>
          <input
            name="author"
            required
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="label">Genre</label>
          <input
            name="genre"
            required
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="label">Rating</label>
          <input
            type="number"
            name="rating"
            step="0.1"
            min="0"
            max="5"
            required
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="label">Summary</label>
          <textarea
            name="summary"
            required
            className="textarea textarea-bordered w-full"
          />
        </div>

        <div>
          <label className="label">Cover Image URL</label>
          <input
            name="coverImage"
            required
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="label">User Name</label>
          <input
            value={user.displayName || ""}
            readOnly
            className="input input-bordered w-full bg-gray-100"
          />
        </div>

        <div>
          <label className="label">User Email</label>
          <input
            value={user.email || ""}
            readOnly
            className="input input-bordered w-full bg-gray-100"
          />
        </div>

        <button className="btn btn-primary w-full">Add Book</button>
      </form>
    </div>
  );
};

export default AddBook;
