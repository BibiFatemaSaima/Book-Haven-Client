import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout";
import Home from "../Pages/Home/Home/Home";
import AllBooks from "../components/AllBooks";
import axios from "axios";
import Login from "../Pages/Home/Home/Login";

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
        path: 'login',
      Component: Login,  
      }
    ],
  },
]);
