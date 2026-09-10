import { Outlet } from "react-router";

import Navbar from "@/components/custom/Navbar";
import Footer from "@/components/custom/Footer";

export const MainLayout = () => {
  return (
    <div className="min-h-[100dvh] flex flex-col">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[90] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        Skip to content
      </a>
      <Navbar />
      <div id="main-content" className="flex-1">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};
