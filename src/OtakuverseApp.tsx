import { RouterProvider } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { appRouter } from "@/app.router";
import { BuildYourTopProvider } from "@/context/BuildYourTopContext";

const queryClient = new QueryClient();

function OtakuverseApp() {
  return (
    <QueryClientProvider client={queryClient}>
      <BuildYourTopProvider>
        <RouterProvider router={appRouter} />
      </BuildYourTopProvider>
    </QueryClientProvider>
  );
}

export default OtakuverseApp;
