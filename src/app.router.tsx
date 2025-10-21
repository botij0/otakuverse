import { createBrowserRouter } from "react-router";

import { HomePage } from "./pages/HomePage";
import { TypePage } from "./pages/type/TypePage";
import { MainLayout } from "@/layouts/MainLayout";
import { SearchPage } from "./pages/search/SearchPage";

export const appRouter = createBrowserRouter([
  // Main routes
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "type/:type",
        element: <TypePage />,
      },
      {
        path: "search/",
        element: <SearchPage />,
      },
    ],
  },
]);
