import { Award, Star, User } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { Demographic, MediaType } from "@/interfaces/media.list.response";
import { useNavigate, useSearchParams } from "react-router";

interface MediaCardProps {
  id: number;
  title: string;
  imageUrl: string;
  score?: number;
  episodes?: number | null;
  type: MediaType;
  genres: Demographic[];
  members?: number;
  rank?: number;
  nicknames?: string[];
  isCharacter?: boolean;
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
}: MediaCardProps) => {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;

  const characterRank = !rank ? undefined : rank + (page - 1) * 25;

  let epsLabel = "eps";
  let statusLabel = "Airing";
  if (mangaTypes.includes(type)) {
    epsLabel = "vols";
    statusLabel = "Publishing";
  }

  const handleClick = () => {
    if (isCharacter) {
      navigate(`/characters/${id}`);
    } else if (epsLabel === "eps") {
      navigate(`/anime/${id}`);
    } else {
      navigate(`/manga/${id}`);
    }
  };

  return (
    <Card
      className="group overflow-hidden border-border bg-card hover:border-primary transition-all duration-300 hover:shadow-primary cursor-pointer"
      onClick={handleClick}
    >
      <div className="relative aspect-[3/4] overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {score && (
          <div className="absolute top-2 right-2 flex items-center gap-1 bg-background/80 backdrop-blur px-2 py-1 rounded-md">
            <Star className="h-3 w-3 fill-accent text-accent" />
            <span className="text-sm font-semibold">{score}</span>
          </div>
        )}

        {members && (
          <div className="absolute bottom-2 right-2 flex items-center gap-1 bg-background/80 backdrop-blur px-2 py-1 rounded-md">
            <User className="h-3 w-3 fill-accent text-accent" />
            <span className="text-sm font-semibold">
              {members.toLocaleString("en-US")}
            </span>
          </div>
        )}

        {rank && (
          <div className="absolute top-2 left-2 flex items-center gap-1 bg-background/80 backdrop-blur px-2 py-1 rounded-md">
            <Award className="h-4 w-4 fill-accent text-accent" />
            <span className="text-sm font-semibold">
              {isCharacter
                ? characterRank?.toLocaleString("en-US")
                : rank.toLocaleString("en-US")}
            </span>
          </div>
        )}
      </div>

      <CardContent className="p-4">
        <h3 className="font-semibold text-foreground line-clamp-2 mb-2 group-hover:text-primary transition-colors">
          {title}
        </h3>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          {type && <span className="capitalize">{type}</span>}
          {type && episodes !== undefined && <span>•</span>}
          {episodes !== undefined &&
            (episodes !== null ? (
              <span>
                {episodes} {epsLabel}
              </span>
            ) : (
              <span>{statusLabel}</span>
            ))}
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground mt-4">
          {isCharacter ? (
            <>
              {nicknames[0] && <Badge>{nicknames[0]}</Badge>}
              {nicknames[1] && <Badge variant={"secondary"}>{nicknames[1]}</Badge>}
            </>
          ) : (
            <>
              {genres[0] && <Badge>{genres[0].name}</Badge>}
              {genres[1] && <Badge variant={"secondary"}>{genres[1].name}</Badge>}
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default MediaCard;
