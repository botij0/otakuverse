import { createPaginatedAction, createSearchMediaAction } from "@/actions/helpers";
import { jikanApi } from "@/api/jikan.api";
import type { RecomendationsResponse } from "@/interfaces/recomendations";
import type { Manga, MangaListResponse } from "@/interfaces/manga";

export const getMangaDetailsAction = async (id: number): Promise<Manga> => {
  if (isNaN(id)) return {} as Manga;
  const { data } = await jikanApi.get(`/manga/${id}`);
  return data.data;
};

/** GET /top/manga */
export const getMangaTopAction = createPaginatedAction<MangaListResponse>("/top/manga");

/** GET /recommendations/manga */
export const getMangaRecommendationsAction =
  createPaginatedAction<RecomendationsResponse>("/recommendations/manga");

export const getSearchMangaAction = createSearchMediaAction<MangaListResponse>("/manga");
