import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";

const BookSlider = () => {
  const slides = [
    {
     coverImage: "https://i.ibb.co.com/Gv1BJbDm/1-zo7f-Bko1-Xoo-Jvu-Ta6y-Swcw.jpg",
      title: "The Great Gatsby",
      desc: "A classic novel exploring themes of wealth, love, and the American Dream.",
    },
    {
     coverImage: "https://i.ibb.co.com/wrs2qyFt/hq720-1.jpg",
      title: "To Kill a Mockingbird",
      desc: "A timeless story of racial injustice and childhood innocence.",
    },
    {
     coverImage: "https://i.ibb.co.com/fz7yrFyv/8e0d98-78defcf307df43d083e43d8ff584b43a-mv2.avif",
      title: "1984",
      desc: "A dystopian novel about totalitarianism and surveillance.",
    },
    {
      coverImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/USAF_F-16A_F-15C_F-15E_Desert_Storm_edit2.jpg/1200px-USAF_F-16A_F-15C_F-15E_Desert_Storm_edit2.jpg",
      title: "Pride and Prejudice",
      desc: "A classic romantic tale of manners and societal expectations.",
    },
  ];

  return (
    <div className="my-10">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
        📚 Featured Books
      </h2>

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
        spaceBetween={30}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="mySwiper"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative group rounded-xl overflow-hidden shadow-lg hover:scale-[1.02] transition-transform duration-300">
              <img
                src={slide.coverImage}
                alt={slide.title}
                className="w-full h-72 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h3 className="text-lg font-bold text-white mb-1">
                  {slide.title}
                </h3>
                <p className="text-sm text-gray-200">{slide.desc}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default BookSlider;
