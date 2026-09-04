import { createPaginatedAction, createSearchMediaAction } from "@/actions/helpers";
import { jikanApi } from "@/api/jikan.api";
import type { RecomendationsResponse } from "@/interfaces/recomendations";
import type { AnimeDetailsResponse, Anime, AnimeListResponse } from "@/interfaces/anime";

export const getAnimeDetailsAction = async (id: number): Promise<Anime> => {
  if (isNaN(id)) return {} as Anime;
  const { data } = await jikanApi.get<AnimeDetailsResponse>(`/anime/${id}/full`);
  return data.data;
};

/** GET /top/anime */
export const getAnimeTopAction = createPaginatedAction<AnimeListResponse>("/top/anime");

/** GET /seasons/now */
export const getAnimeSeasonalAction = createPaginatedAction<AnimeListResponse>("/seasons/now");

/** GET /recommendations/anime */
export const getAnimeRecommendationsAction =
  createPaginatedAction<RecomendationsResponse>("/recommendations/anime");

export const getSearchAnimeAction = createSearchMediaAction<AnimeListResponse>("/anime");
