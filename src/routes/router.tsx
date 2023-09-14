import Error404Page from "@/pages/Error404Page";
import { Navigate, createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import BooksPage from "../pages/BooksPage/BooksPage";

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Navigate to="/books/1" />,
      },
      {
        path: "/books",
        element: <Navigate to="/books/1" />,
      },
      {
        path: "/books/:pageNumber",
        element: <BooksPage />,
      },
    ],
  },
  {
    path: "*",
    element: <Error404Page />,
  },
]);

export default router;
