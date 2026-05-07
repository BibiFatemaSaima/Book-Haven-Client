import React from "react";

const BookOfTheWeek = () => {
  const book = {
    title: "The Last Algorithm",
    author: "James Walker",
    genre: "Science Fiction",
    rating: 4.7,
    summary:
      "A programmer creates an AI that begins to rewrite human destiny. As technology evolves, humanity faces its biggest ethical dilemma yet.",
    coverImage:
      "https://i.ibb.co.com/PGGxXGRY/71g-Yib-Wj-YUL-UF894-1000-QL80.jpg",
  };

  return (
    <div className="my-16 px-4">
      <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl p-[2px] shadow-xl">
        <div className="bg-white rounded-2xl flex flex-col md:flex-row overflow-hidden">
          
          {/* Image Section */}
          <div className="md:w-1/2 overflow-hidden">
            <img
              src={book.coverImage}
              alt={book.title}
              className="w-full h-full object-cover hover:scale-105 transition duration-500"
            />
          </div>

          {/* Content Section */}
          <div className="md:w-1/2 p-6 md:p-10 flex flex-col justify-center">
            <h2 className="text-3xl font-bold mb-3 text-gray-800">
              📖 Book of the Week
            </h2>

            <h3 className="text-2xl font-semibold text-indigo-600 mb-2">
              {book.title}
            </h3>

            <p className="text-gray-600 mb-2">
              <span className="font-medium">Author:</span> {book.author}
            </p>

            <p className="text-gray-600 mb-2">
              <span className="font-medium">Genre:</span> {book.genre}
            </p>

            {/* Rating */}
            <div className="flex items-center mb-4">
              <span className="text-yellow-500 text-lg mr-2">⭐</span>
              <span className="font-medium text-gray-700">
                {book.rating} / 5
              </span>
            </div>

            <p className="text-gray-700 mb-6 leading-relaxed">
              {book.summary}
            </p>

            {/* Button */}
            <button className="w-fit px-6 py-2 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 hover:scale-105 transition duration-300">
              Read More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookOfTheWeek;