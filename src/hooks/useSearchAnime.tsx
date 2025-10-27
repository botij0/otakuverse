import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router";

import { getSearchAnimeAction } from "@/actions/get-search-media.action";

export const useSearchAnime = () => {
  const [searchParams] = useSearchParams();

  const query = searchParams.get("query") || undefined;
  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 10;

  return useQuery({
    queryKey: ["animeSearch", { query, page }],
    queryFn: () =>
      getSearchAnimeAction({
        query,
        page,
        limit,
      }),
    staleTime: 1000 * 60 * 5,
  });
};
