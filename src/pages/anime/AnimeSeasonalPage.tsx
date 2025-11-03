import { useSearchParams } from "react-router";
import { useQuery } from "@tanstack/react-query";

import { getAnimeSeasonalAction } from "@/actions/get-anime-seasonal.action";
import MediaGrid from "@/components/custom/MediaGrid";
import { CustomPagination } from "@/components/custom/CustomPagination";

export const SeasonalAnimePage = () => {
  const [searchParams] = useSearchParams();

  const page = Number(searchParams.get("page")) || 1;

  const {
    data: animeData,
    isLoading: isLoadingAnime,
    error: errorAnime,
  } = useQuery({
    queryKey: ["animeTop", { page }],
    queryFn: () =>
      getAnimeSeasonalAction({
        page,
      }),
    staleTime: 1000 * 60 * 5,
  });

  const animeList = animeData && !errorAnime ? animeData.data : [];

  return (
    <main className="container mx-auto px-4">
      <MediaGrid media={animeList} loading={isLoadingAnime} title={"Seasonal Anime"} />
      {animeData && (
        <CustomPagination totalPages={animeData!.pagination.last_visible_page} />
      )}
    </main>
  );
};
