import { useQuery } from "@tanstack/react-query";

import Hero from "@/components/custom/Hero";
import MediaGrid from "@/components/custom/MediaGrid";
import { getAnimeTopAction } from "@/actions/get-anime-top.action";
import { getMangaTopAction } from "@/actions/get-manga-top.action";

export const HomePage = () => {
  const page = 1;

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

  const {
    data: mangaData,
    isLoading: isLoadingManga,
    error: error,
  } = useQuery({
    queryKey: ["mangaTop", { page }],
    queryFn: () =>
      getMangaTopAction({
        page,
      }),
    staleTime: 1000 * 60 * 5,
  });

  const mangaList = mangaData && !error ? mangaData.data : [];
  const animeList = animeData && !errorAnime ? animeData.data : [];

  return (
    <>
      <Hero
        title="Discover Your Next"
        subtitle="Otaku Adventure"
        description="Search through thousands of anime and manga titles. Find your next obsession."
      />

      <main className="container mx-auto px-4">
        <MediaGrid
          media={animeList.slice(0, 10) || []}
          loading={isLoadingAnime}
          title={"Top 10 Anime"}
          seeMore={true}
          seeMoreLink="/anime/top"
        />

        <MediaGrid
          media={mangaList.slice(0, 10) || []}
          loading={isLoadingManga}
          title={"Top 10 Manga"}
          seeMore={true}
          seeMoreLink="/manga/top"
        />
      </main>
    </>
  );
};
