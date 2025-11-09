import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router";

import Hero from "@/components/custom/Hero";
import animeBanner from "@/assets/anime_banner.webp";
import { RecommendationsGrid } from "@/components/custom/RecommendationsGrid";
import { getAnimeRecommendationsAction } from "@/actions/get-anime.actions";

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
    <>
      <Hero
        title="Anime Recommendations"
        description="Discover new anime based on community recommendations"
        img={animeBanner}
      />
      <main className="container mx-auto px-4 py-12">
        <RecommendationsGrid
          isLoading={isLoading}
          recommendationList={animeRecommendationsList}
        />
      </main>
    </>
  );
};
