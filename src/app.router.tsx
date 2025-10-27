import { createBrowserRouter } from "react-router";

import { HomePage } from "./pages/HomePage";
import { MainLayout } from "@/layouts/MainLayout";
import { SearchPage } from "./pages/search/SearchPage";
import { AnimeDetails } from "./pages/details/AnimeDetails";
import { MangaDetails } from "./pages/details/MangaDetails";
import { SearchAnimePage } from "./pages/search/SearchAnimePage";
import { SearchMangaPage } from "./pages/search/SearchMangaPage";

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
      {
        path: "search/anime",
        element: <SearchAnimePage />,
      },
      {
        path: "search/manga",
        element: <SearchMangaPage />,
      },
    ],
  },
]);
