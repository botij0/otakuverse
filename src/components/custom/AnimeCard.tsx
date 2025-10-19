import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface AnimeCardProps {
  title: string;
  imageUrl: string;
  score?: number;
  episodes: number | null;
  type?: string;
  year?: number | null;
}

const AnimeCard = ({ title, imageUrl, score, episodes, type, year }: AnimeCardProps) => {
  return (
    <Card className="group overflow-hidden border-border bg-card hover:border-primary transition-all duration-300 hover:shadow-primary cursor-pointer">
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
            <span className="text-sm font-semibold">{score.toFixed(1)}</span>
          </div>
        )}
      </div>

      <CardContent className="p-4">
        <h3 className="font-semibold text-foreground line-clamp-2 mb-2 group-hover:text-primary transition-colors">
          {title}
        </h3>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          {type && <span className="capitalize">{type}</span>}
          {episodes && (
            <>
              <span>•</span>
              <span>{episodes} eps</span>
            </>
          )}
          {year && (
            <>
              <span>•</span>
              <span>{year}</span>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AnimeCard;
