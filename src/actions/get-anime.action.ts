import { jikanApi } from "@/api/jikanApi";
import type { AnimeListResponse } from "@/interfaces/anime.list.response";

interface Options {
  query?: string;
}

export const getAnimeAction = async (options: Options): Promise<AnimeListResponse> => {
  const { query } = options;

  const { data } = await jikanApi.get<AnimeListResponse>("/anime", {
    params: {
      q: query,
    },
  });

  return data;
};
