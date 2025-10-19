import AnimeCard from "@/components/custom/AnimeCard";
import type { Anime } from "@/interfaces/top.anime.response";
import type { Manga } from "@/interfaces/top.manga.response";
import { Loader2 } from "lucide-react";

interface AnimeGridProps {
  animes?: Anime[];
  mangas?: Manga[];
  loading?: boolean;
  title?: string;
}

const AnimeGrid = ({ animes, mangas, loading, title }: AnimeGridProps) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!animes || animes.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-muted-foreground text-lg">
          No anime found. Try a different search!
        </p>
      </div>
    );
  }

  return (
    <section className="py-12">
      {title && (
        <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent font-title">
          {title}
        </h2>
      )}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 animate-fade-in">
        {animes &&
          animes.map((anime) => (
            <AnimeCard
              key={anime.mal_id}
              title={anime.title}
              imageUrl={anime.images.webp.large_image_url}
              score={anime.score}
              episodes={anime.episodes}
              type={anime.type}
              year={anime.year}
            />
          ))}

        {mangas &&
          mangas.map((manga) => (
            <AnimeCard
              key={manga.mal_id}
              title={manga.title}
              imageUrl={manga.images.webp.large_image_url}
              score={manga.score}
              episodes={manga.chapters}
              type={manga.type}
              year={2000}
            />
          ))}
      </div>
    </section>
  );
};

export default AnimeGrid;
