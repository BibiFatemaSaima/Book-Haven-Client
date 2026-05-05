import React, { useMemo, useState } from "react";
import { useLoaderData, useNavigate } from "react-router";

const AllBooks = () => {
  const data = useLoaderData();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("");

  const handleDetailsClick = (book) => {
    navigate(`/books/${book._id}`);
  };

  if (!data || !Array.isArray(data)) {
    return <p className="text-center p-10">No books found</p>;
  }

  const genres = ["All", ...new Set(data.map((b) => b.genre))];

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

    // sort
    if (sort === "asc") {
      filtered.sort((a, b) => a.rating - b.rating);
    } else if (sort === "desc") {
      filtered.sort((a, b) => b.rating - a.rating);
    }

    return filtered;
  }, [data, category, search, sort]);

  return (
    <div className="p-5">

      {/* FILTER BAR */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by title or author..."
          className="input input-bordered w-full md:w-1/3"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

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

      {/* TABLE */}
      {filteredBooks.length === 0 ? (
        <p className="text-center p-10">No books found</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">

            {/* HEAD */}
            <thead className="bg-base-200">
              <tr>
                <th>#</th>
                <th>Book Name</th>
                <th>Author</th>
                <th>Genre</th>
                <th>Rating ⭐</th>
                <th>Action</th>
              </tr>
            </thead>

            {/* BODY */}
            <tbody>
              {filteredBooks.map((book, index) => (
                <tr key={book._id}>
                  <td>{index + 1}</td>

                  <td className="font-semibold">{book.title}</td>

                  <td>{book.author}</td>

                  <td>{book.genre}</td>

                  <td>{book.rating}</td>

                  <td>
                    <button
                      onClick={() => handleDetailsClick(book)}
                      className="btn btn-primary btn-xs"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      )}
    </div>
  );
};

export default AllBooks;