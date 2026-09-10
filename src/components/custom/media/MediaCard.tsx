import { Award, Star, User } from "lucide-react";
import type { KeyboardEvent } from "react";

import { Badge } from "@/components/ui/badge";
import type { Demographic, MediaType } from "@/interfaces/media";
import { useNavigate, useSearchParams } from "react-router";

interface MediaCardProps {
  id: number;
  title: string;
  imageUrl: string;
  score?: number;
  episodes?: number | null;
  type?: MediaType;
  genres: Demographic[];
  members?: number;
  rank?: number;
  nicknames?: string[];
  isCharacter?: boolean;
  kanjiName?: string;
}

const mangaTypes = [
  "Light Novel",
  "Manga",
  "Manhwa",
  "Novel",
  "One-Shot",
  "Manhua",
  "Doujinshi",
];

const MediaCard = ({
  id,
  title,
  imageUrl,
  score,
  episodes,
  type,
  genres,
  members,
  rank,
  nicknames,
  isCharacter,
  kanjiName,
}: MediaCardProps) => {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;

  const characterRank = !rank ? undefined : rank + (page - 1) * 25;

  let epsLabel = "eps";
  let statusLabel = "Airing";
  if (type && mangaTypes.includes(type)) {
    epsLabel = "vols";
    statusLabel = "Publishing";
  }

  const handleClick = () => {
    if (isCharacter) {
      navigate(`/character/${id}`);
    } else if (epsLabel === "eps") {
      navigate(`/anime/${id}`);
    } else {
      navigate(`/manga/${id}`);
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleClick();
    }
  };

  return (
    <article
      role="link"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className="group cursor-pointer rounded-md outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      <div className="relative aspect-[3/4] overflow-hidden rounded-md bg-muted">
        <img
          src={imageUrl}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04] group-active:scale-[0.99]"
        />

        {score && (
          <div className="absolute top-2 right-2 flex items-center gap-1 bg-background/85 backdrop-blur-sm px-2 py-1 rounded-md text-foreground">
            <Star className="h-3 w-3 fill-primary text-primary" />
            <span className="text-sm font-semibold tabular-nums">{score}</span>
          </div>
        )}

        {members && (
          <div className="absolute bottom-2 right-2 flex items-center gap-1 bg-background/85 backdrop-blur-sm px-2 py-1 rounded-md text-foreground">
            <User className="h-3 w-3 text-primary" />
            <span className="text-sm font-semibold tabular-nums">
              {members.toLocaleString("en-US")}
            </span>
          </div>
        )}

        {rank && (
          <div className="absolute top-2 left-2 flex items-center gap-1 bg-primary text-primary-foreground px-2 py-1 rounded-md">
            <Award className="h-4 w-4" />
            <span className="text-sm font-semibold tabular-nums">
              {isCharacter
                ? characterRank?.toLocaleString("en-US")
                : rank.toLocaleString("en-US")}
            </span>
          </div>
        )}
      </div>

      <div className="pt-3 flex flex-col min-h-[116px]">
        <h3 className="font-semibold text-foreground line-clamp-2 mb-1.5 group-hover:text-primary transition-colors">
          {title}
        </h3>
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
          {type && <span className="capitalize">{type}</span>}
          {type && episodes !== undefined && <span aria-hidden="true">-</span>}
          {episodes !== undefined &&
            (episodes !== null ? (
              <span className="tabular-nums">
                {episodes} {epsLabel}
              </span>
            ) : (
              <span>{statusLabel}</span>
            ))}
          {kanjiName && <span>{kanjiName}</span>}
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground mt-auto">
          {isCharacter ? (
            <>
              {nicknames && nicknames[0] && <Badge>{nicknames[0]}</Badge>}
              {nicknames && nicknames[1] && (
                <Badge variant={"secondary"}>{nicknames[1]}</Badge>
              )}
            </>
          ) : (
            <>
              {genres[0] && <Badge>{genres[0].name}</Badge>}
              {genres[1] && <Badge variant={"secondary"}>{genres[1].name}</Badge>}
            </>
          )}
        </div>
      </div>
    </article>
  );
};

export default MediaCard;
