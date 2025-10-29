import { Search } from "lucide-react";
import { useSearchParams } from "react-router";
import { useRef, type KeyboardEvent } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import heroBanner from "@/assets/hero-banner.jpg";

interface HeroProps {
  showSearchBar?: boolean;
}

const Hero = ({ showSearchBar = false }: HeroProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const inputRef = useRef<HTMLInputElement>(null);

  const query = searchParams.get("query") || "";

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== "Enter") return;
    handleSearch();
  };

  const handleSearch = () => {
    const query = inputRef.current?.value;

    const newSearchParams = new URLSearchParams();

    if (!query) {
      newSearchParams.delete("query");
    } else {
      newSearchParams.set("query", inputRef.current!.value);
    }
    setSearchParams(newSearchParams);
  };

  return (
    <section className="relative min-h-[200px] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBanner})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20 text-center">
        {!showSearchBar && (
          <>
            <h1 className="text-3xl md:text-5xl font-bold mb-6 animate-fade-in font-title">
              <span className="bg-gradient-to-r from-primary via-primary-glow to-accent bg-clip-text text-transparent">
                Discover Your Next
              </span>
              <br />
              <span className="text-foreground text-2xl md:text-4xl">
                Otaku Adventure
              </span>
            </h1>

            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-in text-pretty">
              Search through thousands of anime and manga titles. Find your next
              obsession.
            </p>
          </>
        )}

        {/* Hero Search Bar */}
        {showSearchBar && (
          <div className="max-w-2xl mx-auto animate-scale-in">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search for anime or manga..."
                  ref={inputRef}
                  onKeyDown={handleKeyDown}
                  defaultValue={query}
                  className="h-14 pl-12 bg-card border-primary focus:ring-2 focus:ring-primary shadow-lg text-primary-foreground font-bold"
                />
              </div>
              <Button
                variant="default"
                size="lg"
                onClick={handleSearch}
                className="h-14 px-8 bg-gradient-to-br from-primary/90 to-fuchsia-900/90
                  transition-opacity text-lg font-semibold"
              >
                Search
              </Button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Hero;
