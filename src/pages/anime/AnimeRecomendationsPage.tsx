import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router";

import { getAnimeRecommendationsAction } from "@/actions/get-anime-recommendations";
import { RecommendationsGrid } from "@/components/custom/RecommendationsGrid";

export const AnimeRecomendationsPage = () => {
  const [searchParams] = useSearchParams();

  const page = Number(searchParams.get("page")) || 1;

  const { data, isLoading, error } = useQuery({
    queryKey: ["animeRecommendations", { page }],
    queryFn: () =>
      getAnimeRecommendationsAction({
        page,
      }),
    staleTime: 1000 * 60 * 5,
  });

  const animeRecommendationsList = data && !error ? data.data : [];

  return (
    <main className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-primary-glow to-accent bg-clip-text text-transparent">
          Anime Recommendations
        </h1>
        <p className="text-muted-foreground text-lg">
          Discover new anime based on community recommendations
        </p>
      </div>

      <RecommendationsGrid
        isLoading={isLoading}
        recommendationList={animeRecommendationsList}
      />
    </main>
  );
};
