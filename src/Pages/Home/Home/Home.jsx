import React from "react";
import AllBooks from "../../../components/AllBooks";
import BookService from "./BookService";

const Home = () => {
  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold text-center my-8">
        Welcome to Book Store
      </h1>
     <BookService></BookService>
    </div>
  );
};

export default Home;
