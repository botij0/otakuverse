import { Outlet } from "react-router";

import Navbar from "@/components/custom/Navbar";
import Footer from "@/components/custom/Footer";

export const MainLayout = () => {
  return (
    <div className="min-h-screen">
      <Navbar onSearch={() => Promise.resolve} />

      <Outlet />

      <Footer />
    </div>
  );
};
