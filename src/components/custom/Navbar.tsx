import { Menu, Search, X } from "lucide-react";
import { useLocation, useNavigate, useSearchParams } from "react-router";
import { useEffect, useState, type KeyboardEvent } from "react";

import { Input } from "@/components/ui/input";
import { NavMenuCustom } from "./NavMenuCustom";
import { MobileMenuCustom } from "./MobileMenuCustom";
import { useDebounce } from "@/hooks/useDebounce";
import { useSearchAnime } from "@/hooks/useSearchAnime";
import { useSearchManga } from "@/hooks/useSearchManga";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const initialQuery = searchParams.get("query") || "";
  const [inputValue, setInputValue] = useState(initialQuery);
  const debouncedSearchQuery = useDebounce(inputValue, 500);
  const [showDropdown, setShowDropdown] = useState(false);

  // Sync state if url changes externally
  useEffect(() => {
    const currentQuery = searchParams.get("query") || "";
    if (currentQuery !== inputValue && currentQuery !== debouncedSearchQuery) {
      setInputValue(currentQuery);
    }
  }, [searchParams.get("query")]);

  useEffect(() => {
    if (debouncedSearchQuery.length >= 3) {
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
  }, [debouncedSearchQuery]);

  const { data: searchAnimeResults, isLoading: isSearchAnimeLoading } = useSearchAnime({
    query: debouncedSearchQuery,
    limit: 5,
    enabled: debouncedSearchQuery.length >= 3,
  });

  const { data: searchMangaResults, isLoading: isSearchMangaLoading } = useSearchManga({
    query: debouncedSearchQuery,
    limit: 5,
    enabled: debouncedSearchQuery.length >= 3,
  });

  const handleSearch = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      setIsMenuOpen(false);
      setShowDropdown(false);

      const newSearchParams = new URLSearchParams(searchParams);
      if (!inputValue) {
        newSearchParams.delete("query");
      } else {
        newSearchParams.set("query", inputValue);
      }

      if (inputValue && !location.pathname.startsWith("/search")) {
        navigate(`/search?${newSearchParams.toString()}`);
      } else {
        setSearchParams(newSearchParams);
      }
    }
  };

  const handleResultClick = (type: 'anime' | 'manga', id: number) => {
    setShowDropdown(false);
    setIsMenuOpen(false);
    navigate(`/${type}/${id}`);
  };

  const renderDropdownContent = () => {
    if (isSearchAnimeLoading || isSearchMangaLoading) {
      return <div className="p-4 text-center text-sm text-muted-foreground">Loading...</div>;
    }

    const animes = searchAnimeResults?.data || [];
    const mangas = searchMangaResults?.data || [];

    if (animes.length === 0 && mangas.length === 0) {
      return <div className="p-4 text-center text-sm text-muted-foreground">No results found</div>;
    }

    return (
      <div className="flex flex-col max-h-[400px] overflow-y-auto">
        {animes.length > 0 && (
          <div className="py-2">
            <div className="px-3 py-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Anime</div>
            {animes.map((anime) => (
              <div
                key={`anime-${anime.mal_id}`}
                className="flex items-center gap-3 p-3 hover:bg-accent hover:text-accent-foreground cursor-pointer transition-colors"
                onClick={() => handleResultClick('anime', anime.mal_id)}
              >
                <img src={anime.images.webp.image_url} alt={anime.title} className="w-10 h-10 object-cover rounded" />
                <span className="text-sm font-medium truncate">{anime.title}</span>
              </div>
            ))}
          </div>
        )}
        {mangas.length > 0 && (
          <div className="py-2 border-t border-border">
            <div className="px-3 py-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Manga</div>
            {mangas.map((manga) => (
              <div
                key={`manga-${manga.mal_id}`}
                className="flex items-center gap-3 p-3 hover:bg-accent hover:text-accent-foreground cursor-pointer transition-colors"
                onClick={() => handleResultClick('manga', manga.mal_id)}
              >
                <img src={manga.images.webp.image_url} alt={manga.title} className="w-10 h-10 object-cover rounded" />
                <span className="text-sm font-medium truncate">{manga.title}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-lg">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center me-4 cursor-pointer" onClick={() => navigate('/')}>
            <div className="text-lg lg:text-2xl font-title bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              OtakuVerse
            </div>
          </div>
          {/* Desktop Nav Links */}
          <div className="hidden md:flex">
            <NavMenuCustom />
          </div>

          {/* Desktop Search */}
          <div className="hidden md:flex flex-1 max-w-xs mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search anime or manga..."
                value={inputValue}
                onChange={(e) => {
                  setInputValue(e.target.value);
                  if (e.target.value.length < 3) setShowDropdown(false);
                }}
                onKeyDown={handleSearch}
                onFocus={() => {
                  if (debouncedSearchQuery.length >= 3) setShowDropdown(true);
                }}
                onBlur={() => {
                  // Small delay to allow clicking on results
                  setTimeout(() => setShowDropdown(false), 200);
                }}
                className="pl-10 bg-muted border-border focus:ring-2 focus:ring-primary text-primary-foreground"
              />

              {showDropdown && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-card border rounded-md shadow-lg z-50 overflow-hidden">
                  {renderDropdownContent()}
                </div>
              )}
            </div>
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
            inputValue={inputValue}
            setInputValue={setInputValue}
            handleSearch={handleSearch}
            onClose={() => setIsMenuOpen(false)}
            renderDropdownContent={renderDropdownContent}
            showDropdown={showDropdown}
            setShowDropdown={setShowDropdown}
            debouncedSearchQuery={debouncedSearchQuery}
          />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
