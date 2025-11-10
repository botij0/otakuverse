import { Link } from "react-router";
import { ArrowRight, Loader2 } from "lucide-react";

import MediaCard from "@/components/custom/MediaCard";
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

const MediaGrid = ({ media, loading, title, seeMore, seeMoreLink }: MediaGridProps) => {
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
        <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent font-title">
          {title}
        </h2>
        <p className="text-muted-foreground text-lg">
          No anime/manga found. Try a different search!
        </p>
      </div>
    );
  }

  return (
    <section className="py-12">
      <div className="flex justify-between items-center">
        {title && (
          <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent font-title">
            {title}
          </h2>
        )}
        {seeMore && seeMoreLink && (
          <Link
            to={seeMoreLink}
            className="group flex text-accent text-lg gap-3 items-center hover:scale-105 transition-all duration-300 ease-in-out"
          >
            See More <ArrowRight />
          </Link>
        )}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-10 animate-fade-in">
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
