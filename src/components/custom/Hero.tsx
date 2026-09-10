import { Search } from "lucide-react";
import { useSearchParams } from "react-router";
import { useEffect, useRef, useState } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import heroAtmosphere from "@/assets/hero-atmosphere.jpg";
import { GenresToggleGroup } from "./media/GenresToggleGroup";
import { useDebounce } from "@/hooks/useDebounce";

interface HeroPoster {
  src: string;
  alt: string;
}

interface HeroProps {
  title?: string;
  subtitle?: string;
  description?: string;
  showSearchBar?: boolean;
  hideGenres?: boolean;
  img?: string;
  posters?: HeroPoster[];
}

const posterOffsets = [
  "left-0 top-8 -rotate-6 z-[1]",
  "left-[18%] top-0 -rotate-2 z-[2]",
  "left-[36%] top-4 rotate-1 z-[5]",
  "left-[54%] top-0 rotate-3 z-[3]",
  "left-[72%] top-10 -rotate-1 z-[4]",
];

const Hero = ({
  showSearchBar = false,
  hideGenres = false,
  img = heroAtmosphere,
  title,
  subtitle,
  description,
  posters,
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

  const hasPosters = Boolean(posters && posters.length > 0);

  return (
    <section
      className={`relative flex items-center overflow-hidden ${
        showSearchBar
          ? "min-h-[220px]"
          : hasPosters
            ? "min-h-[70dvh]"
            : "min-h-[240px]"
      }`}
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${img})` }}
        data-testid="backgroundImg"
      >
        <div className="absolute inset-0 bg-linear-to-r from-background via-background/85 to-background/40" />
        <div className="absolute inset-0 bg-linear-to-b from-background/20 via-transparent to-background" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-12 md:py-16">
        {!showSearchBar && (
          <div
            className={`grid items-center gap-10 ${
              hasPosters ? "lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]" : ""
            }`}
          >
            <div className="max-w-2xl">
              {title && (
                <h1 className="font-title text-4xl md:text-5xl tracking-tight leading-[1.15] mb-5 text-balance">
                  <span className="text-foreground">{title}</span>
                  {subtitle && (
                    <>
                      <br />
                      <span className="text-primary pb-1">{subtitle}</span>
                    </>
                  )}
                </h1>
              )}

              {description && (
                <p className="text-base md:text-lg text-muted-foreground max-w-[42ch] leading-relaxed">
                  {description}
                </p>
              )}
            </div>

            {hasPosters && (
              <div className="relative hidden md:block h-[380px] lg:h-[440px]">
                {posters!.slice(0, 5).map((poster, index) => (
                  <img
                    key={`${poster.src}-${index}`}
                    src={poster.src}
                    alt={poster.alt}
                    className={`absolute h-[78%] w-[28%] object-cover rounded-md border border-border/60 shadow-[var(--shadow-card)] ${posterOffsets[index]}`}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {hasPosters && !showSearchBar && (
          <div className="md:hidden mt-8 flex gap-3 overflow-x-auto pb-2">
            {posters!.slice(0, 5).map((poster, index) => (
              <img
                key={`${poster.src}-m-${index}`}
                src={poster.src}
                alt={poster.alt}
                className="h-36 w-24 shrink-0 object-cover rounded-md border border-border/60"
              />
            ))}
          </div>
        )}

        {showSearchBar && (
          <>
            <div className="max-w-2xl">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search for anime or manga..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") handleSearch();
                    }}
                    className="h-14 pl-12 bg-card/90 border-border focus-visible:ring-2 focus-visible:ring-primary text-foreground font-semibold"
                  />
                </div>
                <Button
                  variant="default"
                  size="lg"
                  onClick={handleSearch}
                  className="h-14 px-8 text-lg font-semibold"
                >
                  Search
                </Button>
              </div>
            </div>
            {!hideGenres && (
              <div className="mt-4">
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
