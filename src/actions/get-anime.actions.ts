import { jikanApi } from "@/api/jikan.api";
import { getGenresIdsByGenresString } from "@/interfaces/genres";
import type { RecomendationsResponse } from "@/interfaces/recomendations";
import type { AnimeDetailsResponse, Anime, AnimeListResponse } from "@/interfaces/anime";

interface Options {
  page: number;
}

interface SearchOptions {
  query?: string;
  genres?: string;
  page: number;
  limit: number;
}

export const getAnimeDetailsAction = async (id: number): Promise<Anime> => {
  if (isNaN(id)) return {} as Anime;
  const { data } = await jikanApi.get<AnimeDetailsResponse>(`/anime/${id}`);
  return data.data;
};

export const getAnimeTopAction = async (options: Options): Promise<AnimeListResponse> => {
  let { page } = options;

  if (isNaN(page)) {
    page = 1;
  }

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
  let { page } = options;

  if (isNaN(page)) {
    page = 1;
  }

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
  let { page } = options;

  if (isNaN(page)) {
    page = 1;
  }
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
  const { query, limit, genres } = options;
  let { page } = options;

  if (isNaN(page)) {
    page = 1;
  }

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
