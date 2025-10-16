import { createBrowserRouter } from "react-router";

import { MainLayout } from "@/layouts/MainLayout";
import { HomePage } from "./pages/HomePage";

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
      // {
      //   path: "product/:idSlug",
      //   element: <ProductPage />,
      // },
      // {
      //   path: "gender/:gender",
      //   element: <GenderPage />,
      // },
    ],
  },
]);
