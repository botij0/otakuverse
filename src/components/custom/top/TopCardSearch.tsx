import { Search } from 'lucide-react';
import { use, type Dispatch, type SetStateAction } from 'react';

import type { Anime } from '@/interfaces/anime';
import type { Manga } from '@/interfaces/manga';
import type { MediaTypeSimple } from '@/interfaces/media';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useDebounce } from '@/hooks/useDebounce';
import { BuildYourTopContext } from '@/context/BuildYourTopContext';
import { TopCardSearchListAnime } from './TopCardSearchListAnime';
import { TopCardSearchListManga } from './TopCardSearchListManga';

type Props = {
  position: number;
  searchQuery: string;
  setActiveSearchPosition: Dispatch<SetStateAction<number | null>>;
  setSearchQuery: Dispatch<SetStateAction<string>>;
  mediaType: MediaTypeSimple;
}

export const TopCardSearch = (
  {
    position,
    searchQuery,
    setActiveSearchPosition,
    setSearchQuery,
    mediaType
  }: Props) => {

  const {
    addAnimeToTopList,
    addMangaToTopList,
    removeAnimeFromTopList,
    removeMangaFromTopList,
  } = use(BuildYourTopContext);

  const handleSelectMedia = (position: number, media: Anime | Manga) => {
    if (mediaType === "anime") addAnimeToTopList(position, media as Anime);
    else addMangaToTopList(position, media as Manga);

    setActiveSearchPosition(null);
    setSearchQuery('');
  };

  const handleRemoveMedia = (position: number) => {
    if (mediaType === 'anime') removeAnimeFromTopList(position);
    else removeMangaFromTopList(position);

    setActiveSearchPosition(null);
    setSearchQuery('');
  };

  const debouncedSearchQuery = useDebounce(searchQuery, 500);

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
          mediaType === 'anime' ? (
            <TopCardSearchListAnime
              debouncedSearchQuery={debouncedSearchQuery}
              handleSelectMedia={handleSelectMedia}
              position={position}
            />
          ) : (
            <TopCardSearchListManga
              debouncedSearchQuery={debouncedSearchQuery}
              handleSelectMedia={handleSelectMedia}
              position={position}
            />
          )
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
          <Button
            type="button"
            variant="destructive"
            size="sm"
            onClick={(e) => { e.stopPropagation(); handleRemoveMedia(position); }}
          >
            Remove
          </Button>
        </div>
      </div>
    </div>
  )
}
