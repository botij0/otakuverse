import { Link } from "react-router";
import type { Dispatch, SetStateAction } from "react";

import { InputSearchMedia } from "./media/InputSearchMedia";

interface MobileMenuCustomProps {
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>;
}

export const MobileMenuCustom = ({
  setIsMenuOpen,
}: MobileMenuCustomProps) => {

  const onClose = () => {
    setIsMenuOpen(false);
  }

  return (
    <div className="md:hidden py-4 space-y-4 animate-fade-in relative">
      <div className="w-full relative">
        <InputSearchMedia setIsMenuOpen={setIsMenuOpen} />
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
