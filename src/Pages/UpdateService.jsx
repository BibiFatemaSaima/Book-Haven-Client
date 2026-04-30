import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../components/AuthContext/AuthContext";
import { useParams } from "react-router";
import axios from "axios";

const UpdateService = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();

  const [service, setService] = useState(null);
  const [selectedBook, setSelectedBook] = useState({});
  const [booksData, setBooksData] = useState([]);
  const [category, setCategory] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3000/books")
      .then((res) => setBooksData(res.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/books/${id}`)
      .then((res) => {
        setService(res.data);
        setSelectedBook(res.data);
        setCategory(res.data?.category || "");
      })
      .catch((err) => console.log(err));
  }, [id]);

  const genres = [...new Set(booksData.map((book) => book.genre))];

  const handleChange = (e) => {
    const { name, value } = e.target;

    setSelectedBook((prev) => ({
      ...prev,
      [name]: name === "rating" || name === "price" ? Number(value) : value,
    }));
  };

  const handleGenreChange = (e) => {
    const selectedGenre = e.target.value;

    const foundBook = booksData.find((book) => book.genre === selectedGenre);

    if (foundBook) {
      setSelectedBook((prev) => ({
        ...prev,
        ...foundBook,
        genre: selectedGenre,
        price: foundBook.price || prev.price || 100,
      }));
    } else {
      setSelectedBook((prev) => ({
        ...prev,
        genre: selectedGenre,
      }));
    }
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    const { _id, ...rest } = selectedBook;

    const updatedBook = {
      ...rest,
      rating: parseFloat(rest.rating),
      price: parseFloat(rest.price) || 100,
      category: category,
      userName: user?.displayName || "",
      userEmail: user?.email || "",
    };

    axios
      .put(`http://localhost:3000/books/${id}`, updatedBook)
      .then((res) => {
        console.log("Updated:", res.data);

        if (res.data.modifiedCount > 0) {
          alert("Book updated successfully!");
        } else {
          alert("No changes detected!");
        }
      })
      .catch((err) => {
        console.log(err);
        alert("Update failed!");
      });
  };

  if (!service) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Update Listing</h2>

      <form onSubmit={handleUpdate} className="space-y-4">
        <input
          name="title"
          value={selectedBook.title || ""}
          onChange={handleChange}
          className="input input-bordered w-full"
        />

        <input
          name="author"
          value={selectedBook.author || ""}
          onChange={handleChange}
          className="input input-bordered w-full"
        />

        <select
          name="genre"
          value={selectedBook.genre || ""}
          onChange={handleGenreChange}
          className="select select-bordered w-full"
        >
          <option value="">Select Genre</option>
          {genres.map((genre, i) => (
            <option key={i} value={genre}>
              {genre}
            </option>
          ))}
        </select>

        <input
          type="number"
          name="rating"
          value={selectedBook.rating || ""}
          onChange={handleChange}
          className="input input-bordered w-full"
        />

        <input
          type="number"
          name="price"
          value={selectedBook.price || 100}
          onChange={handleChange}
          className="input input-bordered w-full"
        />

        <textarea
          name="summary"
          value={selectedBook.summary || ""}
          onChange={handleChange}
          className="textarea textarea-bordered w-full"
        />

        <input
          name="coverImage"
          value={selectedBook.coverImage || ""}
          onChange={handleChange}
          className="input input-bordered w-full"
        />

        <input
          name="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="input input-bordered w-full"
        />

        <input
          value={user?.displayName || ""}
          readOnly
          className="input w-full"
        />
        <input value={user?.email || ""} readOnly className="input w-full" />

        <button className="btn btn-primary w-full">Update Book</button>
      </form>
    </div>
  );
};

export default UpdateService;
