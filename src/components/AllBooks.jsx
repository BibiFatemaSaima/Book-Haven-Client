import React, { useMemo, useState } from "react";
import { useLoaderData, useNavigate } from "react-router";

const AllBooks = () => {
  const data = useLoaderData();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("");

  // View Details
  const handleDetailsClick = (book) => {
    navigate(`/books/${book._id}`);
  };

  // Loader safety check
  if (!data || !Array.isArray(data)) {
    return <p className="text-center p-10">No books found</p>;
  }

  // Dynamic genres
  const genres = ["All", ...new Set(data.map((b) => b.genre))];

  //  Filter + Search + Sort
  const filteredBooks = useMemo(() => {
    let filtered = [...data];

    // category filter
    if (category !== "All") {
      filtered = filtered.filter(
        (b) => b.genre.toLowerCase() === category.toLowerCase()
      );
    }

    // search
    if (search) {
      filtered = filtered.filter(
        (b) =>
          b.title.toLowerCase().includes(search.toLowerCase()) ||
          b.author.toLowerCase().includes(search.toLowerCase())
      );
    }

    // sort by rating
    if (sort === "asc") {
      filtered.sort((a, b) => a.rating - b.rating);
    } else if (sort === "desc") {
      filtered.sort((a, b) => b.rating - a.rating);
    }

    return filtered;
  }, [data, category, search, sort]);

  return (
    <div className="p-5">

      {/*  FILTER BAR */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">

        {/* Search */}
        <input
          type="text"
          placeholder="Search by title or author..."
          className="input input-bordered w-full md:w-1/3"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Category */}
        <select
          className="select select-bordered w-full md:w-1/4"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {genres.map((g, i) => (
            <option key={i} value={g}>
              {g}
            </option>
          ))}
        </select>

        {/* Sort */}
        <select
          className="select select-bordered w-full md:w-1/4"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="">Sort by Rating</option>
          <option value="asc">Low → High</option>
          <option value="desc">High → Low</option>
        </select>

      </div>

      {/* 📚 BOOK GRID */}
      {filteredBooks.length === 0 ? (
        <p className="text-center p-10">No books found</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBooks.map((book) => (
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
                <h2 className="card-title text-lg font-bold">
                  {book.title}
                </h2>

                <p>
                  <span className="font-semibold">Author:</span>{" "}
                  {book.author}
                </p>

                <p className="text-sm">
                  <span className="font-semibold">Genre:</span>{" "}
                  {book.genre}
                </p>

                <p className="line-clamp-2 text-sm text-gray-600">
                  {book.summary}
                </p>

                <div className="flex justify-between items-center mt-2">
                  <span className="badge badge-secondary">
                    ⭐ {book.rating}
                  </span>
                </div>

                <div className="card-actions justify-end mt-4">
                  <button
                    onClick={() => handleDetailsClick(book)}
                    className="btn btn-primary btn-sm"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};

export default AllBooks;