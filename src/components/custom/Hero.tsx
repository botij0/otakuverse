import heroBanner from "@/assets/hero-banner.jpg";
import { Search } from "lucide-react";
import { Input } from "../ui/input";
import { useState } from "react";
import { Button } from "../ui/button";

interface HeroProps {
  showSearchBar?: boolean;
}

const Hero = ({ showSearchBar = false }: HeroProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
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
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto animate-scale-in">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search for anime or manga..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-14 pl-12 text-lg bg-card border-border focus:ring-2 focus:ring-primary shadow-lg text-primary-foreground"
                />
              </div>
              <Button
                type="submit"
                variant="default"
                size="lg"
                className="h-14 px-8 bg-gradient-to-br from-primary/90 to-fuchsia-900/90
              transition-opacity text-lg font-semibold"
              >
                Search
              </Button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
};

export default Hero;
