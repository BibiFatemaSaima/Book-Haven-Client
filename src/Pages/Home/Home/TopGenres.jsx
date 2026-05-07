import React from "react";

const TopGenres = () => {
  const books = [
    {
      title: "The Silent Forest",
      genre: "Fantasy",
      coverImage: "https://i.ibb.co.com/vfZSR2D/91-D8v-CU1g2-L-UF1000-1000-QL80.jpg",
    },
    {
      title: "Shadows of Dhaka",
      genre: "Mystery",
      coverImage: "https://i.ibb.co.com/0pjPbZvC/emblematic-elements-city-template-vector-icon-building-urban-art-dhaka-bangladesh-asia-design-skylin.webp",
    },
    {
      title: "The Last Algorithm",
      genre: "Science Fiction",
      coverImage: "https://i.ibb.co.com/PGGxXGRY/71g-Yib-Wj-YUL-UF894-1000-QL80.jpg",
    },
    {
      title: "Mind Over Matter",
      genre: "Non-Fiction",
      coverImage: "https://i.ibb.co.com/7t01kCHB/mind-over-matter-strength-smarts-highlights-power-mental-resilience-determination-mind-over-matter-s.webp",
    },
    {
      title: "Broken Alibi",
      genre: "Thriller",
      coverImage: "https://i.ibb.co.com/bgw52MVM/images.jpg",
    },
    {
      title: "Echoes of 1971",
      genre: "History",
      coverImage: "https://i.ibb.co.com/9mxnkzyD/hq720.jpg",
    },
    {
      title: "The Startup Blueprint",
      genre: "Business",
      coverImage: "https://m.media-amazon.com/images/I/61WpG68bb4L._AC_UF1000,1000_QL80_.jpg",
    },
    {
      title: "Love Beyond Time",
      genre: "Romance",
      coverImage: "https://i.ibb.co.com/675HrLL2/71-Ij-Eg-9-JFL-AC-UF1000-1000-QL80.jpg",
    },
  ];

  return (
    <div className="my-12 px-4">
      <h2 className="text-3xl font-bold text-center mb-8">
        📚 Top Genres
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {books.map((item, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-xl transition duration-300"
          >
            <img
              src={item.coverImage}
              alt={item.genre}
              className="h-48 w-full object-cover"
            />

            <div className="p-4 text-center">
              <h3 className="text-lg font-semibold">{item.genre}</h3>
              <p className="text-sm text-gray-500">
                Featured Book: {item.title}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopGenres;