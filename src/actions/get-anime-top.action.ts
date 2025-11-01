import { jikanApi } from "@/api/jikanApi";
import type { AnimeListResponse } from "@/interfaces/anime.list.response";

interface Options {
  page: number;
}

export const getAnimeTopAction = async (options: Options): Promise<AnimeListResponse> => {
  const { page } = options;

  const { data } = await jikanApi.get<AnimeListResponse>("/top/anime", {
    params: {
      page: page,
    },
  });

  return data;
};
