import React from "react";

import BookService from "./BookService";
import BookSlider from "../../../components/BookSlider";
import TopGenres from "./TopGenres";
import BookOfTheWeek from "./BookOfTheWeek";

const Home = () => {
  return (
    <div className="">
      <div>
        <BookSlider></BookSlider>
      </div>
      <h1 className="text-3xl font-bold text-center my-8">
        Welcome to Book Store
      </h1>
      <BookService></BookService>
      <TopGenres></TopGenres>
      <BookOfTheWeek></BookOfTheWeek>
    </div>
  );
};

export default Home;
