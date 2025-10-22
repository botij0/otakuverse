import { jikanApi } from "@/api/jikanApi";
import type { AnimeListResponse, Anime } from "@/interfaces/anime.list.response";

interface Options {
  query?: string;
}

export const getAnimeAction = async (options: Options): Promise<Anime[] | []> => {
  const { query } = options;

  if (!query) return [];

  const { data } = await jikanApi.get<AnimeListResponse>("/anime", {
    params: {
      q: query,
    },
  });

  return data.data;
};
