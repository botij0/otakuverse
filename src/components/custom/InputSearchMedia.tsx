import { Search } from "lucide-react";
import { InputSearchMediaList } from "./InputSearchMediaList";
import { Input } from "../ui/input";
import { useEffect, useState, type Dispatch, type KeyboardEvent, type SetStateAction } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { useDebounce } from "@/hooks/useDebounce";
import { useSearchAnime } from "@/hooks/useSearchAnime";
import { useSearchManga } from "@/hooks/useSearchManga";

type Props = {
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>;
  enableHandleSearch?: boolean
}

export const InputSearchMedia = ({ setIsMenuOpen, enableHandleSearch = true }: Props) => {
  const [inputValue, setInputValue] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const navigate = useNavigate();
  const debouncedSearchQuery = useDebounce(inputValue, 500);

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

  const animes = searchAnimeResults?.data || [];
  const mangas = searchMangaResults?.data || [];

  useEffect(() => {
    if (debouncedSearchQuery.length >= 3) {
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
  }, [debouncedSearchQuery]);


  const handleSearch = (event: KeyboardEvent<HTMLInputElement>) => {
    if (!enableHandleSearch || event.key !== "Enter") return;

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
  };

  const handleResultClick = (type: 'anime' | 'manga', id: number) => {
    setShowDropdown(false);
    setIsMenuOpen(false);
    navigate(`/${type}/${id}`);
  };

  return (
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
          <InputSearchMediaList
            animes={animes}
            mangas={mangas}
            isSearchAnimeLoading={isSearchAnimeLoading}
            isSearchMangaLoading={isSearchMangaLoading}
            handleResultClick={handleResultClick}
          />
        </div>
      )}
    </div>
  )
}
