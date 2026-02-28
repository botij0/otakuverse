import Hero from '@/components/custom/Hero'
import animeBanner from "@/assets/anime_banner.webp";
import { useState } from 'react';
import { Plus, Search } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export const AnimeBuildYourTop = () => {
  const [activeSearchPosition, setActiveSearchPosition] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [listSize, setListSize] = useState<number>(10);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [topList] = useState<Record<number, any>>({});

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(`Searching for ${searchQuery} for position ${activeSearchPosition}`);
    // Future API call to search anime here
  }

  const listOptions = [5, 10, 15, 20];

  return (
    <>
      <Hero
        title="Build Your Top Anime"
        description="Build your custom top anime list"
        img={animeBanner}
      />
      <main className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between mb-8 pb-6 border-b border-border gap-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Your Top {listSize}</h2>
            <p className="text-muted-foreground">Select the size of your list and start ranking your favorite anime.</p>
          </div>

          <div className="flex items-center gap-3 bg-secondary/30 p-2 rounded-lg border border-border/50">
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
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {Array.from({ length: listSize }, (_, i) => i + 1).map((position) => (
            <Card
              key={position}
              className={`relative overflow-hidden cursor-pointer transition-all hover:scale-105 hover:shadow-lg dark:hover:shadow-primary/20 ${activeSearchPosition === position ? 'ring-2 ring-primary scale-105' : ''}`}
              onClick={() => {
                if (activeSearchPosition !== position) {
                  setActiveSearchPosition(position);
                  setSearchQuery('');
                }
              }}
            >
              <div className="absolute top-3 left-3 flex h-8 w-8 items-center justify-center rounded-full bg-primary font-bold text-primary-foreground shadow-sm z-10">
                {position}
              </div>

              <CardContent className="flex flex-col items-center justify-center p-4 min-h-[220px] sm:min-h-[280px]">
                {activeSearchPosition === position ? (
                  <div className="w-full relative mt-4 space-y-4 z-20 animate-in fade-in zoom-in duration-200" onClick={(e) => e.stopPropagation()}>
                    <p className="text-sm font-semibold text-center mb-1 text-primary">Search for #{position}</p>
                    <form onSubmit={handleSearch} className="flex flex-col gap-3 relative">
                      <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          autoFocus
                          placeholder="Anime title..."
                          className="pl-9 bg-background/80 backdrop-blur-sm"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button type="submit" size="sm" className="w-full">Search</Button>
                        <Button type="button" variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); setActiveSearchPosition(null); }}>Cancel</Button>
                      </div>
                    </form>
                  </div>
                ) : topList[position] ? (
                  <div className="flex flex-col items-center">
                    <span className="font-semibold text-center mt-4">{topList[position].title}</span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center text-muted-foreground opacity-60 hover:opacity-100 hover:text-primary transition-all duration-300">
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
