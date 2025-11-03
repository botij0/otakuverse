import { createBrowserRouter } from "react-router";

import { HomePage } from "./pages/HomePage";
import { MainLayout } from "@/layouts/MainLayout";
import { SearchPage } from "./pages/search/SearchPage";

import { AnimeTopPage } from "./pages/anime/AnimeTopPage";
import { SearchAnimePage } from "./pages/anime/AnimeSearchPage";
import { AnimeDetailsPage } from "./pages/anime/AnimeDetailsPage";

import { MangaTopPage } from "./pages/manga/MangaTopPage";
import { SearchMangaPage } from "./pages/manga/MangaSearchPage";
import { MangaDetailsPage } from "./pages/manga/MangaDetailsPage";

import { CharacterTopPage } from "./pages/characters/CharacterTopPage";
import { CharacterSearchPage } from "./pages/characters/CharacterSearchPage";
import { CharacterDetailsPage } from "./pages/characters/CharacterDetailsPage";
import { SeasonalAnimePage } from "./pages/anime/AnimeSeasonalPage";

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
      {
        path: "anime/seasonal",
        element: <SeasonalAnimePage />,
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

      // Characters
      {
        path: "character/:id",
        element: <CharacterDetailsPage />,
      },
      {
        path: "character/search",
        element: <CharacterSearchPage />,
      },
      {
        path: "character/top",
        element: <CharacterTopPage />,
      },
    ],
  },
]);
