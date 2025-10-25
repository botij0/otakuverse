import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import MyAnimeListApp from "@/MyAnimeListApp.tsx";

import "@/index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MyAnimeListApp />
  </StrictMode>
);
