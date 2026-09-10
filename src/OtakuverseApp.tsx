import { RouterProvider } from "react-router";
import { ThemeProvider } from "next-themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { appRouter } from "@/app.router";
import { BuildYourTopProvider } from "@/context/BuildYourTopContext";

const queryClient = new QueryClient();

function OtakuverseApp() {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      storageKey="otakuverse-theme"
      disableTransitionOnChange
    >
      <QueryClientProvider client={queryClient}>
        <BuildYourTopProvider>
          <RouterProvider router={appRouter} />
        </BuildYourTopProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default OtakuverseApp;
