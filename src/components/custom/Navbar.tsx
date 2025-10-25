import { useRef, useState, type KeyboardEvent } from "react";
import { Menu, Search, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Link, useNavigate, useSearchParams } from "react-router";
import { Input } from "../ui/input";

const Navbar = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const query = searchParams.get("query") || "";

  const handleSearch = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== "Enter") return;
    const query = inputRef.current?.value;

    const newSearchParams = new URLSearchParams();

    if (!query) {
      newSearchParams.delete("query");
    } else {
      newSearchParams.set("query", inputRef.current!.value);
    }
    navigate("/search");
    setSearchParams(newSearchParams);
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-lg">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="text-2xl font-title bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              AnimeVerse
            </div>
          </div>

          {/* Desktop Search */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search anime or manga..."
                ref={inputRef}
                onKeyDown={handleSearch}
                defaultValue={query}
                className="pl-10 bg-muted border-border focus:ring-2 focus:ring-primary text-primary-foreground"
              />
            </div>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              to="/"
              className="text-foreground hover:text-primary transition-colors py-2"
            >
              All
            </Link>
            <Link
              to="/type/anime"
              className="text-foreground hover:text-primary transition-colors py-2"
            >
              Anime
            </Link>
            <Link
              to="/type/manga"
              className="text-foreground hover:text-primary transition-colors py-2"
            >
              Manga
            </Link>
            <Button
              variant="default"
              className="bg-gradient-to-r from-primary to-fuchsia-900 hover:opacity-90 transition-opacity"
            >
              Sign In
            </Button>
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
          <div className="md:hidden py-4 space-y-4 animate-fade-in">
            <div className="w-full">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search anime or manga..."
                  ref={inputRef}
                  onKeyDown={handleSearch}
                  defaultValue={query}
                  className="pl-10 bg-muted border-border focus:ring-2 focus:ring-primary text-primary-foreground"
                />
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <Link
                to="#"
                className="text-foreground hover:text-primary transition-colors py-2"
              >
                All
              </Link>
              <Link
                to="#"
                className="text-foreground hover:text-primary transition-colors py-2"
              >
                Anime
              </Link>
              <Link
                to="#"
                className="text-foreground hover:text-primary transition-colors py-2"
              >
                Manga
              </Link>
              <Button
                variant="default"
                className="w-full bg-gradient-to-r from-primary to-fuchsia-900"
              >
                Sign In
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
