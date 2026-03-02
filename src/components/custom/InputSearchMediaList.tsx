import type { Anime } from "@/interfaces/anime";
import type { Manga } from "@/interfaces/manga";


type Props = {
  animes: Anime[];
  mangas: Manga[];
  isSearchAnimeLoading: boolean;
  isSearchMangaLoading: boolean;
  handleResultClick: (type: 'anime' | 'manga', id: number) => void;
}


export const InputSearchMediaList = ({ animes, mangas, isSearchAnimeLoading, isSearchMangaLoading, handleResultClick }: Props) => {

  if (isSearchAnimeLoading || isSearchMangaLoading) {
    return <div className="p-4 text-center text-sm text-muted-foreground">Loading...</div>;
  }

  if (animes.length === 0 && mangas.length === 0) {
    return <div className="p-4 text-center text-sm text-muted-foreground">No results found</div>;
  }

  return (
    <div className="flex flex-col max-h-[400px] overflow-y-auto">
      {animes.length > 0 && (
        <div className="py-2">
          <div className="px-3 py-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Anime</div>
          {animes.map((anime) => (
            <div
              key={`anime-${anime.mal_id}`}
              className="flex items-center gap-3 p-3 hover:bg-accent hover:text-accent-foreground cursor-pointer transition-colors"
              onClick={() => handleResultClick('anime', anime.mal_id)}
            >
              <img src={anime.images.webp.image_url} alt={anime.title} className="w-10 h-10 object-cover rounded" />
              <span className="text-sm font-medium truncate">{anime.title}</span>
            </div>
          ))}
        </div>
      )}
      {mangas.length > 0 && (
        <div className="py-2 border-t border-border">
          <div className="px-3 py-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Manga</div>
          {mangas.map((manga) => (
            <div
              key={`manga-${manga.mal_id}`}
              className="flex items-center gap-3 p-3 hover:bg-accent hover:text-accent-foreground cursor-pointer transition-colors"
              onClick={() => handleResultClick('manga', manga.mal_id)}
            >
              <img src={manga.images.webp.image_url} alt={manga.title} className="w-10 h-10 object-cover rounded" />
              <span className="text-sm font-medium truncate">{manga.title}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
