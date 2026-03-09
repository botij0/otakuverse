import { Search } from "lucide-react";
import { useSearchParams } from "react-router";
import { useEffect, useRef, useState } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import heroBanner from "@/assets/hero-banner.jpg";
import { GenresToggleGroup } from "./media/GenresToggleGroup";
import { useDebounce } from "@/hooks/useDebounce";

interface HeroProps {
  title?: string;
  subtitle?: string;
  description?: string;
  showSearchBar?: boolean;
  hideGenres?: boolean;
  img?: string;
}

const Hero = ({
  showSearchBar = false,
  hideGenres = false,
  img = heroBanner,
  title,
  subtitle,
  description,
}: HeroProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get("query") || "";
  const [inputValue, setInputValue] = useState(initialQuery);
  const debouncedSearchQuery = useDebounce(inputValue, 500);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const currentQuery = searchParams.get("query") || "";

    if (debouncedSearchQuery !== currentQuery) {
      const newSearchParams = new URLSearchParams(searchParams);
      if (!debouncedSearchQuery) {
        newSearchParams.delete("query");
      } else {
        newSearchParams.set("query", debouncedSearchQuery);
      }
      setSearchParams(newSearchParams);
    }
  }, [debouncedSearchQuery, searchParams, setSearchParams]);

  const handleSearch = () => {
    const currentQuery = searchParams.get("query") || "";
    if (inputValue !== currentQuery) {
      const newSearchParams = new URLSearchParams(searchParams);
      if (!inputValue) {
        newSearchParams.delete("query");
      } else {
        newSearchParams.set("query", inputValue);
      }
      setSearchParams(newSearchParams);
    }
  };

  return (
    <section className="relative min-h-[200px] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${img})` }}
        data-testid="backgroundImg"
      >
        <div className="absolute inset-0 bg-linear-to-b from-background/60 via-background/80 to-background"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20 text-center">
        {!showSearchBar && (
          <>
            {title && (
              <h1 className="text-3xl md:text-5xl font-bold mb-6 animate-fade-in font-title">
                <span className="bg-linear-to-r from-primary via-primary-glow to-accent bg-clip-text text-transparent">
                  {title}
                </span>
                <br />
                {subtitle && (
                  <span className="text-foreground text-2xl md:text-4xl">{subtitle}</span>
                )}
              </h1>
            )}

            {description && (
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-in text-pretty">
                {description}
              </p>
            )}
          </>
        )}

        {/* Hero Search Bar */}
        {showSearchBar && (
          <>
            <div className="max-w-2xl mx-auto animate-scale-in">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search for anime or manga..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="h-14 pl-12 bg-card border-primary-on focus:ring-2 focus:ring-primary shadow-lg text-primary-foreground font-bold"
                  />
                </div>
                <Button
                  variant="default"
                  size="lg"
                  onClick={handleSearch}
                  className="h-14 px-8 bg-linear-to-br from-primary/90 to-fuchsia-900/90
                  transition-opacity text-lg font-semibold"
                >
                  Search
                </Button>
              </div>
            </div>
            {!hideGenres && (
              <div className="mt-3">
                <GenresToggleGroup />
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default Hero;
