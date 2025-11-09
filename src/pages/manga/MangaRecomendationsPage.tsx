import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router";

import Hero from "@/components/custom/Hero";
import mangaBanner from "@/assets/manga_banner.webp";
import { RecommendationsGrid } from "@/components/custom/RecommendationsGrid";
import { getMangaRecommendationsAction } from "@/actions/get-manga.actions";

export const MangaRecomendationsPage = () => {
  const [searchParams] = useSearchParams();

  const page = Number(searchParams.get("page")) || 1;

  const { data, isLoading, error } = useQuery({
    queryKey: ["mangaRecommendations", { page }],
    queryFn: () =>
      getMangaRecommendationsAction({
        page,
      }),
    staleTime: 1000 * 60 * 5,
  });

  const mangaRecommendationsList = data && !error ? data.data : [];

  return (
    <>
      <Hero
        title="Manga Recommendations"
        description="Discover new mangas based on community recommendations"
        img={mangaBanner}
      />
      <main className="container mx-auto px-4 py-12">
        <RecommendationsGrid
          isLoading={isLoading}
          recommendationList={mangaRecommendationsList}
        />
      </main>
    </>
  );
};
