import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout";
import Home from "../Pages/Home/Home/Home";
import AllBooks from "../components/AllBooks";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "allbooks",
        Component: AllBooks,
        loader: () => fetch('http://localhost:3000/books'),
      },
    ],
  },
]);
