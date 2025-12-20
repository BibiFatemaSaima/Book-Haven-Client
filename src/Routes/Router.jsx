import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout";
import Home from "../Pages/Home/Home/Home";
import AllBooks from "../components/AllBooks";
import axios from "axios";
import Login from "../Pages/Home/Home/Login";
import Register from "../Pages/Home/Home/Register";
import AddBook from "../Pages/Home/Home/AddBook";
import MyBooks from "../Pages/Home/Home/MyBooks";
import BookDetails from "../components/BookDetails";
import PrivateRoute from "./PrivateRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
        loader: async () => {
          const response = await axios.get("http://localhost:3000/books");
          return response.data;
        },
      },
      {
        path: "/all-books",
        Component: AllBooks,
        loader: async () => {
          const response = await axios.get("http://localhost:3000/books");
          return response.data;
        },
      },
      {
        path: "login",
        Component: Login,
      },
      {
        path: "register",
        Component: Register,
      },
      {
        path: "add-book",
        Component: AddBook,
      },
      {
        path: "my-book",
        Component: MyBooks,
      },
      {
        path: "books/:id",
        element: (
          <PrivateRoute>
            <BookDetails />
          </PrivateRoute>
        ),
        loader: async ({ params }) => {
          return fetch(`http://localhost:3000/books/${params.id}`);
        },
      },
    ],
  },
]);
