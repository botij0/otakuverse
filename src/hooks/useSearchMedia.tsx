import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router";

import { getAnimeAction } from "@/actions/get-anime.action";

export const useSearchMedia = () => {
  const [searchParams] = useSearchParams();

  const query = searchParams.get("query") || undefined;

  return useQuery({
    queryKey: ["media", { query }],
    queryFn: () =>
      getAnimeAction({
        query,
      }),
    staleTime: 1000 * 60 * 5,
  });
};
