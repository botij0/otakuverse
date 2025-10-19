import AnimeCard from "@/components/custom/AnimeCard";
import type { Anime } from "@/interfaces/top.anime.response";
import { Loader2 } from "lucide-react";

interface AnimeGridProps {
  animes: Anime[];
  loading?: boolean;
  title?: string;
}

const AnimeGrid = ({ animes, loading, title }: AnimeGridProps) => {
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
        <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          {title}
        </h2>
      )}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 animate-fade-in">
        {animes.map((anime) => (
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
      </div>
    </section>
  );
};

export default AnimeGrid;
