import { jikanApi } from "@/api/jikanApi";
import type { RecomendationsResponse } from "@/interfaces/recomendations.response";

interface Options {
  page: number;
}

export const getAnimeRecommendationsAction = async (
  options: Options
): Promise<RecomendationsResponse> => {
  const { page } = options;

  const { data } = await jikanApi.get<RecomendationsResponse>("/recommendations/anime", {
    params: {
      page: page,
    },
  });

  return data;
};
