import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router";

import Hero from "@/components/custom/Hero";
import MediaGrid from "@/components/custom/MediaGrid";
import animeBanner from "@/assets/anime_banner.webp";
import { CustomPagination } from "@/components/custom/CustomPagination";
import { getAnimeTopAction } from "@/actions/get-anime.actions";

export const AnimeTopPage = () => {
  const [searchParams] = useSearchParams();

  const page = Number(searchParams.get("page")) || 1;

  const {
    data: animeData,
    isLoading: isLoadingAnime,
    error: errorAnime,
  } = useQuery({
    queryKey: ["animeTop", { page }],
    queryFn: () =>
      getAnimeTopAction({
        page,
      }),
    staleTime: 1000 * 60 * 5,
  });

  const animeList = (animeData && !errorAnime) ? animeData.data : [];

  return (
    <>
      <Hero
        title="Top Anime"
        description="Updated anime top from myanimelist"
        img={animeBanner}
      />
      <main className="container mx-auto px-4">
        <MediaGrid media={animeList} loading={isLoadingAnime} />
        {animeData?.pagination && (
          <CustomPagination totalPages={animeData!.pagination.last_visible_page} />
        )}
      </main>
    </>
  );
};
