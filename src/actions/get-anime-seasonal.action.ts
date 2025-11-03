import { jikanApi } from "@/api/jikanApi";
import type { AnimeListResponse } from "@/interfaces/anime.list.response";

interface Options {
  page: number;
}

export const getAnimeSeasonalAction = async (
  options: Options
): Promise<AnimeListResponse> => {
  const { page } = options;

  const { data } = await jikanApi.get<AnimeListResponse>("/seasons/now", {
    params: {
      page: page,
    },
  });

  return data;
};
