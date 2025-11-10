import { jikanApi } from "@/api/jikanApi";
import { getGenresIdsByGenresString } from "@/interfaces/genres";
import type { RecomendationsResponse } from "@/interfaces/recomendations";
import type { Anime, AnimeListResponse } from "@/interfaces/anime";

interface Options {
  page: number;
}

interface SearchOptions {
  query?: string;
  genres?: string;
  page: number;
  limit: number;
}

export const getAnimeDetailsAction = async (id: string): Promise<Anime> => {
  const { data } = await jikanApi.get(`/anime/${id}`);
  return data.data;
};

export const getAnimeTopAction = async (options: Options): Promise<AnimeListResponse> => {
  const { page } = options;

  const { data } = await jikanApi.get<AnimeListResponse>("/top/anime", {
    params: {
      page: page,
    },
  });

  return data;
};

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

export const getSearchAnimeAction = async (
  options: SearchOptions
): Promise<AnimeListResponse> => {
  const { query, page, limit, genres } = options;

  if (!query && !genres) return {} as AnimeListResponse;

  const genreIds = genres ? getGenresIdsByGenresString(genres) : null;

  const { data } = await jikanApi.get<AnimeListResponse>("/anime", {
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
