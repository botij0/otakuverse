import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router";

import { getAnimeAction } from "@/actions/get-anime.action";

export const useSearchMedia = () => {
  const [searchParams] = useSearchParams();

  const query = searchParams.get("query") || undefined;
  const page = Number(searchParams.get("page")) || 1;

  return useQuery({
    queryKey: ["media", { query, page }],
    queryFn: () =>
      getAnimeAction({
        query,
        page,
      }),
    staleTime: 1000 * 60 * 5,
  });
};
