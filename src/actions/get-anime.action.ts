import { jikanApi } from "@/api/jikanApi";
import type { AnimeListResponse } from "@/interfaces/anime.list.response";
import { emptyMediaResponse } from "@/interfaces/media.list.response";

interface Options {
  query?: string;
  page: number;
}

export const getAnimeAction = async (options: Options): Promise<AnimeListResponse> => {
  const { query, page } = options;

  if (!query) return emptyMediaResponse as AnimeListResponse;

  const { data } = await jikanApi.get<AnimeListResponse>("/anime", {
    params: {
      q: query,
      page: page,
      order_by: "rank",
    },
  });

  return data;
};
