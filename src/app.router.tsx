import { createBrowserRouter } from "react-router";

import { HomePage } from "./pages/HomePage";
import { MainLayout } from "@/layouts/MainLayout";
import { SearchPage } from "./pages/search/SearchPage";
import { AnimeDetailsPage } from "./pages/anime/AnimeDetailsPage";
import { MangaDetailsPage } from "./pages/manga/MangaDetailsPage";
import { SearchAnimePage } from "./pages/anime/SearchAnimePage";
import { SearchMangaPage } from "./pages/manga/SearchMangaPage";

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
        element: <AnimeDetailsPage />,
      },
      {
        path: "manga/:id",
        element: <MangaDetailsPage />,
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
