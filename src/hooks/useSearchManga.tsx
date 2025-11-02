import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router";

import { getSearchMangaAction } from "@/actions/get-search-media.action";

export const useSearchManga = () => {
  const [searchParams] = useSearchParams();

  const query = searchParams.get("query") || undefined;
  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 25;
  const genres = searchParams.get("genres") || undefined;

  return useQuery({
    queryKey: ["mangaSearch", { query, page, genres }],
    queryFn: () =>
      getSearchMangaAction({
        query,
        page,
        limit,
        genres,
      }),
    staleTime: 1000 * 60 * 5,
  });
};
