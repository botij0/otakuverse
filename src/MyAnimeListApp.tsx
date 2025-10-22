import { RouterProvider } from "react-router";
import { appRouter } from "./app.router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function MyAnimeListApp() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={appRouter} />;
    </QueryClientProvider>
  );
}

export default MyAnimeListApp;
