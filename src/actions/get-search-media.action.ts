import { jikanApi } from "@/api/jikanApi";
import { emptyMediaResponse } from "@/interfaces/media.list.response";
import type { AnimeListResponse } from "@/interfaces/anime.list.response";
import type { MangaListResponse } from "@/interfaces/manga.list.response";
import { getGenresIdsByGenresString } from "@/interfaces/genres";

interface Options {
  query?: string;
  genres?: string;
  page: number;
  limit: number;
}

export const getSearchAnimeAction = async (
  options: Options
): Promise<AnimeListResponse> => {
  const { query, page, limit, genres } = options;

  if (!query && !genres) return emptyMediaResponse as AnimeListResponse;

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

export const getSearchMangaAction = async (
  options: Options
): Promise<MangaListResponse> => {
  const { query, page, limit, genres } = options;

  if (!query || !genres) return emptyMediaResponse as MangaListResponse;

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
