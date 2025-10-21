import { useQuery } from "@tanstack/react-query";
import { useParams, useSearchParams } from "react-router";

import { getAnimeAction } from "@/actions/get-anime.action";

export const useMedia = () => {
  const { type } = useParams();
  const [searchParams] = useSearchParams();

  const query = searchParams.get("query") || undefined;
  // const page = searchParams.get("page") || 1;

  return useQuery({
    queryKey: ["media", { query }],
    queryFn: () =>
      getAnimeAction({
        query,
      }),
    staleTime: 1000 * 60 * 5,
  });
};
