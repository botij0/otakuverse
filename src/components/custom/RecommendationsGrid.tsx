import { Skeleton } from "../ui/skeleton";
import { RecommendationCard } from "./RecommendationCard";
import type { Recomendation } from "@/interfaces/recomendations";

interface RecommendationsGridProps {
  isLoading: boolean;
  recommendationList: Recomendation[];
}

export const RecommendationsGrid = ({
  recommendationList,
  isLoading,
}: RecommendationsGridProps) => {
  return (
    <>
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-[400px] rounded-lg" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendationList?.map((rec: Recomendation, index: number) => (
            <RecommendationCard
              key={`${rec.entry[0].mal_id}-${rec.entry[1].mal_id}-${index}`}
              anime1={rec.entry[0]}
              anime2={rec.entry[1]}
              content={rec.content}
            />
          ))}
        </div>
      )}
    </>
  );
};
