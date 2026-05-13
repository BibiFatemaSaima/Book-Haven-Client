import React, { useContext } from "react";
import { AuthContext } from "../../../components/AuthContext/AuthContext";
import axios from "axios";
import toast from "react-hot-toast";

const AddBook = () => {
  const { user } = useContext(AuthContext);

  const handleAddBook = (e) => {
    e.preventDefault();
    const form = e.target;

    const title = form.title.value;
    const author = form.author.value;
    const genre = form.genre.value;
    const rating = parseFloat(form.rating.value);
    const price = parseFloat(form.price.value) || 100;
    const summary = form.summary.value;
    const coverImage = form.coverImage.value;

    const formData = {
      title,
      author,
      genre,
      rating,
      price,
      summary,
      coverImage,
      userName: user?.displayName,
      userEmail: user?.email,
    };

    axios
      .post(
        "https://assignment-10-server-gold-delta.vercel.app/books",
        formData
      )
      .then((res) => {
        console.log(res.data);

        toast.success("Book added successfully!");

        form.reset();
      })
      .catch((err) => {
        console.log(err);

        toast.error("Failed to add book!");
      });
  };

  if (!user) {
    return <p className="text-center mt-10">Please login to add a book</p>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Add Book</h2>

      <form onSubmit={handleAddBook} className="space-y-4">
        <input
          name="title"
          placeholder="Title"
          className="input input-bordered w-full"
          required
        />

        <input
          name="author"
          placeholder="Author"
          className="input input-bordered w-full"
          required
        />

        <input
          name="genre"
          placeholder="Genre"
          className="input input-bordered w-full"
          required
        />

        <input
          type="number"
          name="rating"
          step="0.1"
          min="0"
          max="5"
          placeholder="Rating"
          className="input input-bordered w-full"
          required
        />

        <input
          type="number"
          name="price"
          placeholder="Price (default 100)"
          className="input input-bordered w-full"
        />

        <textarea
          name="summary"
          placeholder="Summary"
          className="textarea textarea-bordered w-full"
          required
        />

        <input
          name="coverImage"
          placeholder="Cover Image URL"
          className="input input-bordered w-full"
          required
        />

        {/* User Info */}
        <input
          value={user.displayName || ""}
          readOnly
          className="input input-bordered w-full"
        />

        <input
          value={user.email || ""}
          readOnly
          className="input input-bordered w-full"
        />

        <button className="btn btn-primary w-full">
          Add Book
        </button>
      </form>
    </div>
  );
};

export default AddBook;