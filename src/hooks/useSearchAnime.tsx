import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router";

import { getSearchAnimeAction } from "@/actions/get-anime.actions";

interface UseSearchAnimeProps {
  query?: string;
  page?: number;
  limit?: number;
  genres?: string;
  enabled?: boolean;
}

export const useSearchAnime = (props?: UseSearchAnimeProps) => {
  const [searchParams] = useSearchParams();

  const query = props?.query !== undefined ? props.query : (searchParams.get("query") || undefined);
  const page = props?.page !== undefined ? props.page : (Number(searchParams.get("page")) || 1);
  const limit = props?.limit !== undefined ? props.limit : (Number(searchParams.get("limit")) || 25);
  const genres = props?.genres !== undefined ? props.genres : (searchParams.get("genres") || undefined);
  const enabled = props?.enabled !== undefined ? props.enabled : true;

  return useQuery({
    queryKey: ["animeSearch", { query, page, limit, genres }],
    queryFn: () =>
      getSearchAnimeAction({
        query,
        page,
        limit,
        genres,
      }),
    staleTime: 1000 * 60 * 5,
    enabled,
  });
};
