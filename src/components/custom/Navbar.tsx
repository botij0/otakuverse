import { Menu, X } from "lucide-react";
import { useNavigate } from "react-router";
import { useState } from "react";

import { NavMenuCustom } from "./NavMenuCustom";
import { MobileMenuCustom } from "./MobileMenuCustom";
import { InputSearchMedia } from "./InputSearchMedia";

const Navbar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-lg">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center me-4 cursor-pointer" onClick={() => navigate('/')}>
            <div className="text-lg lg:text-2xl font-title bg-linear-to-r from-primary to-accent bg-clip-text text-transparent">
              OtakuVerse
            </div>
          </div>
          {/* Desktop Nav Links */}
          <div className="hidden md:flex">
            <NavMenuCustom />
          </div>

          {/* Desktop Search */}
          <div className="hidden md:flex flex-1 max-w-xs mx-8">
            <InputSearchMedia setIsMenuOpen={setIsMenuOpen} />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-foreground"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <MobileMenuCustom
            setIsMenuOpen={setIsMenuOpen}
          />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
