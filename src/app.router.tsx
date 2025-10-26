import { createBrowserRouter } from "react-router";

import { HomePage } from "./pages/HomePage";
import { MainLayout } from "@/layouts/MainLayout";
import { SearchPage } from "./pages/search/SearchPage";
import { MediaDetails } from "./pages/details/MediaDetails";

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
        path: ":mediaType/:id",
        element: <MediaDetails />,
      },
      {
        path: "search",
        element: <SearchPage />,
      },
    ],
  },
]);
