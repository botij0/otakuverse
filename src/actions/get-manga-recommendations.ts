import { jikanApi } from "@/api/jikanApi";
import type { RecomendationsResponse } from "@/interfaces/recomendations.response";

interface Options {
  page: number;
}

export const getMangaRecommendationsAction = async (
  options: Options
): Promise<RecomendationsResponse> => {
  const { page } = options;

  const { data } = await jikanApi.get<RecomendationsResponse>("/recommendations/manga", {
    params: {
      page: page,
    },
  });

  return data;
};
