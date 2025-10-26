import { createBrowserRouter } from "react-router";

import { HomePage } from "./pages/HomePage";
import { MainLayout } from "@/layouts/MainLayout";
import { SearchPage } from "./pages/search/SearchPage";
import { AnimeDetails } from "./pages/details/AnimeDetails";
import { MangaDetails } from "./pages/details/MangaDetails";

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
        path: "anime/:id",
        element: <AnimeDetails />,
      },
      {
        path: "manga/:id",
        element: <MangaDetails />,
      },
      {
        path: "search",
        element: <SearchPage />,
      },
    ],
  },
]);
