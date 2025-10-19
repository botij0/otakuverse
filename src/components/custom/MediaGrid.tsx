import MediaCard from "@/components/custom/MediaCard";
import type { Anime } from "@/interfaces/top.anime.response";
import type { Manga } from "@/interfaces/top.manga.response";
import { Loader2 } from "lucide-react";

interface MediaGridProps {
  media?: Anime[] | Manga[];
  loading?: boolean;
  title?: string;
}

const MediaGrid = ({ media, loading, title }: MediaGridProps) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!media || media.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-muted-foreground text-lg">
          No anime/manga found. Try a different search!
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
        {media.map((mediaItem: Anime | Manga) => (
          <MediaCard
            key={mediaItem.mal_id}
            title={mediaItem.title}
            imageUrl={mediaItem.images.webp.large_image_url}
            score={mediaItem.score}
            episodes={"episodes" in mediaItem ? mediaItem.episodes : mediaItem.volumes}
            type={mediaItem.type}
          />
        ))}
      </div>
    </section>
  );
};

export default MediaGrid;
