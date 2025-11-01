import { useSearchParams } from "react-router";
import { useQuery } from "@tanstack/react-query";

import MediaGrid from "@/components/custom/MediaGrid";
import { getAnimeTopAction } from "@/actions/get-anime-top.action";
import { CustomPagination } from "@/components/custom/CustomPagination";

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

  if (isLoadingAnime) {
    return (
      <>
        <main className="container mx-auto px-4">
          <MediaGrid loading={true} />
        </main>
      </>
    );
  }

  const animeList = animeData && !errorAnime ? animeData.data : [];

  return (
    <main className="container mx-auto px-4">
      <MediaGrid media={animeList} loading={isLoadingAnime} title={"Top Anime"} />
      <CustomPagination totalPages={animeData!.pagination.last_visible_page} />
    </main>
  );
};
