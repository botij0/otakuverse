import { useSearchManga } from '@/hooks/useSearchManga';
import type { Anime } from '@/interfaces/anime';
import type { Manga } from '@/interfaces/manga';

type Props = {
  position: number;
  debouncedSearchQuery: string;
  handleSelectMedia: (position: number, media: Anime | Manga) => void;
}

export const TopCardSearchListManga = ({ position, debouncedSearchQuery, handleSelectMedia }: Props) => {
  const { data: searchResults, isLoading: isSearchLoading } = useSearchManga({
    query: debouncedSearchQuery,
    limit: 10,
    enabled: debouncedSearchQuery.length >= 3,
  });

  return (
    <div className="absolute top-full left-0 right-0 mt-1 bg-card border rounded-md shadow-lg z-50 max-h-[200px] overflow-y-auto min-w-[200px]">
      {isSearchLoading ? (
        <div className="p-3 text-center text-sm text-muted-foreground">
          Loading...
        </div>
      ) : searchResults?.data?.length ? (
        <div className="flex flex-col">
          {searchResults.data.map((manga) => (
            <div
              key={manga.mal_id}
              className="flex items-center gap-2 p-2 hover:bg-accent hover:text-accent-foreground cursor-pointer transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                handleSelectMedia(position, manga);
              }}
            >
              <img
                src={manga.images.webp.image_url}
                alt={manga.title}
                className="w-8 h-8 object-cover rounded"
              />
              <span className="text-sm truncate">
                {manga.title}
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
  )
}
