import type { KeyboardEvent, RefObject } from "react";
import { Link } from "react-router";
import { Input } from "../ui/input";
import { Search } from "lucide-react";

interface MobileMenuCustomProps {
  inputRef: RefObject<HTMLInputElement | null>;
  handleSearch: (event: KeyboardEvent<HTMLInputElement>) => void;
  onClose: () => void;
}

export const MobileMenuCustom = ({ inputRef, handleSearch, onClose }: MobileMenuCustomProps) => {
  return (
    <div className="md:hidden py-4 space-y-4 animate-fade-in">
      <div className="w-full">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search anime or manga..."
            ref={inputRef}
            onKeyDown={handleSearch}
            className="pl-10 bg-muted border-border focus:ring-2 focus:ring-primary text-primary-foreground"
          />
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <Link
          to="/"
          onClick={onClose}
          className="text-foreground hover:text-primary transition-colors py-2"
        >
          Home
        </Link>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-muted-foreground w-full  transition-colors">
            Anime
          </div>
          <hr />
          <ul className="pl-5 space-y-2 text-foreground">
            <li>
              <Link
                to="/anime/top"
                onClick={onClose}
                className="block hover:text-primary transition-colors py-1"
              >
                Top Anime
              </Link>
            </li>
            <li>
              <Link
                to="/anime/seasonal"
                onClick={onClose}
                className="block hover:text-primary transition-colors py-1"
              >
                Seasonal Animes
              </Link>
            </li>
            <li>
              <Link
                to="/anime/search"
                onClick={onClose}
                className="block text-sm hover:text-primary transition-colors py-1"
              >
                Search Anime
              </Link>
            </li>
            <li>
              <Link
                to="/anime/recommendations"
                onClick={onClose}
                className="block text-sm hover:text-primary transition-colors py-1"
              >
                Recomendations
              </Link>
            </li>
          </ul>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-muted-foreground w-full  transition-colors">
            Manga
          </div>
          <hr />
          <ul className="pl-5 space-y-2 text-foreground">
            <li>
              <Link
                to="/manga/top"
                onClick={onClose}
                className="block hover:text-primary transition-colors py-1"
              >
                Top Mangas
              </Link>
            </li>
            <li>
              <Link
                to="/manga/search"
                onClick={onClose}
                className="block text-sm hover:text-primary transition-colors py-1"
              >
                Search Manga
              </Link>
            </li>
            <li>
              <Link
                to="/manga/recommendations"
                onClick={onClose}
                className="block text-sm hover:text-primary transition-colors py-1"
              >
                Recomendations
              </Link>
            </li>
          </ul>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-muted-foreground w-full  transition-colors">
            Characters
          </div>
          <hr />
          <ul className="pl-5 space-y-2 text-foreground">
            <li>
              <Link
                to="/character/top"
                onClick={onClose}
                className="block hover:text-primary transition-colors py-1"
              >
                Top Characters
              </Link>
            </li>
            <li>
              <Link
                to="/character/search"
                onClick={onClose}
                className="block text-sm hover:text-primary transition-colors py-1"
              >
                Search Characters
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
