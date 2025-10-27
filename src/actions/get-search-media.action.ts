import { jikanApi } from "@/api/jikanApi";
import type { AnimeListResponse } from "@/interfaces/anime.list.response";
import type { MangaListResponse } from "@/interfaces/manga.list.response";
import { emptyMediaResponse } from "@/interfaces/media.list.response";

interface Options {
  query?: string;
  page: number;
}

export const getSearchAnimeAction = async (
  options: Options
): Promise<AnimeListResponse> => {
  const { query, page } = options;

  if (!query) return emptyMediaResponse as AnimeListResponse;

  const { data } = await jikanApi.get<AnimeListResponse>("/anime", {
    params: {
      q: query,
      page: page,
      order_by: "rank",
      limit: 10,
    },
  });

  return data;
};

export const getSearchMangaAction = async (
  options: Options
): Promise<MangaListResponse> => {
  const { query, page } = options;

  if (!query) return emptyMediaResponse as MangaListResponse;

  const { data } = await jikanApi.get<MangaListResponse>("/manga", {
    params: {
      q: query,
      page: page,
      order_by: "rank",
      limit: 10,
    },
  });

  return data;
};
