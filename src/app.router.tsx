import { createBrowserRouter } from "react-router";

import { HomePage } from "./pages/HomePage";
import { MainLayout } from "@/layouts/MainLayout";
import { SearchPage } from "./pages/search/SearchPage";
import { AnimeTopPage } from "./pages/anime/AnimeTopPage";
import { AnimeDetailsPage } from "./pages/anime/AnimeDetailsPage";
import { MangaDetailsPage } from "./pages/manga/MangaDetailsPage";
import { SearchAnimePage } from "./pages/anime/AnimeSearchPage";
import { SearchMangaPage } from "./pages/manga/MangaSearchPage";
import { MangaTopPage } from "./pages/manga/MangaTopPage";

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
        path: "search",
        element: <SearchPage />,
      },

      // Anime
      {
        path: "anime/:id",
        element: <AnimeDetailsPage />,
      },
      {
        path: "anime/top",
        element: <AnimeTopPage />,
      },
      {
        path: "anime/search",
        element: <SearchAnimePage />,
      },

      // Manga
      {
        path: "manga/:id",
        element: <MangaDetailsPage />,
      },
      {
        path: "manga/search",
        element: <SearchMangaPage />,
      },
      {
        path: "manga/top",
        element: <MangaTopPage />,
      },
    ],
  },
]);
