import { RouterProvider } from "react-router";
import { appRouter } from "./app.router";

function MyAnimeListApp() {
  return <RouterProvider router={appRouter} />;
}

export default MyAnimeListApp;
