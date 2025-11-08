import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router";

import { Card, CardContent } from "@/components/ui/card";
import type { RecomendationEntry } from "@/interfaces/recomendations.response";

interface RecommendationCardProps {
  anime1: RecomendationEntry;
  anime2: RecomendationEntry;
  content: string;
}

export const RecommendationCard = ({
  anime1,
  anime2,
  content,
}: RecommendationCardProps) => {
  const navigate = useNavigate();

  return (
    <Card className="group overflow-hidden border-border bg-card hover:border-primary transition-all duration-300 hover:shadow-glow">
      <CardContent className="p-0">
        <div className="grid grid-cols-2 gap-0">
          <div
            onClick={() => navigate(`/anime/${anime1.mal_id}`)}
            className="relative aspect-[3/4] overflow-hidden cursor-pointer hover:opacity-80 transition-opacity"
          >
            <img
              src={anime1.images.jpg.large_image_url}
              alt={anime1.title}
              className="h-full w-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/90 to-transparent p-3">
              <h3 className="font-semibold text-sm line-clamp-2">{anime1.title}</h3>
            </div>
          </div>

          <div
            onClick={() => navigate(`/anime/${anime2.mal_id}`)}
            className="relative aspect-[3/4] overflow-hidden cursor-pointer hover:opacity-80 transition-opacity"
          >
            <img
              src={anime2.images.jpg.large_image_url}
              alt={anime2.title}
              className="h-full w-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/90 to-transparent p-3">
              <h3 className="font-semibold text-sm line-clamp-2">{anime2.title}</h3>
            </div>
          </div>
        </div>

        <div className="p-4 bg-card/50">
          <p className="text-sm text-muted-foreground line-clamp-3">{content}</p>
        </div>
      </CardContent>
    </Card>
  );
};
