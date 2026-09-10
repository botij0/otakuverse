import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import MediaCardSkeleton from "@/components/custom/media/MediaCardSkeleton";

import MediaCard from "@/components/custom/media/MediaCard";
import type { Anime } from "@/interfaces/anime";
import type { Manga } from "@/interfaces/manga";
import type { Character } from "@/interfaces/character";

interface MediaGridProps {
  media?: Anime[] | Manga[] | Character[];
  loading?: boolean;
  title?: string;
  seeMore?: boolean;
  seeMoreLink?: string;
}

const MediaGrid = ({
  media,
  loading,
  title,
  seeMore,
  seeMoreLink,
}: MediaGridProps) => {
  if (loading) {
    return (
      <section className="py-12 md:py-16">
        <div className="flex justify-between items-center mb-8">
          {title && <div className="h-9 w-64 bg-muted animate-pulse rounded-md" />}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-5 gap-y-8">
          {Array.from({ length: 10 }).map((_, i) => (
            <MediaCardSkeleton key={i} />
          ))}
        </div>
      </section>
    );
  }

  if (!media || media.length === 0) {
    return (
      <div className="text-center py-20">
        {title && (
          <h2 className="text-2xl md:text-3xl font-title tracking-tight mb-4 text-foreground">
            {title}
          </h2>
        )}
        <p className="text-muted-foreground text-lg">
          Nothing to show right now.
        </p>
      </div>
    );
  }

  return (
    <section className="py-12 md:py-16">
      <div className="flex justify-between items-end gap-4 mb-8">
        {title && (
          <h2 className="text-2xl md:text-3xl font-title tracking-tight text-foreground">
            {title}
          </h2>
        )}
        {seeMore && seeMoreLink && (
          <Link
            to={seeMoreLink}
            className="group flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors shrink-0"
          >
            See more
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        )}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-5 gap-y-8">
        {media.map((mediaItem: Anime | Manga | Character, index: number) => {
          const isCharacter = "name" in mediaItem;
          return (
            <MediaCard
              key={mediaItem.mal_id}
              id={mediaItem.mal_id}
              title={isCharacter ? mediaItem.name : mediaItem.title}
              imageUrl={
                isCharacter
                  ? mediaItem.images.webp.image_url
                  : mediaItem.images.webp.large_image_url
              }
              score={isCharacter ? undefined : mediaItem.score}
              kanjiName={isCharacter ? mediaItem.name_kanji : undefined}
              episodes={
                isCharacter
                  ? undefined
                  : "episodes" in mediaItem
                    ? mediaItem.episodes
                    : mediaItem.volumes
              }
              type={isCharacter ? undefined : mediaItem.type}
              genres={isCharacter ? [] : mediaItem.genres}
              members={isCharacter ? mediaItem.favorites : mediaItem.members}
              rank={isCharacter ? index + 1 : mediaItem.rank}
              nicknames={isCharacter ? mediaItem.nicknames : undefined}
              isCharacter={isCharacter}
            />
          );
        })}
      </div>
    </section>
  );
};

export default MediaGrid;
