import Hero from '@/components/custom/Hero'
import animeBanner from "@/assets/anime_banner.webp";
import { useState } from 'react';
import { Plus, Search } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useSearchAnime } from '@/hooks/useSearchAnime';
import { useDebounce } from '@/hooks/useDebounce';
import type { Anime } from '@/interfaces/anime';

const listOptions = [5, 10, 15, 20];

export const AnimeBuildYourTop = () => {
  const [activeSearchPosition, setActiveSearchPosition] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [listSize, setListSize] = useState<number>(10);
  const [topList, setTopList] = useState<Record<number, Anime>>({});

  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  const { data: searchResults, isLoading: isSearchLoading } = useSearchAnime({
    query: debouncedSearchQuery,
    limit: 10,
    enabled: debouncedSearchQuery.length >= 3,
  });

  const handleSelectAnime = (position: number, anime: Anime) => {
    setTopList(prev => ({ ...prev, [position]: anime }));
    setActiveSearchPosition(null);
    setSearchQuery('');
  };

  return (
    <>
      <Hero
        title="Build Your Top Anime"
        description="Build your custom top anime list"
        img={animeBanner}
      />
      <main className="container mx-auto px-4 py-5">
        <div className="flex flex-col md:flex-row items-center justify-between mb-8 pb-2 gap-4">
          <div className="flex items-center gap-3 p-2 rounded-lg border border-border/50 bg-card">
            <span className="text-sm font-medium px-2">Size:</span>
            <div className="flex gap-2">
              {listOptions.map((size) => (
                <Button
                  key={size}
                  variant={listSize === size ? "default" : "outline"}
                  size="sm"
                  onClick={() => setListSize(size)}
                  className={`min-w-10 transition-all ${listSize === size ? 'shadow-md scale-105' : 'hover:bg-background'}`}
                >
                  {size}
                </Button>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-3 p-2 rounded-lg border border-border/50 bg-card">
            <span className="text-sm font-medium px-2">Share</span>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {Array.from({ length: listSize }, (_, i) => i + 1).map((position) => (
            <Card
              key={position}
              className={`group relative overflow-hidden cursor-pointer transition-all
                hover:scale-105 hover:shadow-lg dark:hover:shadow-primary/20
                ${activeSearchPosition === position ? 'ring-2 ring-accent scale-105 overflow-visible z-20' : ''}`}
              onClick={() => {
                if (activeSearchPosition !== position) {
                  setActiveSearchPosition(position);
                  setSearchQuery('');
                }
              }}
            >
              <div className={`absolute top-3 left-3 flex h-8 w-8 items-center justify-center rounded-full font-bold text-primary-foreground
                shadow-sm z-10 group-hover:bg-accent group-hover:text-accent-foreground transition-all duration-300
                ${activeSearchPosition === position ? 'bg-accent text-accent-foreground' : 'bg-primary'}`}
              >
                {position}
              </div>

              <CardContent className="flex flex-col items-center justify-center p-4 min-h-[220px] sm:min-h-[280px]">
                {activeSearchPosition === position ? (
                  <div className="w-full relative mt-4 space-y-4 z-20 animate-in fade-in zoom-in duration-200" onClick={(e) => e.stopPropagation()}>
                    <p className="text-sm font-semibold text-center mb-1 text-accent">Search for #{position}</p>
                    <div className="flex flex-col gap-3 relative">
                      <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          autoFocus
                          placeholder="Anime title..."
                          className="pl-9 bg-background/80 backdrop-blur-sm focus-visible:border-accent focus-visible:ring-accent/50 focus-visible:ring-[3px]"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                      </div>

                      {debouncedSearchQuery.length >= 3 && (
                        <div className="absolute top-full left-0 right-0 mt-1 bg-card border rounded-md shadow-lg z-50 max-h-[200px] overflow-y-auto min-w-[200px]">
                          {isSearchLoading ? (
                            <div className="p-3 text-center text-sm text-muted-foreground">Loading...</div>
                          ) : searchResults?.data?.length ? (
                            <div className="flex flex-col">
                              {searchResults.data.map((anime) => (
                                <div
                                  key={anime.mal_id}
                                  className="flex items-center gap-2 p-2 hover:bg-accent hover:text-accent-foreground cursor-pointer transition-colors"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleSelectAnime(position, anime);
                                  }}
                                >
                                  <img src={anime.images.webp.image_url} alt={anime.title} className="w-8 h-8 object-cover rounded" />
                                  <span className="text-sm truncate">{anime.title}</span>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="p-3 text-center text-sm text-muted-foreground">No results found</div>
                          )}
                        </div>
                      )}

                      <div className="flex gap-2 flex-col mt-2">
                        <Button type="button" variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); setActiveSearchPosition(null); }}>Cancel</Button>
                      </div>
                    </div>
                  </div>
                ) : topList[position] ? (
                  <div className="absolute inset-0 z-0">
                    <img src={topList[position].images.webp.image_url} alt={topList[position].title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute bottom-0 left-0 right-0 bg-black/80 backdrop-blur-sm p-3 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <span className="text-white text-xs sm:text-sm font-semibold text-center line-clamp-2 block">{topList[position].title}</span>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center text-muted-foreground opacity-60 group-hover:opacity-100 group-hover:text-accent transition-all duration-300">
                    <Plus className="h-10 w-10 mb-3" />
                    <span className="font-medium">Add Anime</span>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </>
  )
}

