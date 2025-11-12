import { jikanApi } from "@/api/jikan.api";
import { getGenresIdsByGenresString } from "@/interfaces/genres";
import type { RecomendationsResponse } from "@/interfaces/recomendations";
import type { Manga, MangaListResponse } from "@/interfaces/manga";

interface Options {
  page: number;
}

interface SearchOptions {
  query?: string;
  genres?: string;
  page: number;
  limit: number;
}

export const getMangaDetailsAction = async (id: number): Promise<Manga> => {
  if (isNaN(id)) return {} as Manga;
  const { data } = await jikanApi.get(`/manga/${id}`);
  return data.data;
};

export const getMangaTopAction = async (options: Options): Promise<MangaListResponse> => {
  let { page } = options;

  if (isNaN(page)) {
    page = 1;
  }

  const { data } = await jikanApi.get<MangaListResponse>("/top/manga", {
    params: {
      page: page,
    },
  });

  return data;
};

export const getMangaRecommendationsAction = async (
  options: Options
): Promise<RecomendationsResponse> => {
  let { page } = options;

  if (isNaN(page)) {
    page = 1;
  }

  const { data } = await jikanApi.get<RecomendationsResponse>("/recommendations/manga", {
    params: {
      page: page,
    },
  });

  return data;
};

export const getSearchMangaAction = async (
  options: SearchOptions
): Promise<MangaListResponse> => {
  const { query, limit, genres } = options;
  let { page } = options;

  if (isNaN(page)) {
    page = 1;
  }

  if (!query && !genres) return {} as MangaListResponse;

  const genreIds = genres ? getGenresIdsByGenresString(genres) : null;

  const { data } = await jikanApi.get<MangaListResponse>("/manga", {
    params: {
      q: query,
      page: page,
      order_by: "rank",
      limit: limit,
      genres: genreIds,
    },
  });

  return data;
};
