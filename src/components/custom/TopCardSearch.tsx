import { Search } from 'lucide-react';
import type { Dispatch, SetStateAction } from 'react';

import { Input } from '../ui/input';
import { Button } from '../ui/button';
import type { Anime } from '@/interfaces/anime';
import { useDebounce } from '@/hooks/useDebounce';
import { useSearchAnime } from '@/hooks/useSearchAnime';

type Props = {
  position: number;
  searchQuery: string;
  setTopList: Dispatch<SetStateAction<Record<number, Anime>>>;
  setActiveSearchPosition: Dispatch<SetStateAction<number | null>>;
  setSearchQuery: Dispatch<SetStateAction<string>>;
}

export const TopCardSearch = (
  {
    position,
    searchQuery,
    setTopList,
    setActiveSearchPosition,
    setSearchQuery
  }: Props) => {

  const handleSelectAnime = (position: number, anime: Anime) => {
    setTopList(prev => ({ ...prev, [position]: anime }));
    setActiveSearchPosition(null);
    setSearchQuery('');
  };

  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  const { data: searchResults, isLoading: isSearchLoading } = useSearchAnime({
    query: debouncedSearchQuery,
    limit: 10,
    enabled: debouncedSearchQuery.length >= 3,
  });

  return (
    <div
      className="w-full relative mt-4 space-y-4 z-20 animate-in fade-in zoom-in duration-200"
      onClick={(e) => e.stopPropagation()}
    >
      <p className="text-sm font-semibold text-center mb-1 text-accent">
        Search for #{position}
      </p>
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
              <div className="p-3 text-center text-sm text-muted-foreground">
                Loading...
              </div>
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
                    <img
                      src={anime.images.webp.image_url}
                      alt={anime.title}
                      className="w-8 h-8 object-cover rounded"
                    />
                    <span className="text-sm truncate">
                      {anime.title}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-3 text-center text-sm text-muted-foreground">
                No results found
              </div>
            )}
          </div>
        )}

        <div className="flex gap-2 flex-col mt-2">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={(e) => { e.stopPropagation(); setActiveSearchPosition(null); }}
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  )
}
