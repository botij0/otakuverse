import { Menu, X } from "lucide-react";
import { useNavigate } from "react-router";
import { useState } from "react";

import { NavMenuCustom } from "./NavMenuCustom";
import { ThemeToggle } from "./ThemeToggle";
import { MobileMenuCustom } from "./MobileMenuCustom";
import { InputSearchMedia } from "@/components/custom/media/InputSearchMedia";

const Navbar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 h-16 border-b border-border/80 bg-background/80 backdrop-blur-lg">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-16 items-center gap-4">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="font-title text-lg tracking-tight text-foreground lg:text-xl shrink-0 cursor-pointer"
          >
            Otaku<span className="text-primary">Verse</span>
          </button>

          <div className="hidden md:flex">
            <NavMenuCustom />
          </div>

          <div className="hidden md:flex flex-1 max-w-xs ml-auto">
            <InputSearchMedia setIsMenuOpen={setIsMenuOpen} />
          </div>

          <div className="ml-auto md:ml-0 flex items-center gap-1">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-foreground rounded-md p-2 hover:bg-muted active:scale-[0.98] transition-transform"
              aria-expanded={isMenuOpen}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {isMenuOpen && <MobileMenuCustom setIsMenuOpen={setIsMenuOpen} />}
      </div>
    </nav>
  );
};

export default Navbar;
