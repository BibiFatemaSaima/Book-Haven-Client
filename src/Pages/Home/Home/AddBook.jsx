import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../components/AuthContext/AuthContext";
import axios from "axios";

const AddBook = () => {
  const { user } = useContext(AuthContext);

  const [selectedBook, setSelectedBook] = useState({});
  const [booksData, setBooksData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/books")
      .then((res) => setBooksData(res.data))
      .catch((err) => console.log(err));
  }, []);

  const genres = [...new Set(booksData.map((book) => book.genre))];

  const handleGenreChange = (e) => {
    const selectedGenre = e.target.value;

    const foundBook = booksData.find((book) => book.genre === selectedGenre);

    if (foundBook) {
      setSelectedBook({
        ...foundBook,
        price: foundBook.price || 100,
      });
    } else {
      setSelectedBook((prev) => ({
        ...prev,
        genre: selectedGenre,
      }));
    }
  };

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
      price: parseFloat(form.price.value) || 100,
      userName: user?.displayName,
      userEmail: user?.email,
    };

    axios
      .post("http://localhost:3000/books", bookData)
      .then((res) => {
        console.log(res);
        alert("Book added successfully!");

        form.reset();
        setSelectedBook({});
      })
      .catch((err) => console.log(err));
  };

  if (!user) {
    return <p className="text-center mt-10">Please login to add a book</p>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Create Listing</h2>

      <form onSubmit={handleAddBook} className="space-y-4">
        {/* Title */}
        <input
          name="title"
          placeholder="Title"
          value={selectedBook.title || ""}
          onChange={(e) =>
            setSelectedBook({ ...selectedBook, title: e.target.value })
          }
          className="input w-full"
          required
        />

        {/* Author */}
        <input
          name="author"
          placeholder="Author"
          value={selectedBook.author || ""}
          onChange={(e) =>
            setSelectedBook({ ...selectedBook, author: e.target.value })
          }
          className="input w-full"
          required
        />

        {/*  Genre Dropdown */}
        <select
          name="genre"
          value={selectedBook.genre || ""}
          onChange={handleGenreChange}
          className="select w-full"
          required
        >
          <option value="">Select Genre</option>
          {genres.map((genre, i) => (
            <option key={i} value={genre}>
              {genre}
            </option>
          ))}
        </select>

        {/* Rating */}
        <input
          type="number"
          name="rating"
          step="0.1"
          min="0"
          max="5"
          value={selectedBook.rating || ""}
          onChange={(e) =>
            setSelectedBook({ ...selectedBook, rating: e.target.value })
          }
          className="input w-full"
          required
        />

        {/*  Price */}
        <input
          type="number"
          name="price"
          value={selectedBook.price || 100}
          onChange={(e) =>
            setSelectedBook({ ...selectedBook, price: e.target.value })
          }
          className="input w-full"
        />

        {/* Summary */}
        <textarea
          name="summary"
          value={selectedBook.summary || ""}
          onChange={(e) =>
            setSelectedBook({ ...selectedBook, summary: e.target.value })
          }
          className="textarea w-full"
          required
        />

        {/* Cover */}
        <input
          name="coverImage"
          value={selectedBook.coverImage || ""}
          onChange={(e) =>
            setSelectedBook({ ...selectedBook, coverImage: e.target.value })
          }
          className="input w-full"
          required
        />

        {/* User Info */}
        <input
          value={user.displayName || ""}
          readOnly
          className="input w-full"
        />
        <input value={user.email || ""} readOnly className="input w-full" />

        <button className="btn btn-primary w-full">Add Book</button>
      </form>
    </div>
  );
};

export default AddBook;
